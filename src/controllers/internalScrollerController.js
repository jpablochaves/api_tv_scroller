// Desde el Controller deberia de llamar al service. El service se encarga de comunicarse con la BD
const internalService = require('../services/internalScrollerService')

// Obtener los SMSs | va a retornar un promise (async)
const getNewMessages = async (req, res) => {
    try {
        const allSMS = await internalService.getNewMessages();
        if (allSMS.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.send({ status: "OK", data: allSMS });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

// Obtener los SMSs | va a retornar un promise (async)
const getRepeatedMessages = async (req, res) => {
    try {
        const allSMS = await internalService.getRepeatedMessages();
        if (allSMS.length < 1) {
            res
                .status(204)
                .send();
        } else {
            res.send({ status: "OK", data: allSMS });
        }
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

// Prueba de llamado a procedure
const getNextMessages = async (req, res) => {
    try {
        const rows = await internalService.getNextMessages();
        console.log(rows, rows.length)
        if (rows.length < 1){
            res
                .status(204)
                .send();
        }else{
            res.send({ status: "OK", data: rows });
        }        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};


const getDonationInfo = (req, res) => {
    const donationInfo = [{ id: 1, text: "CUENTA BN 123452030-2" }, { id: 11, text: "ENVIA TU MENSAJE AL" }];
    res.send({ status: "OK", data: donationInfo })
};

const getAdvertisingInfo = (req, res) => {
    const adInfo = [{ id: 1, text: "Peluquería el Piojo" }, { id: 11, text: "Restaurante Lospe" }];
    res.send({ status: "OK", data: adInfo })
};

const getImagesInfo = (req, res) => {
    const imgInfo = [{ id: 1, name: "00_CLUB_ACTIVO.png", path: "./images/logos/sponsors", shape: 0 },
    { id: 101, name: "00_TELETON.png", path: "./images/logos/sponsors", shape: 1 }];
    res.send({ status: "OK", data: imgInfo })
};


module.exports = {
    getNewMessages,
    getRepeatedMessages,
    getNextMessages,
    getDonationInfo,
    getAdvertisingInfo,
    getImagesInfo,
};