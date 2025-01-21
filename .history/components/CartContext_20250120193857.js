import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [inputs, setInputs] = useState('');
  const notify = () => toast('Here is your toast.');

  
  // Fetch cart products from the database on mount
  useEffect(() => {
    async function fetchCart() {
      try {
        const { data } = await axios.get("/api/cart");
        setCartProducts(data);
      } catch (error) {
        console.error("Error fetching cart products:", error);
        toast.error("Failed to load cart.");
      }
    }
    fetchCart();
  }, []);

  function inputSearch (value) {
    setInputs(value)
  }
  function addProduct(productId, title) {
    setCartProducts((prev) => [...prev, productId]);
    toast.success(`${title} Added to cart`);
  }
  
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value,index) => index !== pos);
      
      }
      return prev;

    });
    toast.success(`Item removed`, {
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#eb4d4b',
      },
      iconTheme: {
        primary: '#ff7979',
        secondary: '#FFFAEE',
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
        cartProducts:[],
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

