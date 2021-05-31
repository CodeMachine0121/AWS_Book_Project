var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

const getPizza = require('./handlers/getPizza');
const createOrder = require('./handlers/create-order');


module.exports =api;

api.get('/hello', function(){
    return "hello world";
});

api.get('/pizzas',()=>{
    return [
        'Capricciosa',
        'Quattro Formaggi',
        'Napoletana',
        'Margherita'
    ];
});

api.get('pizzas/{id}', (request)=>{
    return getPizza(request.pathParams.id);
}, {
    error:404
});


api.post('/orders', function(request){
    
    let body = request.body;
    
    return createOrder(body);
},{
    success:201,
    error:404
});


const getOrder = require('./handlers/get-order');
api.get('getOrder/{uuid}', function(request){

    return getOrder(request.pathParams.uuid);
},{
    success:201,
    error:404
});

const updateOrder = require('./handlers/update-order');
api.post('updateOrder', (request)=>{
    let orderId = request.body.orderId;
    let body = request.body;
    return updateOrder(orderId, body);

},{
    success:201,
    error:404
});


const deleteOrder = require('./handlers/delete-order');
api.post('deleteOrder', (request)=>{
    
    let orderId = request.body.orderId;
    return deleteOrder(orderId);
},{
    success:201,
    error:404
});
