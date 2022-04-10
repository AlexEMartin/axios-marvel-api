import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from './responsive'
import { url } from './utils/url'

const Container = styled.div`
  width: 100%;
  margin: 0px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Personaje = styled.div`
  width: 30%;
  height: 350px;
  margin: 8px;
  border: 5px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tablet({ width: '45%' })}
  ${mobile({ width: '80%' })}
`;

const Title = styled.h1`
  width: 100%;
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  background-color: red;
  color: white;
  font-family: 'Urbanist', sans-serif;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  margin-top: 3rem;
  object-fit: cover;
  ${tablet({ width: 'auto', height: '80%' })}
  ${mobile({ width: 'auto', height: '60%' })}
  
`;

const Desc = styled.h3`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: 'Urbanist', sans-serif;
  ${tablet({ fontSize: '14px'})}
  ${mobile({ fontSize: '12px'})}
`;

function App() {

  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    axios.get(url)
    .then(response => {
        setPersonajes(response.data.data.results)

      }).catch(error => console.log(error))

  }, [])

  return (
    <Container>
      <Title>Marvel.</Title>
          {
            personajes.filter(p => !p.thumbnail.path.endsWith('image_not_available'))
            .map(p => (
              <Personaje key={p.id}>
              <Image src={`${p.thumbnail.path}.${p.thumbnail.extension}`} alt='personaje' />
              <Desc>{p.name}</Desc>
              </Personaje>
            ))
          }
    </Container>
    
  );
}

export default App;


