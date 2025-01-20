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


   // Fetch cart products from the database on mount
   useEffect(() => {

    // Load cart from localStorage on mount
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartProducts(storedCart);
  
    async function fetchCart() {
     if (session) {
      try {
        
        const { data } = await axios.get("/api/cart");
        setCartProducts(data);
      } catch (error) {
        console.error("Error fetching cart products:", error);
        toast.error("Failed to load cart.");
      }
     }
    }
    fetchCart();
  }, []); // Only fetch once on mount
  const filteredProductCarts = cartProducts.map(entry => entry.product);


  function inputSearch(value) {
    setInputs(value);
  }
  async function addProduct(productId, title) {
    if (session) {
      try {
        const { data } = await axios.post("/api/cart", { productId });
        setCartProducts(data);
        toast.success(`${title} added to cart.`);
      } catch (err) {
        console.error("Error adding product:", err);
        toast.error("Failed to add product.");
      }
    } else {
      toast.error("You must be logged in to add items to the cart.");
    }
  }

  async function removeProduct(productId) {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`);
      setCartProducts(data); // Assuming the API returns the updated cart
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
      toast.error("Failed to remove product.");
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
        filteredProductCarts,
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
