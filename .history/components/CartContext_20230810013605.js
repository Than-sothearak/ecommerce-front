import { createContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
export const CartContext = createContext({});

export function CartContextProvider({ children, products}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [inputs, setInputs] = useState('');
  const notify = () => toast('Here is your toast.');

  console.log(products)
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
  function inputSearch () {

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
        cartProducts,
        notify,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        products,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const featuredProduct = await Product.find({}, null, {
    sort: { price: -1 },
    limit: 1,
  });
  const categories = await Category.find()
  const mainCategories = categories.filter(c => !c.parent)
  return {
    props: {
      products: JSON.parse(JSON.stringify(featuredProduct)),
      newProduct: JSON.parse(JSON.stringify(newProduct)),
      categories: JSON.parse(JSON.stringify(categories)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories))
    },
  };
}

