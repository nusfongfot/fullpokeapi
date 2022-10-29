import { Text, DropdownMenu } from "@atomic"
import { useState, useEffect } from "react"
import styled from "styled-components"

const StyleDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  .dropdown-wrapper {
    margin-top: 1rem;

    .ant-btn {
      font-size: 1rem;
      min-width: 20rem;
      height: 3rem;
    }
  }
`

const FilterDropdown = ({ label = "label", items = [], onChange }) => {
  const [select, setSelect] = useState(items[0])

  const onItemSelect = ({ item }) => {
    setSelect(item)
    onChange?.(item) //ถ้ามี onChange ถึงจะทำ 
  }

  useEffect(() => {
    if (!items) return
    const defaultItem = items[0]
    onItemSelect({ item: defaultItem })
  }, [items])

  return (

    <StyleDiv>
      <Text>{label}</Text>
      <div className="dropdown-wrapper">
        <DropdownMenu
          value={select}
          items={items}
          onItemSelect={onItemSelect}
        />
      </div>
    </StyleDiv>
  )
}

export default FilterDropdown
