
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();



function getOrder(orderId){


    if(typeof orderId ==='undefined'){
        return docClient.scan({
            TableName: 'pizza_order'
        }).promise()
        .then(result=>result.items) // 要記得Items和Item差別
    }
    

    return docClient.get({

        TableName: 'pizza_orders',
        Key:{
            
            orderId: orderId
        }

    }).promise()
    .then(result=>result.Item);
    
}


module.exports=getOrder;