/*
This line imports the Express module. The require function loads the module and returns
 the exported object, which in the case of Express, is a function.
 */
const express = require('express'); // aquiring the express function from module
const app = express(); // calling the acquired express function
/*
Express is a function that, when called, creates an instance of an Express application.
This instance (app) is an object that you can use to configure your web server,
define routes, and handle requests.
*/

const indexRouter = require('./routes/index.routes')

const userRouter = require('./routes/user.routes');

const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db')
connectToDB();

const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs'); // make a views folder for this

app.use(express.json())
app.use(express.urlencoded({encoded: true}))
app.use(cookieParser())

/*
// we never put our routes in app.js, hence we make a routes folder
app.get('/', (req, res) => {
    // res.send('Hello World'); to test the page
    res.render("index"); // to display index page
})
*/

app.use('/', indexRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    //http://localhost:3000/
})