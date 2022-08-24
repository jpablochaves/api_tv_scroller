const express = require('express');
const router = express.Router();

const controller = require('../controllers/externalScrollerController');


/*
Current implementations (without verbs)
- This is the best practice to implement URLs for APIs

GET "/teleton/tvscroller/messages" 
GET "/teleton/tvscroller/images" 
GET "/teleton/tvscroller/donations" 
GET "/teleton/tvscroller/ads" 
*/

router    
    .get('/messages', controller.getNextMessages)
    .get('/images', controller.getNextImages)
    .get('/donations', controller.getDonationInfo)
    .get('/ads', controller.getAdvertisingInfo);


module.exports = router;