var express = require('express');
var router = express.Router();

var Customer =require("../models/customer");


// router.post('/add', function(req, res, next) {
//     var newCustomer = new Customer(req.body.data);
//     newCustomer.save( (err,customer) =>{
//         if(err){
//             res.send(err);
//         }else{
//              res.json({success:true,message:"user added succesfully",customer});
//         }
//     });
//   });


router.route('/add').post((req, res) => {
    let issue = new Customer(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});



  router.route('/list').get((req, res) => {
    Customer.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});


router.get('/profile/:name', function(req, res, next) {
  Customer.find({name: req.params.name},(err,customer)=>{
      if(err||customer===null){
        res.status(404).send({success: false, message: "User Not Found"})
      } 
      else
      res.status(200).send({success: true, message: "Succesfully fetched user details", customer});

  })
  });

//   router.put('/update/:name', function(req, res) {
//     Customer.findOneAndUpdate({name:req.params.name}, req.body.data, {new:true}, (err, doc) => {
//         if(err || req.params.name === null){
//        res.status(500).send({success: false, message: "Unable to update data"})      
//         } 
//         else{
//                res.status(200).send({success: true ,message: "Succesfully updated the data", result: doc});
//         }
//         //Object.assign(customer, req.body).save((err, customer) => {
//           //if(err) res.send(err);
//           //res.json({ message: 'Customer updated!', customer });
//        // }); 
//       })

//   });

//   router.delete('/delete/:name', function(req, res, next) {
//     Customer.remove({name : req.params.name}, (err, doc) => {
//       if(err){
//          res.status(500).send({success: false, message: "Unable to delete the user"});
// }else
//       res.status(200).send({success: true, message: "Succesfully deleted the user", customer: doc});
//         //res.json({ message: "Customer Info successfully deleted!", customer });
//       });

//   });

router.route('/delete/:id').get((req, res) => {
    Customer.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})


router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id, (err, issue) => {
        if (err)
        res.send(err);
           // return next(new Error('Could not load document'));
        else {
            issue.name = req.body.name;
            issue.age = req.body.age;
            issue.address = req.body.address;
            issue.gender = req.body.gender;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


module.exports = router;
