import Center from '@/components/Center'
import { useSession } from 'next-auth/react'
import React from 'react'
import { styled } from 'styled-components'

const PageWrapper = styled.div`
width: 100%;
height: 300px;
`
const Account = () => {
  const session = useSession();
  console.log(session)
  return (
    <>
    <Center>
     <PageWrapper>
      <h1>Profile page</h1>
     </PageWrapper>
    </Center>
    </>
  )
}

export default Account;