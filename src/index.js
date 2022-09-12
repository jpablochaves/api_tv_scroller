const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

//imports
const cintilloExternoRouter = require('./routes/externalScrollerRoutes');
const cintilloInternoRouter = require('./routes/internalScrollerRoutes');
//settings


//
// Middlewares 
// 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // para parsear las peticiones | BodyParser


// API routes
app.use("/teleton/tvscroller", cintilloExternoRouter);
app.use("/teleton/internal/tvscroller", cintilloInternoRouter);


//run
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});