const Product = require('../model/Product')
const User = require('../model/Login')
const Carts = require('../model/Cart');
const Cart = require('../model/Cart');
const mongoose = require('mongoose');

exports.addProductCart = (req, res) => {
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
   
    

   
    Carts.findOne({$and:[{user_id: req.body.user_id.toString()},{product_id: req.body.product_id.toString()}]}).then((data) => {
        
        if(data){
          data.quantity = parseInt(data.quantity)+ 1;
          data.save().then(() => {
                Carts.find({user_id: req.body.user_id.toString()}).count(function(err, count) {
                    res.status(200).json({ 
                        message: 'Data Updated successfully.',
                        status : true,
                        document : count
                    });
                })  
            }).catch(err=>{
                res.status(404).json({
                    message: 'Data cannot be Updated.',
                    status : false,
                    error:err
                });
            });
        }else{
            const Cart = new Carts({
                user_id : user_id,
                product_id : product_id,
                quantity : quantity
            })
            Cart.save().then(() => {
                
                Carts.find({user_id: req.body.user_id.toString()}).count(function(err, count) {
                    res.status(200).json({ 
                        message: 'Data Inserted successfully.',
                        status : true,
                        document : count
                    });
                })  
                 
            }).catch(err=>{
                res.status(404).json({
                    message: 'Data cannot be added.',
                    status : false
                  });
            });
        }
    })
      .catch(err => {
        res.status(200).json({error: err.message})
    })

   
}

exports.getCartData = (req, res) => {
    Cart.aggregate([{ 
        $match: {
            "user_id": new mongoose.Types.ObjectId(req.params.id)
        } 
    },
    {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_info",
        //   pipeline: [
        //     { $match: { "Name": "Fridge" } } For Putting Condition inside the joining relation
        //  ]
        },
        
      }
    ]).then((data)=>{
        res.status(200).json({ 
            message: 'Data fetched successfully.',
            status : true,
            data : data
        });
    })
}