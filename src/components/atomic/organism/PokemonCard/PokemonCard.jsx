import styled from "styled-components"
import { Card, Text, IconToggle } from "@atomic"
import { getCardColorsByPokemonTypes } from "@utils"
import { useNavigate } from 'react-router-dom'

const StyleImg = styled.div`
  margin: 2rem;
`
const Container = styled.div`
  padding: 2rem;
`

function PokemonCard({ pokemon }) {
  let navigate = useNavigate()

  const pokemonId = <span>#{pokemon?.id}</span>
  const bgColors = getCardColorsByPokemonTypes(pokemon?.types)

  const handleOnIconInfoClick = () => { 
    navigate(`/pokemon?id=${pokemon?.id}`, { replace: true })
   }

  const icons = (
    <div>
      <IconToggle name="heart" margin={'0 0.3rem 0 0'} />
      <IconToggle name="info" isColorChange={false} onClick={handleOnIconInfoClick} />
    </div>
  )

  return (
    <Container>
      <Card
        left={pokemonId}
        right={icons}
        width="22rem"
        padding="1rem"
        borderradius="1rem"
        bgcolors={bgColors}
        hoverable
      >
        <StyleImg>
          <img src={pokemon?.image} width={"100%"} alt="" height='150px'/>
        </StyleImg>
        <Text fontSize="1.2rem">{pokemon?.name}</Text>
      </Card>
    </Container>
  )
}

export default PokemonCard
