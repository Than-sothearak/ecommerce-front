const { default: styled } = require("styled-components");

const ReviewWrite = styled.textarea`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 7px;
  display: block;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export default function Textarea(props) {
    return <ReviewWrite {...props}/>
}