import React, { useEffect, useState } from "react";
import Input from "@/components/Input";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import axios from "axios";
import Center from "@/components/Center";
import toast from "react-hot-toast";
import Title from "@/components/Title";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 80px;
  font-size: small;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 30px;
  label {
    color: gray;
    font-size: small
  }
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
const BackButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  h1 {
    font-size: 1.5rem;
  }
`;
const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const { data: session } = useSession();

  const { push } = useRouter();
  useEffect(() => {
    if (session) {
      axios.get("/api/information").then((result) => {
        setName(result.data.name);
        setEmail(result.data.email);
        setCity(result.data.city);
        setPostalCode(result.data.postalCode);
        setStreetAddress(result.data.streetAddress);
        setCountry(result.data.country);
      });
    } else {
      return;
    }
  }, [session]);

  async function saveProfileData() {
    const data = {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
    };
    if (name == "" || email == "") {
      alert("Plaese input values");
    } else {
      await axios.post("/api/information", data);
      push("/account");
      toast.success(`Updated`);
    }
  }
  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          <BackButton>
            <BiArrowBack size={24}/>
            <Link href={"/account"}>
              <h1>Back</h1>
            </Link>
          </BackButton>
          <Title>Edit profile information</Title>
          <label>Name</label>
          <Input
            required
            type="text"
            placeholder="Name"
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Email</label>
          <Input
            required
            type="te xt"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label>City</label>
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
          <label>Street address</label>
          <Input
            required
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            name="streetAddress"
            onChange={(ev) => setStreetAddress(ev.target.value)}
          />
          <label>Country</label>
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
  );
};

export default ProfileEdit;
