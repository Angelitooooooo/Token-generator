const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const cors = require('cors')
router.use(cors()) //Cross-Origin Resource Sharing (CORS
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {authenticateToken,refreshToken} = require('../middleware/token')
//use router instead of app
const moment = require("moment")

const User = require('../sample/data')
 
router.post('/signup', (req, res) => {
    const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
    })
    newUser.save( (err) =>{
        if(err){
            return res.status(400).json({
                title : 'error',
                message : 'Email already in use'
            })
        }
        return res.status(201).json({
            title : 'Sign up success',
        })

    })
})
router.post('/login',  (req, res) => {
    // try {    
        function differenceInMinutes(dateStr1, dateStr2) {
            const date1 = new Date(dateStr1);
            const date2 = new Date(dateStr2);
            const diffInMs = Math.abs(date2 - date1);
            const minutes = Math.floor(diffInMs / (1000 * 60));
            return minutes;
        }
        const { username,password } = req.body
        let attemp =  User.filter(rec=>{
            return rec.username == username 
        })
        if(attemp.length > 0){
            if(User[User.indexOf(attemp[0])].timeStamp !== null){
                let time = differenceInMinutes(User[User.indexOf(attemp[0])].timeStamp,moment().format("YYYY-MM-DD hh:mm:ss"))
                if(time >= 15){
                    User[User.indexOf(attemp[0])].timeStamp = null
                    User[User.indexOf(attemp[0])].loginAttemp = 0
                }else{
                    return res.status(403).json({
                        title : 'error',
                        message : 'Kindly wait for 15 minutes before logging in again.',
                        })
                }
            }
        let user =  User.filter(rec=>{
             return rec.username == username && rec.password == password
         })
         if(user.length > 0 ){
         let token = jwt.sign( {userId : user._id} , process.env.SECRET_KEY , { expiresIn : '15s'})
            res.status(200).json({
                title : 'Success',
                token : token,
                refreshToken : jwt.sign( {userId : user._id} , process.env.REFRESH_TOKEN_SECRET)
            })
         }else{
                if(User[User.indexOf(attemp[0])].loginAttemp >=4){
                    User[User.indexOf(attemp[0])].timeStamp = moment().format("YYYY-MM-DD hh:mm:ss")
                }
                if(User[User.indexOf(attemp[0])].timeStamp !== null){
                    return res.status(403).json({
                        title : 'error',
                        message : 'Exceed Maximum Attemp',
                    })
                }
                    User[User.indexOf(attemp[0])].loginAttemp ++
                    return res.status(401).json({
                        title : 'Invalid Credentials',
                        message : 'Invalid Credentials',
                    })
            }
         }
})

router.post('/refresh', refreshToken, async (req, res) => {
    res.send({token : req.token})
})




router.get('/user', authenticateToken, async (req, res) => {
    res.send("true")
})






// router.get('/getUser', async (req, res) => {
//     try{
//         const user = await User.find()
//         res.json(user)
//     } catch (err) {
//         res.status(500).json({ message : err.message})
//     }
// })


 
// ========================== your routes here ==============================//
 
 
// ========================== your routes here ==============================//
 
module.exports = router;