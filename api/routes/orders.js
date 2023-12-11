const express = require('express')
const router =  express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')

router.get('/',(req,res,next)=>{
    Order.find()
    .select('_id product quantity')
    .then(orders=>{
        console.log(orders);
        res.status(200).json({
            orders
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(err);
    })
})

router.post('/',(req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
})

router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message:'Order details',
        id: id
    })
})

router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message:'Order deleted',
        id: id
    })
})

module.exports = router;
