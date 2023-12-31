const Razorpay =require('razorpay');
const Sequelize = require('../util/database.js');
const Order = require('../model/Order.js');
// let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../model/User.js');

const purchasePremium = async (req,res)=>{
// console.log("oooooo",req.user);
     try{
       var rzp=new Razorpay({
        key_id : process.env.KEY_ID,
        key_secret :process.env.KEY_SECRET
    })
    const amount =2500;

    rzp.orders.create({amount,currency:"INR"},(err,order)=>{
        if(err){
            console.log(err);
            throw new Error(JSON.stringify(err));
        }
        console.log(order.id);
        
        Order.create({Orderid:order.id,status:'PENDING',userId:req.user}).then(()=>{
            return res.status(201).json({order,key_id:rzp.key_id})
        }).catch((err)=>{
            throw new Error(err);
        })
      
    })
            
     }catch(err){
        console.log(err);
     }
}

const updateTransacitonStatus = async (req,res)=>{
    try{
    
        const { payment_id , order_id } =req.body;

        Order.findOne({Orderid:order_id}).then(order=>{
            if(order){
                console.log("heyyyyyy",order);
                Order.updateOne({Orderid:order_id},{paymentid:payment_id,status:"SUCCESSFUL"}).then(()=>{
                    userModel.findOneAndUpdate(
                        { _id: req.user._id },
                        { ispremiumuser: true },
                        { new: true }
                      ).then((result)=>{
                        let {id,email,ispremiumuser}=result;
                        const payload = {id,email,ispremiumuser};
                        const token = jwt.sign(payload, "thisissecreateKey", { expiresIn: "24hr" });
       
                        return res.status(202).json({token:token,success:true,message:"Transaction Successful"})
                      }).catch(err=>{
                        throw new Error(err);
                    })
                }).catch(err=>{
                    throw new Error(err);
                })
            }
        }).catch(err=>{
            throw new Error(err);
        })

           
    }catch(err){
       console.log(err);
    }
}

const transactionFailedStatus = async (req,res)=>{
    console.log("im here");
    try{
    
        const { payment_id , order_id } =req.body;
        console.log(req.body);
        Order.findOne({Orderid:order_id}).then(order=>{
            console.log("heyyyyyyyy",order);
            order.update({paymentid:payment_id,status:'FAILED'}).then(()=>{
                return res.status(404).json({success:false,message:"Transaction Failed"})
                
            }).catch(err=>{
                throw new Error(err);
            })
        }).catch(err=>{
            throw new Error(err);
        })

           
    }catch(err){
       console.log(err);
    }
}


module.exports={
    purchasePremium,
    updateTransacitonStatus,
    transactionFailedStatus
}