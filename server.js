const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('API running')
})

app.listen(PORT,()=>{console.log(`Server started at 127.0.0.1:${PORT}`)});