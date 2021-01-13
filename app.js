const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv');
const app = express();

env.config();

// routers
const mainRouter = require('./src/routes/main');
const authRouter = require('./src/routes/auth');
const categoryRouter = require('./src/routes/category');
const passwordRouter = require('./src/routes/password');

// database connection
mongoose.connect(
    `mongodb://localhost:27017/${process.env.DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected')
})

// set view engine
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './src/public')));


app.use('/', mainRouter);
app.use('/', authRouter);
app.use('/', categoryRouter);
app.use('/', passwordRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});