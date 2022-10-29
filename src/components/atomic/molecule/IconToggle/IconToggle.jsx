import styled from "styled-components"
import { Icon } from "@atomic"

import { useState } from "react"

const StyleIcon = styled(Icon)`
  margin: ${({ margin }) => margin};

  svg{
    fill: ${({ active }) => (active ? "#da7589" : "currentColor")};
  }
`

function IconToggle({ name, margin, isColorChange = true, onClick, ...props }) {
  const [active, setActive] = useState(false)

  const handleOnClick = () => {
    isColorChange && setActive(!active)
    //ถ้ามี call back เข้ามา จะทำงานทันที
    onClick?.()
  }
  return (
    <StyleIcon
      name={name}
      margin={margin}
      active={active}
      onClick={handleOnClick}
      {...props}
    ></StyleIcon>
  )
}

export default IconToggle
