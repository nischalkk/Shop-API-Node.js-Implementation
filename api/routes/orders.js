const express = require('express')
const router =  express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/products')



router.get('/',(req,res,next)=>{
    Order.find()
    .select('_id product quantity')
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            orders:docs.map(doc=>{
                return{
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3002/orders/'+doc._id
                    }
                }
            })
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
        res.status(201).json({
            message: 'Order stored',
            createdOrder: {
                _id: result._id,
                    product: result.product,
                    quantity: result.quantity
            },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3002/orders/'+result._id
                    }
        });
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
