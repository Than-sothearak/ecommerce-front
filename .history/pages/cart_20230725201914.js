import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import Input from "@/components/Input";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const ButtonStyle = styled.button`
  border: 0;
  padding: 8px 40px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: gray;
  margin-top: 20px;
`;

const ButtonStylePlus = styled.button`
  border: 1 solid gray;
  padding: 8px 8px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  background-color: transparent;
`;

const CartPage = () => {
  const { cartProducts, setCartProducts, addProduct, removeProduct,clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setIsSuccess] = useState(false);


  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts })
      .then(res => {
        setProducts(res.data);
      })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  
  function increaseProduct (id) {
    addProduct(id);
  }

  function decreaseProduct (id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = cartProducts.find(p => p._id == productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
          <h2>Cart</h2>
            {!cartProducts?.length > 0 && (
              <div>Your cart is empty</div>
            )}           
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                     <ProductInfoCell>
                      <ProductImageBox>
                        <img src={product.images[0]} alt={product.title}/>
                      </ProductImageBox>
                      <td>{product.title}:</td>
                     </ProductInfoCell>
                      <td>
                        <ButtonStylePlus onClick={() => decreaseProduct(product._id)}>
                          -
                        </ButtonStylePlus>
                        <QuantityLabel>
                          {cartProducts?.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <ButtonStylePlus onClick={() => increaseProduct(product._id)}>
                          +
                        </ButtonStylePlus>
                      </td>
                      <td>
                      ${cartProducts?.filter(id => id === product._id).length * product.price}
                      </td>
                     
                     
                    </tr>
                    
                  ))}
                </tbody>
                <td></td>
                <td>sdsdd</td>
              </Table>
            )}
          </Box>
          {cartProducts?.length > 0 && (
                 <Box>
                 <h2>Order information</h2>
                 <Input type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={ev => setName(ev.target.value)} />
                 <Input type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={ev => setEmail(ev.target.value)}/>
                 <CityHolder>
                   <Input type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          onChange={ev => setCity(ev.target.value)}/>
                   <Input type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                          onChange={ev => setPostalCode(ev.target.value)}/>
                 </CityHolder>
                 <Input type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={ev => setStreetAddress(ev.target.value)}/>
                 <Input type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                        onChange={ev => setCountry(ev.target.value)}/>
                 <ButtonStyle
                         onClick={''}>
                   Continue to payment
                 </ButtonStyle>
               </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
