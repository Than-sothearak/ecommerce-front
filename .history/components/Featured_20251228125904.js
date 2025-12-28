import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { ShoppingCart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CartContext } from "./CartContext";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";
import { primary } from "@/lib/colors";
import Button from "./Button";

const Featured = ({ products, autoPlayInterval = 5000 }) => {
  const items = [
    products[products.length - 1],
    ...products,
    products[0],
  ];

  const { addProduct } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const { data: session } = useSession();

  const getActiveDot = () => {
    if (currentIndex === 0) return products.length - 1;
    if (currentIndex === items.length - 1) return 0;
    return currentIndex - 1;
  };

  const handleClick = (id, title) => {
    if (!session) {
      signIn();
      return;
    }
    addProduct(id, title);
  };

  useEffect(() => {
    if (currentIndex === items.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length - 2);
      }, 500);
    }
  }, [currentIndex, items.length]);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const jumpToDot = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => next(), autoPlayInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, isPaused, autoPlayInterval]);

  return (
    <Container
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <NavBtnLeft onClick={prev}>
        <ChevronLeft />
      </NavBtnLeft>
      <NavBtnRight onClick={next}>
        <ChevronRight />
      </NavBtnRight>

      <Track style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: isTransitioning ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none" }}>
        {items.map((product, index) => (
          <Slide key={`${product.id}-${index}`}>
            <ImageSection>
              <StyledImage
                width={500}
                height={500}
                src={product.images[0]}
                alt={product.title}
              />
            </ImageSection>
            <ContentSection>
              <Category>GAMING PERFORMANCE</Category>
              <Title>{product.title}</Title>
              <Price>${product.price}</Price>
              <ButtonsWrapper>
                <Button onClick={() => handleClick(product._id, product.title)}>
                  Add to cart
                </Button>
                <DetailsLink href={`/store/${product._id}`}>
                  <Eye size={18} /> Details
                </DetailsLink>
              </ButtonsWrapper>
            </ContentSection>
          </Slide>
        ))}
      </Track>

      <Pagination>
        {products.map((_, i) => {
          const isActive = i === getActiveDot();
          return <Dot key={i} active={isActive} onClick={() => jumpToDot(i)} />;
        })}
      </Pagination>
    </Container>
  );
};

export default Featured;

// --- Styled Components ---
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #1e272e;
  overflow: hidden;
  border: 1px solid rgba(59, 130, 246, 0.2);
  font-family: sans-serif;

   /* 👇 Mobile: keep landscape, scale down */
  @media (max-width: 768px) {
    transform: scale(0.96);
    border-radius: 10px ;
  }

`;

const Track = styled.div`
  display: flex;
`;

const Slide = styled.div`
  min-width: 100%;
  display: flex;
  align-items: center;
  padding: 60px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageSection = styled.div`
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-width: 380px;
  border-radius: 12px;
  z-index: 2;
`;

const ContentSection = styled.div`
  flex: 1 1 400px;
  color: white;
  padding-left: 40px;

  @media (max-width: 768px) {
    padding-left: 0;
   
  }
`;

const Category = styled.span`
  color: #60a5fa;
  font-size: clamp(0.6rem, 2vw, 3rem);
  font-weight: bold;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  font-size: clamp(1rem, 2vw, 3rem);
  margin-bottom: 12px;
  font-weight: 800;
`;
const Price = styled.div`
  font-size: clamp(1rem, 2vw, 3rem);
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 10px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const DetailsLink = styled(Link)`
  border: 1px solid #3b82f6;
  padding: 12px 22px;
  font-size: 13px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 12px;
  }
`;

const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: white;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;
  backdrop-filter: blur(5px);
`;

const NavBtnLeft = styled(NavBtn)`
  left: 20px;
`;

const NavBtnRight = styled(NavBtn)`
  right: 20px;
`;

const Pagination = styled.div`
  position: absolute;
  bottom: 25px;
 left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 5;

     @media (max-width: 768px) {
    
     left: 20%;
  }
`;

const Dot = styled.div`
  height: 8px;
  width: ${(props) => (props.active ? "30px" : "8px")};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.active ? "#3b82f6" : "#475569")};

 
`;
