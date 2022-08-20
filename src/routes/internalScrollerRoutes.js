const express = require('express');
const router = express.Router();

const internalController = require('../controllers/internalScrollerController')

/*
Current implementations (without verbs)
- This is the best practice to implement URLs for APIs

GET "/teleton/internal/tvscroller/messages" 
GET "/teleton/internal/tvscroller/images" 
GET "/teleton/internal/tvscroller/donations" 
GET "/teleton/internal/tvscroller/ads" 
*/
router    
    .get('/messages', internalController.getNextMessages)
    .get('/messages2', internalController.getNewMessages)
    .get('/repeated', internalController.getRepeatedMessages)
    .get('/images', internalController.getImagesInfo)
    .get('/donations', internalController.getDonationInfo)
    .get('/ads', internalController.getAdvertisingInfo);


module.exports = router;