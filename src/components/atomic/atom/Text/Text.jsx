import { Typography } from "antd"
import styled from "styled-components"
const { Text: TextAnt } = Typography

const StyleText = styled(TextAnt)`
  font-size: ${({ fontSize }) => fontSize || "1rem"};
`

const Text = ({ children, style, prop }) => {
  return (
    <StyleText style={style} {...prop}>
      {children}
    </StyleText>
  )
}

export default Text
