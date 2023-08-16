import React, { useState } from "react";
import { styled } from "styled-components";
import { AiOutlineEdit } from "react-icons/ai";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";

const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  padding: 30px;
`;

const ProfileWrapper = styled.div`
  h1 {
    font-size: 1.5rem;
  }
  font-size: small;
`;
const ProfileInfo = styled.div`
  padding-top: 10px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  text-align: start;
  p {
    font-size: small;
    color: #999;
    width: 100%;
  }
  img {
    width: 40px;
    height: 100%;
    border-radius: 100%;
    margin-bottom: 10px;
    margin-bottom: 10px;
  }
  h3 {
    margin: 5px 4px;
  }
`;
const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.div`
  width: 100%;
  text-align: start;
`;
const IconEdit = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: gray;

  }
  &:hover {
    color: blue;
    p {
      color: blue;
    }
  }
`;
const BasicInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Img = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrap = styled.div`
  display: flex;
  gap: 10px;
`;
const IconLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  p {
    color: gray;
    
  }
  cursor: pointer;
  &:hover {
    color: blue;
    p {
      color: blue;
    }
  }
`;
const Profile = ({ name, email, city, postalCode, streetAddress, country }) => {
  const { data: session } = useSession();
  const url = "/profileEdit";
  return (
    <Box>
      <ProfileWrapper>
        <BasicInfo>
          <h1>Basic info</h1>
          <IconWrap>
            <IconEdit href={url}>
              <AiOutlineEdit size={22} title="Edit profile" />
              <p>Edit</p>
            </IconEdit>
            <IconLogout onClick={() => signOut()}>
              <BiLogOut size={22} title="Loguot" />
              <p>Logout</p>
            </IconLogout>
          </IconWrap>
        </BasicInfo>

        <ProfileInfo>
          <Img>
            <p>Profile picture</p>
            <img src={session?.user?.image} />
          </Img>
        </ProfileInfo>
        <ProfileInfo>
          <TextWrap>
            <p>Name</p>
            <Text>
              <h3>{name}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Email</p>
            <Text>
              <h3>{email}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>City</p>
            <Text>
              <h3>{city}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Postal code</p>
            <Text>
              <h3>{postalCode}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Street</p>
            <Text>
              <h3>{streetAddress}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>
        <ProfileInfo>
          <TextWrap>
            <p>Country</p>
            <Text>
              <h3>{country}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>
      </ProfileWrapper>
    </Box>
  );
};

export default Profile;
