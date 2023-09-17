const { default: styled } = require("styled-components");

const StyledArea = styled.textarea`
width: 100%;
padding: 5px;
margin-bottom: 5px;
border: 1px solid #ccc;
box-sizing: border-box;
`

export default function Textarea(props) {
    return <StyledArea {...props}/>
}