import styled from "styled-components"
import { Text, Input } from "@atomic"
import { useState } from "react"

const StyleDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  .search-input-wrapper{
    margin-top: 1rem;

    .ant-input{
      font-size: 1rem;
      height: 3rem;
      min-width: 20rem;
    }
  }
`

const Search = ({ label, placeholder, onChange , ...prop }) => {
  const [value, setValue] = useState("")
  const onSearchChange = (value) => {
    setValue(value)
    onChange?.(value)
  }

  return (
    <StyleDiv>
      <Text>{label}</Text>
      <div className="search-input-wrapper">
        <Input
          placeholder={placeholder}
          {...prop}
          value={value}
          onSearchChange={onSearchChange}
        />
      </div>
    </StyleDiv>
  )
}

export default Search