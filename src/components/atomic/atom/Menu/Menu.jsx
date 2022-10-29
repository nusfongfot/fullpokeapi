import styled from "styled-components"
import { Menu as MenuAnt } from "antd"

const StyleMenu = styled(MenuAnt)`
  max-height: 200px;
  overflow: scroll;

  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    font-size: 1rem;
  }
`

const Menu = ({ items = [], onItemSelect, style, ...prop }) => {
  const handleOnItemSelect = ({ key }) => {
    const selectedItem = items.find((i) => i.key === key)
    onItemSelect({ value: selectedItem?.value, key: key, item: selectedItem })
  }

  return (
    <StyleMenu
      items={items}
      style={style}
      onClick={handleOnItemSelect}
      {...prop}
    />
  )
}

export default Menu
