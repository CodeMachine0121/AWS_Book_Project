const pizzas=require("../data/pizzas.json");

function getPizzas(pizzaId){
    // no id exist then return all list
    if(!pizzaId) return pizzas;

    const pizza = pizzas.find((pizza)=>{
        return pizza.id == pizzaId;
    });

    if(pizza) return pizza;

    throw new Error('The pizza you requestsed was not found');
}

module.exports=getPizzas;