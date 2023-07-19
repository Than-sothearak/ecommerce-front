import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import Center from "./Center";

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  
`;

const NewProduct = ({ newProduct }) => {
  return (
    <Center>
            <ProductGrid>
        {newProduct.length > 0 &&
          newProduct.map((product) => (
            <ProductBox {...product} key={product._id} />
          ))}
      </ProductGrid>
    </Center>
  );
};

export default NewProduct;
