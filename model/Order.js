
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentid: {
    type: String,
    default :""
  },
  Orderid: {
    type: String,
  },
  status :{  
      type:String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }

},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);






// const Sequelize = require('sequelize');
// const sequelize  = require('../util/database');

// const UserModel = require('./User.js')

// const Order = sequelize.define('order',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement :true,
//     allowNull:false,
//     primaryKey:true
//   }, 
//   paymentid: {
//     type: Sequelize.STRING,

//   },
//   Orderid: {
//     type: Sequelize.STRING,

//   },
//   status :{  
//     type: Sequelize.STRING,
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
// },
// {
//     timestamps: true,
//     underscored: true
// })



// module.exports = Order;
