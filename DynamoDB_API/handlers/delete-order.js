const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();


function deleteOrder(orderId){

    var param = {
        TableName: 'pizza_orders',
        Key:{
            orderId: orderId
        }
    }

    return docClient.delete(param).promise().then((result)=>{
        console.log("Order is deleted\n")
        return result;
    }).catch((deleteError)=>{
        console.log("Order is not deleted\n");
        throw deleteError;
    });
}

module.exports =deleteOrder;