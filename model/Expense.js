
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expense: {
    type: Number,
   
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    allowNull: false,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }
},{ timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
// const Sequelize = require('sequelize');
// const sequelize  = require('../util/database');

// const Expense = sequelize.define('expense',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement :true,
//     allowNull:false,
//     primaryKey:true
//   }, 
  
//   expense: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category :{   
//     type: Sequelize.STRING,
//     allowNull: false,
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


// module.exports = Expense;
