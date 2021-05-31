const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, options){

    if (!options || !options.pizza || !options.address){
        throw new Error('Both pizza and address are required to update an order')
    }

    var param = {
        TableName: 'pizza_orders',
        Key:{
            orderId: orderId
        },
        UpdateExpression: 'set #p=:p, #a=:a, #o=:o',
        ExpressionAttributeNames: {
            '#p': 'pizza',
            '#a': 'address',
            '#o': 'orderStatus'
        },
        ExpressionAttributeValues:{
            ':p': options.pizza,
            ':a': options.address,
            ':o': options.orderStatus
        },
        ReturnValues: 'ALL_NEW'
    }

    return docClient.update(param).promise().then((result)=>{
        console.log('Order is updated', result)
        return result.Attributes
    }).catch((updateError)=>{
        console.log('order is not updated: ', updateError)
       throw updateError
    });

}

module.exports=updateOrder;