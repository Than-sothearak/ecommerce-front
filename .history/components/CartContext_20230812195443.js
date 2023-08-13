import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [whislist, setWhislist] = useState([]);
  const [inputs, setInputs] = useState("");
  const notify = () => toast("Here is your toast.");

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function inputSearch(value) {
    setInputs(value);
  }
  function addProduct(productId, title) {
    setCartProducts((prev) => [...prev, productId]);
    toast.success(`${title} Added to cart`);
  }
  function addWhislist(productId) {
    setWhislist((prev) => [...prev.productId]);
    toast.success(`Added to whislist`);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
    toast.success(`Item removed`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#eb4d4b",
      },
      iconTheme: {
        primary: "#ff7979",
        secondary: "#FFFAEE",
      },
    });
  }
  function clearCart() {
    ls.removeItem("cart");
    setCartProducts([]);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        inputs,
        inputSearch,
        notify,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        addWhislist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
