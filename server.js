const express = require('express');
const connectDB = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

//initMiddleware
app.use(express.json({ extended:false }));

//routes
app.use('/api/users',require('./router/api/userRouter'));
app.use('/api/posts',require('./router/api/postRouter'));
app.use('/api/profile',require('./router/api/profileRouter'));
app.use('/api/auth',require('./router/api/authRouter'));

app.get('/',(req,res)=>{
    res.send('API running')
})

app.listen(PORT,()=>{console.log(`Server started at 127.0.0.1:${PORT}`)});