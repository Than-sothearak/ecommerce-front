import { createContext, useState } from "react"

export const CartContext = createContext({});

export function CartContextProvider({children})  {
    const [cartProducts,setCartProducts] = useState([]);
    function addProductToCart(productId) {
      setCartProducts(prev => [...prev, productId])
    }
  return (
    <CartContext.Provider value={{cartProducts, addProductToCart}}>
        {children}
    </CartContext.Provider>
  )
}

