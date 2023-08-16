import React from 'react'
import { SyncLoader } from 'react-spinners'
import { styled } from 'styled-components'
const StyledTaps = styled.div`
 display: flex;
 gap: 20px;
 margin-bottom: 20px;
`
const StyledTap = styled.span`
 font-size: 1.5rem;
 cursor: pointer;
 ${props => props.active ? `color: black; border-bottom: 2px solid black` : `color: #999`}

`
const Taps = ({taps,active,onChange}) => {
  return (
   <>
    <StyledTaps>
      
      {taps.map(tapName => (
         <StyledTap 
       
         key={tapName}
         active={tapName === active}
         onClick={() => {onChange(tapName)}}
         >
           {tapName}
         </StyledTap>
      ))}
      
     </StyledTaps>
     <div className='flex justify-center'>
     <SyncLoader />
     </div>
  
   </>
    )
}

export default Taps