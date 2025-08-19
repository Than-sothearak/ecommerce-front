import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { styled } from "styled-components";
import Center from "./Center";
import { primary } from "@/lib/colors";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsTiktok,
} from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const FooterWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 30px;
  margin-top: 80px;
  font-size: 0.9rem;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: space-between;
  margin: 30px 0 100px 0;
  color: #4a4a4a;

  h1 {
    margin-top: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  ul {
    padding-top: 20px;
    cursor: pointer;
  }

  li {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-top: 8px;
    transition: color 0.3s ease;

    &:hover {
      color: ${primary};
    }
  }
`;

const LogoWrapper = styled.div`
  text-align: center;

  p {
    color: #000;
    margin-top: 20px;
  }
`;

const InfoWrapper = styled.div`
  color: #4a4a4a;
`;

const SocialWrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 20px;
  font-size: 24px;
  cursor: pointer;
`;

const SocialLink = styled(Link)`
  color: #4a4a4a;
  transition: color 0.3s ease;

  &:hover {
    color: ${primary};
  }
`;

const FooterBottom = styled.div`
  background-color: black;
  color: white;

  p {
    padding: 10px;
    font-size: 0.85rem;
    text-align: center;
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
            {/* Logo */}
            <LogoWrapper>
              <Image
                src={imgUrl}
                alt="E-commerce logo"
                width={200}
                height={180}
              />
              <p>WE PROVIDE WHAT WE LOVE</p>
            </LogoWrapper>

            {/* Info */}
            <InfoWrapper>
              <h1>Information</h1>
              <ul>
                <li>
                  <BiSolidRightArrow size={14} /> About us
                </li>
                <li>
                  <BiSolidRightArrow size={14} /> Delivery Info
                </li>
                <li>
                  <BiSolidRightArrow size={14} /> Installment (សេវាកម្មបង់រំលោះ)
                </li>
                <li>
                  <BiSolidRightArrow size={14} /> Brands
                </li>
                <li>
                  <BiSolidRightArrow size={14} /> Site Map
                </li>
              </ul>
            </InfoWrapper>

            {/* Contact */}
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

            {/* Social */}
            <SocialWrapper>
              <SocialLink href="https://www.facebook.com/">
                <BsFacebook />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/">
                <BsInstagram />
              </SocialLink>
              <SocialLink href="https://twitter.com/home">
                <BsTwitter />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/">
                <BsTiktok />
              </SocialLink>
            </SocialWrapper>
          </FooterContainer>
        </Center>
      </FooterWrapper>

      {/* Bottom */}
      <FooterBottom>
        <Center>
          <p>© 2023, e-commerce-front. All Rights Reserved.</p>
        </Center>
      </FooterBottom>
    </>
  );
};

export default Footer;
