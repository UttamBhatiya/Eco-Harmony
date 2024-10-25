const express = require("express");
const methodOverride = require('method-override');
const path = require('path');
const cookieParser = require('cookie-parser');



const userRouter = require('./Routes/User');
const transactionRouter = require('./Routes/Transaction');
const listingRouter = require('./Routes/Listing');

const app = express();
const port = 8000;


//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views",path.resolve("./Views"));
app.set("views", path.join(__dirname,"Views"));



//Routes
app.use('/user', userRouter);
app.use('/listing', listingRouter);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});