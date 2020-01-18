const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//MongoDB (Não relacional)
mongoose.connect('mongodb+srv://hoff:h0ffmann3@cluster0-sxuij.mongodb.net/node?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);