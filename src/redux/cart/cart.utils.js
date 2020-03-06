export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id)

    if(existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
            ?
            {...cartItem, quantity: cartItem.quantity + 1}
            :
            cartItem
            )
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id)
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
    }

    return cartItems.map(cartItem => 
        cartItem.id === itemToRemove.id
        ? {...cartItem, quantity: cartItem.quantity -1}
        : cartItem    
    )
}