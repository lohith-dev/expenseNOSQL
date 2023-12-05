const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const fs =require('fs');
const path =require('path');
const userRouter = require('./routes/userRouter.js');
const expenseRouter = require('./routes/expenseRouter.js');
const purchaseRouter = require('./routes/pruchaseRouter.js');
const leadboardRouter = require('./routes/leadboardRouter.js');
const passRouter = require('./routes/passwordRouter.js');

const errorController = require('./controllers/error');
require('dotenv').config();

// const sequelize = require('./util/database');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);


const morgan = require('morgan');


app.use(express.json());
app.use(morgan('combined',{stream:accessLogStream}))


app.use('/auth', userRouter);
app.use('/password', passRouter);
app.use('/expense', expenseRouter);
app.use('/purchase', purchaseRouter);
app.use('/leadboard', leadboardRouter);

app.use((req,res)=>{
    console.log("reqqqq");
    res.sendFile(path.join(__dirname,`public${req.url}`))
})


app.use(errorController.get404);
// {force:true}
const PORT = process.env.PORT || 3000;
// sequelize.sync().then(result=>{
//     app.listen(PORT,()=>{
//         console.log(`Server is running on port ${PORT} `);
//     });
// })
// .catch(err=>{
//     console.log(err);
// })
const options = { useNewUrlParser: true };
mongoose.connect('mongodb+srv://srlohith92:Lohith%40123@cluster0.kce3sda.mongodb.net/expense',options)
  .then(result => {
    app.listen(PORT,()=>{
      console.log("listening @ port 8000");
    });
  })
  .catch(err => {
    console.log(err);
});




module.exports=app;


