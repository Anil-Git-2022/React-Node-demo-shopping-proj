const User = require('../model/Login')

exports.login = (req,res) => {
    User.findOne({$and:[{username: req.body.username},{password: req.body.password}]}).then((data) => {
        if(data){
          res.status(200).json({status : true,message : "Logged In Successfully",data:data})
        }else{
            res.status(200).json({status : false,message : "Invalid Login"})
        }
    })
      .catch(err => {
        res.status(200).json({error: err.message})
    })
    // .then(res => {
    //     //console.log(res)
    //     res.status(200).json({
    //         message: 'Logged in successfully.',
    //         data: res
    //       });
    // })
    // .catch(err => {
    //     res.status(201).json({
    //         message: 'Sorry Some crtical error found.',
    //         data: err
    //     });
    // })
}

exports.register = (req,res) => {
    const username = req.params.username
    const password = req.params.password

    const user = new User({
        username : "demo",
        password : "demo"
    })

    user.save().then(()=>{
        res.status(200).json({
            message: "Data inserted successfully" 
        })
    }).catch(err => {
        res.status(500).json({
            message : "Sorry! Something went wrong"
        })
    })
}

