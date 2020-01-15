const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://oministack:oministack@cluster0-sbwn6.mongodb.net/oministack-10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Passa a entender requisições que tenha o corpo no formato json
app.use(express.json());

app.use(routes);

app.listen('3333');