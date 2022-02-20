(() => {
var exports = {};
exports.id = 532;
exports.ids = [532];
exports.modules = {

/***/ 907:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ leadforms),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: external "next/error"
const error_namespaceObject = require("next/error");
var error_default = /*#__PURE__*/__webpack_require__.n(error_namespaceObject);
;// CONCATENATED MODULE: external "apester-react-widgets"
const external_apester_react_widgets_namespaceObject = require("apester-react-widgets");
// EXTERNAL MODULE: ./public/config/config.js
var config = __webpack_require__(756);
var config_default = /*#__PURE__*/__webpack_require__.n(config);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: ./pages/leadforms.js



 // export async function getServerSideProps({ query }) {
//     const { partnerId, leadformid } = query || {};
//     const API = `${config.API_BASE()}/partner/appsterInformation/${partnerId}`;
//     const API2 = `${config.API_BASE()}/cms/leadGeneration/getLeadFormById/${leadformid}`;
//     // `${globalConfig.MINT_URL}/api/partner/appsterInformation/${partnerId}`;
//     const res1 = await fetch(API);
//     const res2 = await fetch(API2);
//     const json = await res1.json();
//     const json2 = await res2.json();
//     const leadDetails = json2 || {};
//     const { data } = json;
//     const joinData = {...data, ...leadDetails};
//     return {
//         props: { leadgen: joinData },
//     };
// }
// export const getServerSideProps = async({ query }) => {
//     const { partnerId, leadformid } = query || {};
//     let promiseList = [
//         fetch(`${config.MINT_URL}/partner/appsterInformation/${partnerId}`),
//         fetch(`${config.MINT_URL}/cms/leadGeneration/getLeadFormById/${leadformid}`)
//     ];
//     const [partner, leadgen] = await Promise.all(promiseList).then(res => res).catch(err => console.log('Err', err));
//     console.log('partner', await partner.json());
//     console.log('leadId', await leadgen.json());
//     return {
//         props: { leadgen: {}, partner: {}, errorCode: 500 },
//     }
// }



const getServerSideProps = async ({
  query
}) => {
  const {
    partnerId,
    leadformid
  } = query || {};
  let errorCode = false;
  let errMessage = '';
  let leadgen = {},
      partner = {};

  try {
    const p_data = await fetch(`${(config_default()).MINT_URL}/partner/appsterInformation/${partnerId}`);

    const _p_data = await p_data.json();

    partner = _p_data;
  } catch (error) {
    errorCode = 404;
    errMessage = 'Somthig went wrong!';
  }

  try {
    // console.log('TRY');
    const leadData = await fetch(`${(config_default()).MINT_URL}/cms/leadGeneration/getLeadFormById/${leadformid}`);

    const _data = await leadData.json();

    leadgen = _data; // console.log('_data', _data)
  } catch (err) {
    // console.log('Catch');
    errorCode = 404;
    errMessage = 'Somthig went wrong!';
  } // console.log('==========END============');


  return {
    props: {
      leadgen,
      partner,
      errorCode,
      errMessage
    }
  };
}; // export const getStaticProps = async() => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const json = await res.json()
//     return { stars: json }
// }

function leadforms({
  errorCode,
  errMessage,
  leadgen,
  partner
}) {
  const {
    partnerProfilePic
  } = partner.data || {};
  const {
    partnerName,
    description,
    leadFormName,
    thumbnailUrl,
    leadFormId
  } = leadgen || {};
  const {
    documentId
  } = partnerProfilePic || {};
  const PIC = `http://${(config_default()).MINT_URL}/profile/customer/image/${documentId}`;
  console.log('Servert Renders', leadgen, partner);

  if (errorCode) {
    return /*#__PURE__*/jsx_runtime_.jsx((error_default()), {
      statusCode: errorCode,
      title: errMessage
    });
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Reach Turtlemint"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:local",
        content: "en_US"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:type",
        content: partnerName
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:site_name",
        content: "Mintpro Customer"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:title",
        content: leadFormName
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:description",
        content: description
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        property: "og:image",
        content: thumbnailUrl
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "leadgenwrapper",
      children: leadFormId ? /*#__PURE__*/jsx_runtime_.jsx(external_apester_react_widgets_namespaceObject.ApesterMediaWidget, {
        "data-media-id": leadFormId,
        "data-auto-fullscreen": "true",
        agencyData: {
          agencyName: partnerName,
          agencyImage: PIC
        }
      }) : null
    })]
  });
}

/***/ }),

/***/ 756:
/***/ ((module) => {

module.exports = {
  API_BASE: () => 'https://reach.joy.planturtle.com/api',
  MINT_URL: 'https://app.mintpro.in/api'
};

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(907));
module.exports = __webpack_exports__;

})();