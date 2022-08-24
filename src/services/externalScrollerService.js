const DB = require('../database/databaseConnector');


// ----------------------------------
// Usan funciones almacenadas
const getNextMessages = () => {
    try {
        return DB.getNextMessages();      
    } catch (error) {
        throw error;
    }
};

const getNextImages = () => {
    try {
        return DB.getNextImages();      
    } catch (error) {
        throw error;
    }
};

const getNextAd = () => {
    try {
        return DB.getNextAd();      
    } catch (error) {
        throw error;
    }
};

const getNextDonationInfo = () => {
    try {
        return DB.getNextDonationInfo();      
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getNextMessages,
    getNextImages,
    getNextAd,
    getNextDonationInfo,
}