const Product = require('../model/Product')
const User = require('../model/Login')
const Order = require('../model/Order');
const Cart = require('../model/Cart');
const mongoose = require('mongoose');

exports.makePayment = (req, res) => {
   
    image = req.body.cart == 1 ?req.body.image: req.body.image.split(',')
    Prodname = req.body.cart == 1 ?req.body.name:req.body.name.split(',')
    ProdQuant = req.body.cart == 1?req.body.quantity:req.body.quantity.split(',')
    ProdTotal = req.body.cart == 1?req.body.total:req.body.total.split(',')
    UserId = req.body.uid

    // //console.log(image[1])

    var i=0,orderObj=[];

    if(req.body.cart == 1){
        orderObj[0] = {
            quantity : ProdQuant,
            productName : Prodname,
            price : ProdTotal,
            purchase_date : new Date().toISOString(),
            payment_method : 'Cash',
            image_path : image,
        }
    }else{
        for(i=0;i<image.length;i++){
            orderObj[i] = {
                quantity : ProdQuant[i],
                productName : Prodname[i],
                price : ProdTotal[i],
                purchase_date : new Date().toISOString(),
                payment_method : 'Cash',
                image_path : image[i]
            }
        }
    }
    
    console.log(orderObj)



    const order = new Order({
        user_id : UserId,
        my_orders : orderObj,
    })

    Order.find({ user_id : UserId }).then((query) => {
        console.log(query[0]._id)
        console.log(query)
        if(query){
            Order.updateMany(
                { "_id": query[0]._id},
                { "$push": { "my_orders": orderObj } },
                function (err, raw) {
                    if (err) return handleError(err);
                    Cart.find({user_id : UserId}).deleteMany().then(()=> {
                        res.status(200).json({
                            status : true,
                            message : "Order placed Successfully"
                        })
                    })
                }
             );
        }else{
            
        }
    }).catch(err => {
       
            order.save().then(()=> {
        
                Cart.find({user_id : UserId}).remove().then(()=> {
                    res.status(200).json({
                        status : true,
                        message : "Order placed Successfully"
                    })
                })
            }).catch(err => {
                res.status(500).json({
                    status : false,
                    message : err 
                })
            })
    })

    

}


exports.getOrders = function(req, res) {

    Order.find({user_id : req.params.id}).then((data) => {
        if(JSON.stringify(data[0])){
            resp = JSON.stringify(data[0])
            res.status(200).json({
                status : true,
                data : JSON.parse(resp),
                message : "Data fetched successfully"
            })
        }else{
            res.status(200).json({
                status : false,
                data : 0,
                message : "Data Not Found"
            }) 
        }
    }).catch(err => {
        res.status(500).json({
            status : false,
            message : err
        })
    })
}