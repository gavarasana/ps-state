export default function cartReducer(cart, action){
    switch (action.type) {
        case "empty":
            return [];
        case "add": {
            const sku = action.sku;
            const id = action.id;
            const itemInCart = cart.find((c) => c.sku === sku);  
            if (itemInCart){
                return cart.map((i) => i.sku===sku ? {...i, quantity: i.quantity +1 } : i);
                }
            else {
                return [...cart, {id, sku, quantity:1}];
            };
        }
        case "update" :
            const quantity = action.quantity;
            const sku = action.sku;
            return (quantity === 0 ) ?  cart.filter((i) => i.sku !== sku) : cart.map((i) => i.sku===sku ? {...i, quantity} : i);                
        default:
            throw new Error("Unexpected action type " + action.type);
    }
}