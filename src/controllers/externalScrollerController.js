// Desde el Controller deberia de llamar al service. El service se encarga de comunicarse con la BD
const service = require('../services/externalScrollerService')

// Obtener los proximos mensajes llamando a una stored function
const getNextMessages = async (req, res) => {
    try {
        const rows = await service.getNextMessages();
        // console.log(rows, rows.length)
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

// Obtener los proximos banners de imagenes llamando a una stored function
const getNextImages = async (req, res) => {
    try {
        const rows = await service.getNextImages();
        // console.log(rows, rows.length)
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


const getDonationInfo = async (req, res) => {
    try {
        const donationInfo = await service.getNextDonationInfo();
        // console.log(rows, rows.length)
        if (donationInfo.length < 1){
            res
                .status(204)
                .send();
        }else{
            res.send({ status: "OK", data: donationInfo });
        }        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};

const getAdvertisingInfo = async (req, res) => {
    try {
        const adInfo = await service.getNextAd();
        // console.log(rows, rows.length)
        if (adInfo.length < 1){
            res
                .status(204)
                .send();
        }else{
            res.send({ status: "OK", data: adInfo });
        }        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "ERROR", data: { error: error?.message || error } });
    }
};


module.exports = {
    getNextMessages,
    getNextImages,
    getDonationInfo,
    getAdvertisingInfo,    
};