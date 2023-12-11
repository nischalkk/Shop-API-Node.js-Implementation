const express = require('express')
const router =  express.Router()
const mongoose=require('mongoose')

const Product = require('../models/products')

router.get('/', (req,res,next) =>{
    Product.find().then((resi)=>{
        res.json({resi})
    })
    
});

router.post('/', (req,res,next) =>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save().then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err));
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json({doc})
        }else{
            res.status(404).send("Invalid ID")
        }
    })
    .catch(err=>{console.log(err);
    res.status(500).json({error:err})})

})

router.patch('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:productId',(req,res,next) =>{
    Product.deleteOne({_id:req.params.productId}).then(result=>{
        console.log("Deleted Product ",result);
    })
    .catch(err => console.log(err)) 
})

module.exports = router;
