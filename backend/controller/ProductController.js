const Product = require('../model/Product')

exports.getProducts = (req,res) => {
 Product.find().then(data => {
    res.status(200).json({
        message: 'Fetched data successfully.',
        data: data
      });
    }).catch(err => {
        res.status(404).json({
            message: 'Sorry!some error occured',
            data: err
          });
    })
}

exports.AddProduct = (req,res) => {

    const ProductName = req.body.name;
    const ProductDescription = req.body.description;
    const ProductPrice = req.body.price;
    const ProductImage = req.file.path;

    const Products = new Product({
        Name : ProductName,
        Description : ProductDescription,
        Price: ProductPrice,
        Image: ProductImage,
    })
    Products.save().then(() => {
        
        res.status(200).json({ 
            message: 'Data added successfully.',
            status : true
        });
         
    }).catch(err=>{
        res.status(404).json({
            message: 'Data cannot be added.',
            status : false
          });
    });

    
}


exports.getProductsById = (req, res) => {
    const Data = Product.find({"_id":req.params.id.toString()}).
    then(data => {
        res.status(200).json({
            message: 'Fetched data successfully.',
            data: data
          });
    }).catch(err => {
        res.status(404).json({
            message: 'Sorry!some error occured',
            data: err
          });
    })
}

exports.DeleteProductsById = (req, res) => {
    const Data = Product.deleteOne({"_id":req.body.id.toString()}).
    then(data => {
        res.status(200).json({
            message: 'Data Deleted successfully.'
          });
    }).catch(err => {
        res.status(404).json({
            message: err
          });
    })
}


// exports.UpdateProductsById = (req, res) => {
//     const Data = Product.findById(req.params.id.toString())
//     if(Data){
//         Name  = req.body.name
//         Description  = req.body.description
//         Price = req.body.Price
//         Image = ProductImage
//     }
// }