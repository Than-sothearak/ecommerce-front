import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
    const [inputs, setInput] = useState("");
  const [loaded, setLoaded] = useState(false); // ⭐ NEW
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const { data: session } = useSession();

  // ⭐ Load localStorage ONCE
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
    setLoaded(true); // now loaded
  }, []);

  // ⭐ Save only after loading initial data
  useEffect(() => {
    if (!loaded) return; // prevent overwriting on first load
    ls?.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts, loaded]);

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