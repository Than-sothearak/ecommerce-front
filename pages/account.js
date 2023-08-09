import Center from '@/components/Center'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { styled } from 'styled-components'

const PageWrapper = styled.div`
width: 100%;
height: 300px;
`
const Account = () => {
  return (
    <>
    <Header />
    <Center>
     <PageWrapper>
      <h1>Profile page</h1>
     </PageWrapper>
    </Center>
    <Footer />
    </>
  )
}

export default Account;