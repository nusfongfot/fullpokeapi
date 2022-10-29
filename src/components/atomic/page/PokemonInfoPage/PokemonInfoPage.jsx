import { useSearchParams, useNavigate } from "react-router-dom"
import { Row, Col, Spin } from "antd"
import styled from "styled-components"
import { isEmpty } from 'lodash';
import { Card, PokemonInfo, PokemonData, IconToggle } from "@atomic"
import { pokemonInfo, getCardColorsByPokemonTypes, pokemonApiV2 } from "@utils"
import { useEffect, useState } from "react"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  align-items: center;
`
const intial = {
  data: {},
  loading: false,
  error: null,
}

function PokemonInfoPage() {
  //useSearchParams ใช้จัดการเกี่ยวกับการดึงข้อมูล จาก querySting url 
  let [searchParams] = useSearchParams()
  let navigate = useNavigate()
  const [state, setState] = useState(intial)

  const id = searchParams.get("id")
  const bgColors = getCardColorsByPokemonTypes(pokemonInfo?.types)

  const goBack = () => {
    navigate("/", { relative: true })
  }

  const infoBack = <IconToggle name="back" size="3rem" onClick={goBack} />

  const fetchPokemon = async (id) => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }))

    let pokemon
    let fetchError

    try {
      const pokemonResponse = await pokemonApiV2.get(`pokemon/${id}`)
      const speciesResponse = await pokemonApiV2.get(`pokemon-species/${id}`)

      pokemon = pokemonResponse?.data
      let species = speciesResponse?.data

      pokemon = {
        ...pokemon,
        image: pokemon?.sprites?.other?.dream_world?.front_default,
        about: species?.flavor_text_entries?.[0]?.flavor_text,
      }
    } catch (error) {
      fetchError = error
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      data: pokemon,
      error: fetchError,
    }))
  }

  useEffect(() => {
    id && fetchPokemon(id)
  }, [id])

  //เพราะมันไม่มี state มาตอนโหลด จึงต้อง ดักข้อมูลไว้ก่อน
  if(!state.data || isEmpty(state?.data)) return

  return (
    <Wrapper>
      <Card
        bgcolors={bgColors}
        width="80%"
        borderradius="1rem"
        maxwidth="80rem"
        left={infoBack}
      >
        {state.false ? (
          <Spin />
        ) : (
          <Row>
            <Col xs={24} sm={12} md={8}>
              <PokemonInfo pokemon={state?.data} />
            </Col>
            <Col xs={24} sm={12} md={16}>
              <PokemonData pokemon={state?.data} />
            </Col>
          </Row>
        )}
      </Card>
    </Wrapper>
  )
}

export default PokemonInfoPage
