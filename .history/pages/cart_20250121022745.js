import Center from "@/components/Center";
import { styled } from "styled-components";
import Input from "@/components/Input";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import { MdDone } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Link from "next/link";
import { primary } from "@/lib/colors";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import { useSession } from "next-auth/react";
import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/Setting";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  width: 400px;
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
  padding: 0 2px;
  text-align: center;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 5px;
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

const TextOrderH1 = styled.h1`
  color: green;
  text-align: center;
`;

const TextOrderP = styled.p`
  text-align: center;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  align-items: center;
  font-size: 72px;
  color: white;
  display: flex;
  justify-content: center;
  background-color: green;
  border-radius: 100%;
`;
const CartEmptyConatainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
const ButtonDiv = styled.div`
  margin: 20px;
`;
const Button = styled(Link)`
  background-color: ${primary};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
`;

const CartPage = (shippingFee) => {
  const { cartProducts, addProduct, removeProduct, clearCart,  } =
    useContext(CartContext);
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const {data: session} = useSession();
  
  useEffect(() => {
    if (cartProducts?.length > 0) {
          /// Sync with server if user is logged in
  async function syncCart() {
    if (session) {
      try {
        const { data } = await axios.get("/api/cart");
        setProducts(data.map(p => p.product))
      } catch (error) {
        console.error("Error syncing cart with server:", error);
      }
    }
  }
  syncCart();
    } else {
    return
    }
  }, [cartProducts, session]);

  console.log(products)

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function increaseProduct(id) {
    addProduct(id);
  }

  function decreaseProduct(id) {
    removeProduct(id);
  }


    async function goToPayment() {
      if (session) {
        if (name == "" || email == "" || city == "" || country == "") {
          alert("Please fill in the field");
        } else {
          const response = await axios.post("/api/checkout", {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts,
          });
          if (response.data.url) {
            window.location = response.data.url;
          }
        }
      } else {
        alert('You must sign in first!')
      }
    
    }
  

  let subtotal = 0;

  // for (const productId of cartProducts) {
  //   const price = products.find((p) => p._id == productId)?.price || 0;
  //   subtotal += price;
  // }
  
  const total = subtotal + parseInt(shippingFee.shippingFee.value || 0);
 
  if (isSuccess) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <Icon>
                <MdDone />
              </Icon>
              <TextOrderH1>ORDERED SUCCUSSFULLY</TextOrderH1>
              <TextOrderP>
                We will email you when your order will be sent.
              </TextOrderP>
            </Box>
          </ColumnsWrapper>
        </Center>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Center>
        <ColumnsWrapper>
          <Box>
           <Title>Cart</Title>
            {!cartProducts?.length > 0 && (
              <CartEmptyConatainer>
                <div>
                  <h1> Your cart is empty</h1>
                  <MdOutlineShoppingCartCheckout size={200} />

                  <ButtonDiv>
                    <Button href={"/products"}>Continue shopping</Button>
                  </ButtonDiv>
                </div>
              </CartEmptyConatainer>
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
                          <img src={product?.images[0]} alt={product.title} />
                        </ProductImageBox>
                        <td>{product.title}:</td>
                      </ProductInfoCell>
                      <td>
                        <ButtonStylePlus
                          onClick={() => decreaseProduct(product._id)}
                        >
                          -
                        </ButtonStylePlus>
                        <QuantityLabel>
                          {
                           
                            
                          }
                        </QuantityLabel>
                        <ButtonStylePlus
                          onClick={() => increaseProduct(product._id)}
                        >
                          +
                        </ButtonStylePlus>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    
                    <td>Subtotal</td>
                    <td></td>
                    <td>
                      <h2>${subtotal}</h2>
                    </td>
                    
                  </tr>
                  <tr>
                 
                  <td>Shipping fee</td>
                  <td></td>
                  <td>
                   ${shippingFee.shippingFee.value}
                  </td>
                  </tr>
                  <tr></tr>
              
                  <tr className="text-xl font-bold">
                    <td>Total</td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {cartProducts?.length > 0 && (
            <Box>
              <h2>Order information</h2>
              <Input
                required
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                required
                type="te xt"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityHolder>
                <Input
                  required
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  required
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </CityHolder>
              <Input
                required
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Input
                required
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <ButtonStyle onClick={goToPayment}>
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

export async function getServerSideProps() {
  await mongooseConnect();
  const shippingFee = await Setting.findOne({name: 'shippingFee'})
  return {
    props: {
      shippingFee: JSON.parse(JSON.stringify(shippingFee))
      }
  }
 
}
