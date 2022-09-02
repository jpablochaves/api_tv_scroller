// Desde el Controller deberia de llamar al service. El service se encarga de comunicarse con la BD
const internalService = require('../services/internalScrollerService')

// Obtener los proximos mensajes llamando a una stored function
const getNextMessages = async (req, res) => {
    try {
        const rows = await internalService.getNextMessages();
        // console.log(rows, rows.length)
        if (rows.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(rows));
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

// Obtener los proximos banners de imagenes llamando a una stored function
const getNextImages = async (req, res) => {
    try {
        const rows = await internalService.getNextImages();
        // console.log(rows, rows.length)
        if (rows.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(rows));
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};


const getDonationInfo = async (req, res) => {
    try {
        const donationInfo = await internalService.getNextDonationInfo();
        // console.log(rows, rows.length)
        if (donationInfo.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify(donationInfo));
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

const getAdvertisingInfo = async (req, res) => {
    try {
        const adInfo = await internalService.getNextAd();
        // console.log(rows, rows.length)
        if (adInfo.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.setHeader('Content-Type','application/json')
            res.send(JSON.stringify(adInfo));
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

// // Obtener los SMSs | va a retornar un promise (async)
// const getNewMessages = async (req, res) => {
//     try {
//         const allSMS = await internalService.getNewMessages();
//         if (allSMS.length < 1) {
//             res
//                 .status(204)
//                 .send();
//         } else {
//             res.send({ status: "OK", data: allSMS });
//         }
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "ERROR", data: { error: error?.message || error } });
//     }
// };

// // Obtener los SMSs | va a retornar un promise (async)
// const getRepeatedMessages = async (req, res) => {
//     try {
//         const allSMS = await internalService.getRepeatedMessages();
//         if (allSMS.length < 1) {
//             res
//                 .status(204)
//                 .send();
//         } else {
//             res.send({ status: "OK", data: allSMS });
//         }
//     } catch (error) {
//         res
//             .status(error?.status || 500)
//             .send({ status: "ERROR", data: { error: error?.message || error } });
//     }
// };


module.exports = {
    getNextMessages,
    getNextImages,
    getDonationInfo,
    getAdvertisingInfo,
};