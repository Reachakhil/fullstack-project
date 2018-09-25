const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var sendRes = function(ref, obj, status, code) {
	if(status == 1) {
		ref.send(obj);
	} else {
		ref.status(code).send(obj);
	}
}

router.post('/api/login', function(req, res) {
            console.log(res);
		var email = req.body.email;
		var password = req.body.password;
		if(email != 'test@gmail.com') {
			sendRes(res, {msg: 'Email does not exist', code: 0}, 0, 403);
			return;
		}
		if(password != '123456') {
			sendRes(res, {msg: 'Password is invalid', code: 1}, 0, 403);
			return;
		}
		sendRes(res, {msg: 'success', code: 3}, 1, 200);

})

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) =>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
    else
    cb(null, false);
}

const upload = multer({storage: storage, limit: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});

const Product = require('../models/product');



router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id productImage age gender')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    age:doc.age,
                    gender:doc.gender,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/products/'+ doc._id
                    }
                }
            })
        };
        
            res.status(200).json(response);       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.post('/', upload.single('productImage'), (req, res, next) => {
     console.log(req);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        age: req.body.age,
        address:req.body.address,
        gender:req.body.gender,
        productImage: req.file.path
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'created Product',
            createdProduct: {
                name: result.name,
                age: req.body.age,
                address:req.body.address,
                gender:req.body.gender,
                _id: result._id,
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/products/'+result._id
                }
            }
        });
    })
    .catch(err => console.log(err));
   
});


//enhance
router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
   Product.findById(id)
   .select('name  productImage age gender address')
   .exec()
   .then(doc => {
       console.log(doc);
       if(doc){
           res.status(200).json({
       product: doc,
       request: {
           type: 'GET',
           url: 'http://localhost:3001/products'
       }
        });
    }else
       res.status(404).json({message:'No valid entry found for provided ID'});
    })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   })
});

router.post('/:productId',(req, res, next) => {
    const id = req.params.productId;
    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    console.log(req.body);

    Product.update({_id: id}, {$set: req.body})
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router. delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
 });

module.exports = router;