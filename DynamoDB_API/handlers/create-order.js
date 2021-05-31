const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const docClient = new AWS.DynamoDB.DocumentClient();

const uuid = require('uuid');

function createOrder(order){
    if(!order && !order.pizzaId  && !order.address){
        throw new Error("To order pizza please provide youre pizza type and address");
    }
    
    var item = {
        //"orderId": order.pizzaId.toString(),
        orderId: uuid.v4(),
        address: order.address,
        pizza: order.pizza,
        
        orderStatus: "pending"
    };

    params = {
        TableName: 'pizza_orders',
        Item: item
    };

    return docClient.put(params).promise()
        .then((res)=>{
            //console.log("Order is saved!", res);
            return {"message":"Order is saved!"};
        })
        .catch((saveError)=>{
            //console.log('Opps, order is not saved: (',saveError);
            throw saveError
        });
      
}
module.exports=createOrder;