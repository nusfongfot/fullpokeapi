import { Dropdown as DropdownAnt, Space } from "antd"
import { Button } from "@atomic"
import styled from "styled-components"
import { DownOutlined } from "@ant-design/icons"

const StyleSpace = styled(Space)`
  display: flex;
  justify-content: space-between;
`

const Dropdown = ({ title = "select", menu }) => {
  return (
    <DropdownAnt overlay={menu}>
      <Button width="100%">
        <StyleSpace>
          {title}
          <DownOutlined />
        </StyleSpace>
      </Button>
    </DropdownAnt>
  )
}

export default Dropdown
