const express = require('express')
const router =  express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        messgage:'Handling GET requests for orders'
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message:'Handling POST requests for orders'
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
