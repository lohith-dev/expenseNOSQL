
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const filedownloadSchema = new Schema({
  fileUrl: {
    type: String,
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true,
  }

},{ timestamps: true });

module.exports = mongoose.model('Filedownload', filedownloadSchema);



// const Sequelize = require('sequelize');
// const sequelize  = require('../util/database');

// const FilesDownloaded = sequelize.define('FilesDownloaded',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement :true,
//     allowNull:false,
//     primaryKey:true
//   }, 
//   fileUrl : {
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


// module.exports = FilesDownloaded;
