import Head from 'next/head';
import Error from 'next/error';
import { ApesterMediaWidget } from 'apester-react-widgets';
import config from '../public/config/config';

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

export const getServerSideProps = async({ query }) => {
    const { partnerId, leadformid } = query || {};
    let errorCode = false;
    let errMessage = '';
    let leadgen = {}, partner = {};
    try {
        const p_data = await fetch(`${config.MINT_URL}/partner/appsterInformation/${partnerId}`);
        const _p_data = await p_data.json();
        partner = _p_data;
    } catch (error) {
        errorCode = 404;
        errMessage = 'Somthig went wrong!';
    }
    try {
        // console.log('TRY');
        const leadData = await fetch(`${config.MINT_URL}/cms/leadGeneration/getLeadFormById/${leadformid}`);
        const _data = await leadData.json();
        leadgen = _data;
        // console.log('_data', _data)
    } catch(err) {
        // console.log('Catch');
        errorCode = 404;
        errMessage = 'Somthig went wrong!';
    }
    // console.log('==========END============');
    return {
        props: { leadgen, partner, errorCode, errMessage },
    }
}

// export const getStaticProps = async() => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const json = await res.json()
//     return { stars: json }
// }


export default function leadforms({errorCode, errMessage, leadgen, partner }) {
    const { partnerProfilePic } = partner.data || {};
    const { partnerName, description, leadFormName, thumbnailUrl, leadFormId } = leadgen || {};
    const { documentId } = partnerProfilePic || {};
    const PIC = `http://${config.MINT_URL}/profile/customer/image/${documentId}`;
    console.log('Servert Renders', leadgen, partner );
    if (errorCode) {
        return <Error statusCode={errorCode} title={errMessage} />
    }
    return (
        <div>
            <Head>
                <title>Reach Turtlemint</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:local" content="en_US" />
                <meta property="og:type" content={partnerName} />
                <meta property="og:site_name" content="Mintpro Customer" />
                <meta property="og:title" content={leadFormName} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={thumbnailUrl} />
            </Head>
            <div className="leadgenwrapper">
                {leadFormId ? (
                    <ApesterMediaWidget
                        data-media-id={leadFormId}
                        data-auto-fullscreen="true"
                        agencyData={{ agencyName: partnerName, agencyImage: PIC }}
                    />
                ) : null}
            </div>
        </div>
    );
}