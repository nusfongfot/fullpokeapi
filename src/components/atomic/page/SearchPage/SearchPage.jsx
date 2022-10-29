import { Logo, FilterDropdown, Search, PokemonCard } from "@atomic"
import { Row, Col, Spin } from "antd"
import styled from "styled-components"
import pokedexLogo from "@/assets/images/pokedex.png"
import { regions, types, sortby, filterBySearch, filterByType, sortingBy } from "./helper"
import { useState, useEffect } from "react"
import { pokemonApiV2, pokemonInfo } from "@utils"
import { filter } from "lodash"

const Container = styled.div`
  text-align: center;
`

const StyleRow = styled(Row)`
  max-width: 1000px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
`
const regionDropdown = regions.map((item) => {
  return {
    ...item,
    key: item?.name,
    value: item?.name,
    label: `${item?.name} (${item?.offset} - ${item?.limit + item?.offset})`,
  }
})

const typeDropdownItems = types.map((t) => ({
  key: t,
  value: t,
  label: t,
}))

const sortbyDropdownItems = sortby.map((s) => ({
  key: s,
  value: s,
  label: s,
}))

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: space-around;
`

const getQueryString = (region) => {
  if (!region) return null

  let query = new URLSearchParams()
  query.append("limit", region?.limit)
  query.append("offset", region?.offset)

  return query.toString()
}

//function getpokemonLists includes search type sort
const getPokemonLists = (pokemons = [], filters = {}) => {
  const { search, type, sortBy } = filters

  //เรื่องของ lodash
  const pokemonLists = filter(pokemons, (pokemon) => {
    // false ? 'remove' : 'save'
    let remove = false

    if (search && !filterBySearch(pokemon, search)) {
      remove = true
    }
    if(type && type?.value !== 'all types' && !filterByType(pokemon, type?.value)){
      remove = true
    }
    //ทำแบบนี้ จะได้ค่า lists ทั้งหมด ตามบรรทัด 67
    return !remove
  })

  const sortedPokemonLists = pokemonLists.sort(sortingBy(sortBy?.value))

  const result = pokemonLists.map((pokemon) => {
    return {
      ...pokemon,
      image: pokemon?.sprites?.other?.dream_world?.front_default,
    }
  })
  return result
}

const intial = {
  data: [],
  loading: false,
  error: null,
}

function SearchPage() {
  const [filters, setFilters] = useState({})
  const [state, setState] = useState(intial)

  //เวลาเลือก ฟิลเตอร์ ที่เปลี่ยนไป
  const onFilterChange = (key, value) => {
    setFilters((prevFilter) => {
      return {
        ...prevFilter,
        [key]: value,     
      }
    })
  }

  const queryString = getQueryString(filters?.region)

  const pokemonLists = getPokemonLists(state?.data, filters)

  const fetchPokemonList = async () => {
    if (!queryString) return

    let pokemonList = []
    let fetchErr = null

    setState((prev) => ({
      ...prev,
      loading: true,
    }))

    try {
      const res = await pokemonApiV2.get(`pokemon?${queryString}`)
      const pokemonResults = res?.data?.results || []

      for (let pokemon of pokemonResults) {
        const res = await pokemonApiV2.get(`pokemon/${pokemon?.name}`)
        const monster = await res?.data
        await pokemonList.push(monster)
      }
    } catch (error) {
      fetchErr = error
    }
    setState((prev) => ({
      ...prev,
      loading: false,
      data: pokemonList,
      error: fetchErr,
    }))
  }

  useEffect(() => {
    queryString && fetchPokemonList()
  }, [queryString])

  return (
    <Container>
      <Logo src={pokedexLogo} width={200} />
      <StyleRow>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="REGION"
            items={regionDropdown}
            onChange={(item) => onFilterChange("region", item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="TYPE"
            items={typeDropdownItems}
            onChange={(item) => onFilterChange("type", item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="SORT BY"
            items={sortbyDropdownItems}
            onChange={(item) => onFilterChange("sortBy", item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Search
            label={"Search"}
            placeholder="TYPING..."
            onChange={(value) => onFilterChange("search", value)}
          />
        </Col>
      </StyleRow>
      <PokemonContainer>
        {state.loading ? (
          <Spin />
        ) : (
          [...pokemonLists].map((pokemon) => (
            <PokemonCard key={pokemon?.id} pokemon={pokemon} />
          ))
        )}
      </PokemonContainer>
    </Container>
  )
}

export default SearchPage
