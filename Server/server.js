const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { appRouter } = require('./appRouter/routes');
const mongoConfig = require("./config/mongoConfig.json")
const serverConfig = require('./config/serverConfig.json')


const path = require('path');
const allowedOrigins = serverConfig.allowedOrigins || [];
const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        console.log("allowed origin ==", origin)
        callback(null, true);
      } else {
        console.log("blocked origin ==", origin)
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'], // Methods you want to allow
    credentials: true, // Enable cookies and HTTP authentication
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
mongoose.connect(`${mongoConfig.connectionStr}/${mongoConfig.dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express()

app.use(express.json());
app.use(cors(corsOptions)); 
// app.use(express.static(path.join(__dirname, 'client/browser')));

app.use('/api', appRouter)

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/browser', 'index.html'));
// });


const port = serverConfig.PORT
app.listen(port,()=>{
//   mongoService.initializeDB()
  console.log(`Server is live on :- http://localhost:${port}`);
})