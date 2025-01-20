import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [inputs, setInputs] = useState("");
  const notify = () => toast("Here is your toast.");
  const { data: session } = useSession();
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // Fetch cart products from the database on mount
  useEffect(() => {
     // Load cart from localStorage on mount
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartProducts(storedCart);

    /// Sync with server if user is logged in
  async function syncCart() {
    if (session) {
      try {
        const { data } = await axios.get("/api/cart");
        setCartProducts(data.map(id => id.product._id));
        localStorage.setItem("cart", JSON.stringify(data));
      } catch (error) {
        console.error("Error syncing cart with server:", error);
      }
    }
  }
  syncCart();
  }, []); // Only fetch once on mount

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever cartProducts changes
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function inputSearch(value) {
    setInputs(value);
  }


  async function addProduct(productId, title) {
   
      try {
        const { data } = await axios.post("/api/cart", { productId });
        setCartProducts(data);
        const newCart = [...cartProducts, productId ];
        setCartProducts(newCart);
        toast.success(`${title} added to cart.${productId}`);
      } catch (err) {
        console.error("Error adding product:", err);
        toast.error("Failed to add product.");
      }
  }
  

  async function removeProduct(productId) {
    try {
      setCartProducts(prev => {
        const pos = prev.indexOf(productId);
        console.log(pos)
        if (pos !== -1) {
          return prev.filter((value,index) => index !== pos);
        
        }
        return prev;
  
      });
      toast.success("Item removed.", {
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
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Failed to remove product." + {productId});
    }
  }

  async function clearCart() {
    try {
      await axios.delete("/api/cart");
      setCartProducts([]);
      toast.success("Cart cleared.");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
