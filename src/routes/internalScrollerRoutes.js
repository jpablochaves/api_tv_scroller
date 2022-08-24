const express = require('express');
const router = express.Router();

const internalController = require('../controllers/internalScrollerController');

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
    .get('/images', internalController.getNextImages)
    .get('/donations', internalController.getDonationInfo)
    .get('/ads', internalController.getAdvertisingInfo);


module.exports = router;