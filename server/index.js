require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const Login = require("./router/login")
const cors = require('cors')
app.use(cors()) 




app.use('/user', Login)
 
app.listen(port,function(){
	console.log('listening to port ' + port);
})
