import { createContext, useState } from "react"

export const CartContext = createContext({});

const CartContextProvider = ({children}) => {
    const [cartProducts,setCartProducts] = useState([]);
  return (
    <CartContext.Provider value={{cartProducts}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider