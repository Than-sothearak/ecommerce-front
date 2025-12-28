import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Icon = styled.button`
margin-right: 10px;
margin-top: 10px;
  width: 28px;
  bottom: 0px;
 
 
`;
export default function WishlistIcon({addWishlist, wished}) {
  return (
    <>
      <Icon wished={wished} onClick={addWishlist} title="add to wishlist">
        {wished ? (
          <AiFillHeart size={22} color="red" />
        ) : (
          <AiOutlineHeart size={22} color="gray" />
        )}
      </Icon>
    </>
  );
}
