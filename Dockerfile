FROM node:lts as dependencies
WORKDIR /mintpro-customer
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /mintpro-customer
COPY . .
COPY --from=dependencies /mintpro-customer/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /mintpro-customer
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /mintpro-customer/next.config.js ./
COPY --from=builder /mintpro-customer/services ./services
COPY --from=builder /mintpro-customer/public ./public
COPY --from=builder /mintpro-customer/.next ./.next
COPY --from=builder /mintpro-customer/node_modules ./node_modules
COPY --from=builder /mintpro-customer/package.json ./package.json

# EXPOSE 3000
CMD ["npm", "start"]