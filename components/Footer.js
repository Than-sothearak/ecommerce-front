import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { styled } from "styled-components";
import Center from "./Center";
import { primary } from "@/lib/colors";
import { BsFacebook, BsInstagram, BsTwitter, BsTiktok } from "react-icons/bs";
import Link from "next/link";

const FooterWrapper = styled.div`
  background-color: #222;
  padding: 30px;
  margin-top: 80px;
  font-size: 0.9rem;
`;
const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: space-between;
  color: white;
  margin-bottom: 100px;
  margin-top: 30px;
  h1 {
  
    margin-top: 10px;
  }
  ul {
    padding-top: 20px;
    color: #747d8c;
    cursor: pointer;
  }
  li {
    &:hover {
      color: ${primary};
    }
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-top: 8px;
  }
`;
const LogoWrapper = styled.div`
  img {
    width: 100%;
    height: 180px;
  }
  p {
    text-align: center;
    margin-top: 20px;
  }
`;
const InfoWrapper = styled.div``;

const SocialWrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 20px;
  font-size: 24px;
  cursor: pointer;
`;

const SocialLink = styled(Link)`
  &:hover {
    color: ${primary};
  }
`;
const FooterButtom = styled.div`
  background-color: black;
  color: white;
  p {
    padding: 10px;
  }
`;
const Footer = () => {
  const imgUrl =
    "https://seeklogo.com/images/E/e-commerce-concept-logo-5146F23CC5-seeklogo.com.png";
  return (
    <>
      <FooterWrapper>
        <Center>
          <FooterContainer>
            <LogoWrapper>
              <img src={imgUrl} />
              <p className="text-sm">WE PROVIDE WHAT WE LOVE</p>
            </LogoWrapper>
            <InfoWrapper>
              <h1>Information:</h1>
              <ul>
                <li>
                  <BiSolidRightArrow size={14} />
                  About us
                </li>
                <li>
                  <BiSolidRightArrow size={14} />
                  Delivery Info
                </li>
                <li>
                  <BiSolidRightArrow size={14} />
                  Installment (សេវាកម្មបង់រំលោះ)
                </li>
                <li>
                  <BiSolidRightArrow size={14} />
                  Brands
                </li>
                <li>
                  <BiSolidRightArrow size={14} />
                  Site Map
                </li>
              </ul>
            </InfoWrapper>
            <InfoWrapper>
              <h1>Contact</h1>
              <ul>
                <li>
                  <BiSolidRightArrow size={14} />
                  <div>
                    <p>For product inquiry:</p>

                    <p>sale@ecommerce-front.com</p>
                  </div>
                </li>

                <li>
                  <BiSolidRightArrow size={14} />
                  <div>
                    <p>For marketing & corporate opportunity:</p>
                    <p>ecommerce-front@gmail.com</p>
                  </div>
                </li>
              </ul>
            </InfoWrapper>
            <SocialWrapper>
              <SocialLink href={"https://www.facebook.com/"}>
                <BsFacebook />
              </SocialLink>
              <SocialLink href={"https://www.instagram.com/"}>
                <BsInstagram />
              </SocialLink>
              <SocialLink href={"https://twitter.com/home"}>
                <BsTwitter />
              </SocialLink>
              <SocialLink href={"https://www.tiktok.com/"}>
                <BsTiktok />
              </SocialLink>
            </SocialWrapper>
          </FooterContainer>
        </Center>
      </FooterWrapper>
      <FooterButtom>
        <Center>
          <p className="text-sm">© 2023, e-commerce-front. All Rights Reserved.</p>
        </Center>
      </FooterButtom>
    </>
  );
};

export default Footer;
