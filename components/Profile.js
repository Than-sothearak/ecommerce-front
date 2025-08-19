import React from "react";
import { styled } from "styled-components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"; // ✅ Next.js Image
import BasicInfo from "./BasicInfo";

const Box = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px,
    rgba(0, 0, 0, 0.08) 0px 0px 1px;
  border-radius: 10px;
  padding: 30px;
`;

const ProfileWrapper = styled.div`
  h1 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  font-size: small;
`;

const ProfileInfo = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: start;

  p {
    font-size: small;
    color: #999;
    width: 100%;
  }

  h3 {
    margin: 5px 0;
    font-size: 0.95rem;
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

const BasicInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Img = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    min-width: 120px;
    color: #666;
  }
`;

const IconWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const IconLogout = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;

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
  const profileImage = session?.user?.image || "/placeholder.png"; // ✅ fallback
  const userName = session?.user?.name || name || "Unknown User";
  const userEmail = session?.user?.email || email || "No email";

  return (
    <Box>
      <ProfileWrapper>
        <BasicInfoWrapper>
          <h1>Basic info</h1>
          <BasicInfo />
        </BasicInfoWrapper>

        <ProfileInfo>
          <Img>
            <p>Profile picture</p>
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          </Img>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Name</p>
            <Text>
              <h3>{userName}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Email</p>
            <Text>
              <h3>{userEmail}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>City</p>
            <Text>
              <h3>{city || "-"}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Postal code</p>
            <Text>
              <h3>{postalCode || "-"}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Street</p>
            <Text>
              <h3>{streetAddress || "-"}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>

        <ProfileInfo>
          <TextWrap>
            <p>Country</p>
            <Text>
              <h3>{country || "-"}</h3>
            </Text>
          </TextWrap>
        </ProfileInfo>
      </ProfileWrapper>
    </Box>
  );
};

export default Profile;
