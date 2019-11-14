const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const client = require('./client');

const app = express();

mongoose.connect('mongodb+srv://hashlab:hashlab@hashlab-gksy3.mongodb.net/hashlab?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(8086);