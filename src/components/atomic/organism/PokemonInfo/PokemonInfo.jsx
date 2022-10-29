import styled from 'styled-components'
import { getWeight, getHeight } from '@utils'
import { Text } from '@atomic'

const InfoWrapper =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  border-radius: 1.2rem;
  justify-content: space-between;
`

const StyleImg = styled.div`
  padding: 2rem;
  max-width: 20rem;
`

function PokemonInfo({ pokemon }) {
  return (
    <InfoWrapper>
      <Text>#{pokemon?.id}</Text>
      <Text>Name: {pokemon?.name}</Text>
      <StyleImg>
        <img src={pokemon?.image} width='100%' alt="" />
      </StyleImg>
      <Text fontSize="0.8rem">Height: {getHeight(pokemon?.height)}</Text>
      <Text fontSize="0.8rem">Weight: {getWeight(pokemon?.weight)}</Text>
    </InfoWrapper>
  )
}

export default PokemonInfo