const express = require('express')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const cors = require('cors')
const authRouter = require("../Api/routers/auth")
const userRouter = require('../Api/routers/user')
const postRouter = require('../Api/routers/post')
const commentRouter = require('../Api/routers/comment')

const app = express();
dotenv.config();
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Mongodb Connected'))
.catch((err)=> console.log(err))

////Middlewere Function

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended: true, limit:'50mb'}))
app.use(cors())
app.use('*', cors())
app.get('/', async(req,res) => {
    res.status(200).json({message :"Successfully Conected"})
})

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter )
app.use('/api/comments', commentRouter)

const PORT= 5000;

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
