import Center from "@/components/Center";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import { styled } from "styled-components";
import { primary } from "@/lib/colors";
import Link from "next/link";
import Table from "@/components/Table";
import Input from "@/components/Input";
import axios from "axios";

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
const Account = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const { data: session } = useSession();

  async function saveProfileData() {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    if (name == '' || email== '') {
      alert('Plaese input values')
    } else {
      await axios.post("/api/information", data);

    }
  }

  if (session) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Whislist</h2>

              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product</td>
                  </tr>
                </tbody>
              </Table>
            </Box>

            <Box>
              <h2>Profile information</h2>
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
              <ButtonStyle onClick={saveProfileData}>Save</ButtonStyle>
            </Box>
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
