const DB = require('../database/databaseConnector');

// ----------------------------------
// Usan funciones almacenadas
const getNextMessages = () => {
    try {
        return DB.getNextMessagesInterno();      
    } catch (error) {
        throw error;
    }
};

const getNextImages = () => {
    try {
        return DB.getNextImagesInterno();      
    } catch (error) {
        throw error;
    }
};

const getNextAd = () => {
    try {
        return DB.getNextAdInterno();      
    } catch (error) {
        throw error;
    }
};

const getNextDonationInfo = () => {
    try {
        return DB.getNextDonationInfoInterno();      
    } catch (error) {
        throw error;
    }
};

// const getNewMessages = () => {
//     try {
//         const newMessages = DB.getNextNewMessages(); 
//         if (newMessages){           
//             updateMessagesState(newMessages);
//         }  
//         return newMessages;     
//     } catch (error) {
//         throw error;
//     }
// };

// const getRepeatedMessages = () => {
//     try {
//         const newMessages = DB.getRepeatedMessages(); 
//         if (newMessages){           
//             updateMessagesState(newMessages);
//         }  
//         return newMessages;     
//     } catch (error) {
//         throw error;
//     }
// };


// const updateMessagesState = async (idList) => {
//     const lst = await idList;
//     let idsToUpdate = lst.map((data) => data.id); 
//     console.log(idsToUpdate);
// };

module.exports = {
    getNextMessages,
    getNextImages,
    getNextAd,
    getNextDonationInfo,
}