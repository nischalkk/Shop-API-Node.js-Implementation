const express = require('express')
const router =  express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        messgage:'Handling GET requests to /orders'
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        orderId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:'Handling POST requests to /orders',
        order
    })
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
