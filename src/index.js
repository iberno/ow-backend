const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

//MongoDB (Não relacional)
mongoose.connect('mongodb+srv://hoff:h0ffmann3@cluster0-sxuij.mongodb.net/node?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);