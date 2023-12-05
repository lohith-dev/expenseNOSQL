const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const frogotpasswordSchema = new Schema({
  _id:{
    type: String,
    required : true,
    primaryKey:true,
  },
  isactive: {
    type: String,
    required : true
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }

},{ timestamps: true });

module.exports = mongoose.model('Forgotpassword', frogotpasswordSchema);










// const Sequelize = require('sequelize');
// const sequelize  = require('../util/database');

// const ForgotPasswordRequests = sequelize.define('ForgotPasswordRequests',{
//   id: {
//     type: Sequelize.STRING,
//     allowNull:false,
//     primaryKey:true
//   }, 
//   userId : {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   isactive : {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },  
// },
// {
//     timestamps: true,
//     underscored: true
// })


// module.exports = ForgotPasswordRequests;
