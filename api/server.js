const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const routes = require('./routes');

app.use(cors());

app.use('/api', routes);


app.listen(PORT, function(){
    console.log('Server running on port: ', PORT)
});