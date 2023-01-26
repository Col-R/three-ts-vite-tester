import React from 'react'
import styled from 'styled-components'

const Text = () => {
  return (
    <Wrapper>
        <Heading>Three.js</Heading>
        <Subheading>this time with extra fiber</Subheading>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    postion: relative;
    max-width: 380px;
    padding: 3rem;
`

const Heading = styled.h1`
    color: white;
    font-size: 3rem;
    font-weight: 700;
`
const Subheading = styled.h2`
    color: white;
    font-size: 2rem;
    max-width: 240px;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 130%;
    margin: auto;

`



export default Text