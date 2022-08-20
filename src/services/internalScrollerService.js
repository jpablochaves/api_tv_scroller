const DB = require('../database/databaseConnector');


const getNewMessages = () => {
    try {
        const newMessages = DB.getNextNewMessages(); 
        if (newMessages){           
            updateMessagesState(newMessages);
        }  
        return newMessages;     
    } catch (error) {
        throw error;
    }
};

const getRepeatedMessages = () => {
    try {
        const newMessages = DB.getRepeatedMessages(); 
        if (newMessages){           
            updateMessagesState(newMessages);
        }  
        return newMessages;     
    } catch (error) {
        throw error;
    }
};

const updateMessagesState = async (idList) => {
    const lst = await idList;
    let idsToUpdate = lst.map((data) => data.id); 
    console.log(idsToUpdate);
}

const getNextMessages = () => {
    try {
        return DB.getNextMessages();      
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getNewMessages,
    getRepeatedMessages,
    getNextMessages,
}