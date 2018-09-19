var express = require('express');
var router = express.Router();

var Customer =require("../models/customer");


router.post('/add', function(req, res, next) {
    var newCustomer = new Customer(req.body.data);
    newCustomer.save( (err,customer) =>{
        if(err){
            res.send(err);
        }else{
             res.json({message:"user added succesfully",customer});
        }
    });
  });

router.get('/list', function(req, res, next) {
let query =Customer.find({});
query.exec((err,customer)=>{
    if(err){
        res.send();
    }
    else{
      res.send({sucess:true,message:"success",customer});
       // res.json({customer});
    }
});
});


router.get('/profile/:name', function(req, res, next) {
  Customer.findOne({name: req.params.name},(err,customer)=>{
      if(err||customer===null){
        res.status(404).send({success: false, message: "User Not Found"})
      } 
      else
      res.status(200).send({success: true, message: "Succesfully fetched user details", customer});

  })
  });

  router.put('/update/:name', function(req, res) {
    Customer.findOneAndUpdate({name:req.params.name}, req.body.data, {new:true}, (err, doc) => {
        if(err){
       res.status(500).send({success: false, message: "Unable to update data"})      
        } 
        else{
               res.status(200).send({success: true ,message: "Succesfully updated the data", result: doc});
        }
        //Object.assign(customer, req.body).save((err, customer) => {
          //if(err) res.send(err);
          //res.json({ message: 'Customer updated!', customer });
       // }); 
      })

  });

  router.delete('/delete/:name', function(req, res, next) {
    Customer.remove({name : req.params.name}, (err, doc) => {
      if(err){
         res.status(500).send({success: false, message: "Unable to delete the user"});
}else
      res.status(200).send({success: true, message: "Succesfully deleted the user", customer: doc});
        //res.json({ message: "Customer Info successfully deleted!", customer });
      });

  });


module.exports = router;
