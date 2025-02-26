const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator'); // to test if the data is valid or not
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* test
router.get('/test', (req, res)=> {
    res.send('user Test route');
})
*/

// /user/register bcz we have app.use /user in app.js
router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({min: 13}),
    body('password').trim().isLength({min: 5}),
    body('username').trim().isLength({min: 3}),
    async (req, res) => {
        
        /*
        a test to check if we are getting the data
        console.log(req.body);
        make sure these middlewares are in app.js otherwise we will get undefined as error of req.body
        app.use(express.json())
        app.use(express.urlencoded({encoded: true}))
        */

        const errors = validationResult(req);

        if(!errors.isEmpty()){
           return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
           })
        }
        //res.send(errors) // to display the errors after submit on the server screen

        const {email, username, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            email,
            username,
            password:hashPassword
        })

        // test to see if our form data is being submitted or not
        res.json(newUser) // .json refers to the file format whenever we transer from server to db to client
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min: 5}),
    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid data'
            })
        }

        const {username, password} = req.body;

        const user = await userModel.findOne({
            username: username
        })

        if(!user){
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: 'password or password is incorrect'
            })
        }

        // install jsonwebtoken
        const token = jwt.sign({
            userID: user._id,
            email: user.email,
            username: user.username
        },
        process.env.JWT_SECRET,
        )

        /* to test the token
        res.json({
            token
        })
        */
       res.cookie('token', token)
       res.send('Logged in')
    }
)

module.exports = router;