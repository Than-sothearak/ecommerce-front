import Center from "@/components/Center";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Table from "@/components/Table";
import axios from "axios";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import { authOptions } from "./api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import WishlistGrid from "@/components/WishlistGrid";
import Taps from "@/components/Taps";
import SingleOrder from "@/components/SingleOrder";
import Profile from "@/components/Profile";

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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 30px;
`;

const SiginWrapper = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignInButton = styled.div`
  background-color: ${primary};
  padding: 20px;
  height: 30px;
  width: 240px;
  display: flex;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  color: white;
`;
const Account = ({ wishedProduct }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState([]);
  const [activeTap, setActiveTap] = useState("Orders");
  const [profileInfo, setProfileInfo] = useState([])
  const { data: session } = useSession();
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session) {
      axios.get("/api/information").then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setCity(result.data.city);
        setPostalCode(result.data.postalCode);
        setStreetAddress(result.data.streetAddress);
        setCountry(result.data.country);
        setProfileInfo(result.data)
      });
    } else {
      return;
    }
    set
    axios.get("/api/wishlist").then((res) => {
      setProducts(res.data);
    });
    
    axios.get("/api/orders").then((result) => {
      setOrder(result.data);
    });
  }, [session]);


  if (session) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <Taps
                isLoading={isLoading}
                taps={["Orders", "Wishlist"]}
                onChange={setActiveTap}
                active={activeTap}
              />
              <Table>
                {activeTap === "Wishlist" && (
                  <>
                    <thead>
                      <tr>
                        <th>Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {products.length > 0 ? (
                          <WishlistGrid
                            products={products.map((p) => p.product)}
                            wishedProduct={wishedProduct}
                          />
                        ) : (
                          <td>Your wihslist is empty</td>
                        )}
                      </tr>
                    </tbody>
                  </>
                )}
                {activeTap === "Orders" && (
                  <>
                    <SingleOrder orders={orders} />
                  </>
                )}
              </Table>
            </Box>
            <Profile
              profileInfo={profileInfo}
              name={name}
              email={email}
              city={city}
              postalCode={postalCode}
              streetAddress={streetAddress}
              country={country}
            />
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center>
        <SiginWrapper>
          <SignInButton>
            <button onClick={() => signIn()}>Sign in</button>
          </SignInButton>
        </SiginWrapper>
      </Center>
    </>
  );
};

export default Account;

export async function getServerSideProps(context) {
  await mongooseConnect();
  const products = await Product.find();

  const session = await getServerSession(context.req, context.res, authOptions);
  const wishedProduct = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: products.map((p) => p._id.toString()),
      })
    : [];
  const wishedProductId = wishedProduct.map((i) => i.product.toString());
  const productsWished = await Product.find({ _id: wishedProductId });

  return {
    props: {
      wishedProduct: wishedProduct.map((i) => i.product.toString()),
      products: JSON.parse(JSON.stringify(productsWished)),
    },
  };
}
