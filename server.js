const express = require('express');
const connectDB = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

//initMiddleware
app.use(express.json({ extended:false }));

//routes
app.use('/api/users',require('./router/userRouter'));
app.use('/api/posts',require('./router/postRouter'));
app.use('/api/profile',require('./router/profileRouter'));
app.use('/api/auth',require('./router/authRouter'));

app.get('/',(req,res)=>{
    res.send('API running')
})

app.listen(PORT,()=>{console.log(`Server started at 127.0.0.1:${PORT}`)});