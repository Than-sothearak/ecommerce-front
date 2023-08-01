import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { BsCartDash } from "react-icons/bs";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

const ListItems = styled.li`
 font-size: 14px;
 margin: 5px;
`
const Container = styled.div`
`
const ProductDetial = styled.div`
padding: 20px;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;`
export default function SingleProductPage({ product, }) {
  const { addProduct } = useContext(CartContext);
  const productProperty = Object.entries(product.properties);
  const listItems = productProperty.map((data, index) => (
    <ListItems key={index}>
      {data[0]}: <strong>{data[1]}</strong>
    </ListItems>
  ));
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <Container>
          <Title>{product.title}</Title>
          <ProductDetial>
            
            <p>{product.description}</p>
            <h4>Product detail:</h4>
            {listItems}
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
             
                </Button>
              </div>
            </PriceRow>
          </ProductDetial>
          </Container>
      
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      
    },
  };
}