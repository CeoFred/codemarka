const Conversation = require('../models/conversation');
const mongoose = require('mongoose');

exports.conversation_get_all =  (req,res,next) => {

    Conversation.find({classroom_id:req.body.cr_id})
    .select('conversation quantity _id')
    .populate('username','name')
    // populate helps relate our conversations
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
               return{
                _id: doc.id,
                conversation: doc.conversation,
                quantity: doc.quantity,
                request: {
                    type: 'GET',
                    url : 'http://localhost:3000/orders/'+ doc._id
                }
               }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.orders_create = (req,res,next) =>{
        conversation.findById(req.body.conversationId)
            .exec()
            .then(conversation => {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    conversation: req.body.conversationId
                });
             return  order.save()
        })
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Order Stored',
                createdOrder: {
                    _id: result._id,
                    conversation: result.conversation,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/'+ result._id
                }
            })
        })
        .catch(err => {
            res.status(404).json({
                message: "conversationID not found",
                error: err
            });
        })
}

exports.orders_get_single = (req,res,next) => {
    Order.findById(req.params.orderId)
    .populate('conversation')
    .exec()
    .then(order => {
        res.status(200).json({
            orderSummary: order,
            request: {
                type:'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err => {
        res.status(404).json({
            messgae: err
        })
    })
}

exports.orders_delete = (req,res,next) => {

    Order.deleteOne({_id:req.params.orderId})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'order deleted',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};