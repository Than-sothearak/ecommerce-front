import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
    const [inputs, setInput] = useState("");
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { data: session } = useSession();

useEffect(() => {
  ls?.setItem("cart", JSON.stringify(cartProducts));
}, [cartProducts]);


  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  const addProduct = (productId, title) => {
    setCartProducts(prev => [...prev,productId]);
    toast.success(`${title} added to cart.`);
  };
  
  const removeProduct = (productId) => {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
    toast.success("Product removed from cart.");
  };
  
  function clearCart() {
    setCartProducts([]);
  }

    const inputSearch = (value) => {
    setInput(value);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
         inputSearch,
        inputs,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}