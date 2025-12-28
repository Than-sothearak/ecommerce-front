import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

const Icon = styled.button`
  position: absolute;
  right: 0px;
  top: 10px;
  left: 10px;
 
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
