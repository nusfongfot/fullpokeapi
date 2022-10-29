import { Card as CardAnt } from "antd"
import styled from "styled-components"

const StyleCard = styled(CardAnt)`
  width: ${({ width }) => width || "20rem"};
  padding: ${({ padding }) => padding || "1rem"};
  background: ${({ bgcolors }) =>
    `linear-gradient(${bgcolors[0]}, ${bgcolors[1]})`};

  .ant-card-body {
    padding: 0;
  }
  border-radius: ${({ borderradius }) => borderradius || "0.1rem"};
  max-width: ${({ maxWidth }) => maxWidth || "100rem"};
`

const Card = ({ children, left, right, bgcolors = [], maxWidth, ...props }) => {
  const header = <Header left={left} right={right} />
  return (
    <StyleCard bgcolors={bgcolors} maxwidth={maxWidth} {...props}>
      {header && header}
      {children}
    </StyleCard>
  )
}

const StyleHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = ({ left, right, children }) => {
  return (
    <>
      <StyleHeaderContainer>
        {left && <div>{left}</div>}
        {right && <div>{right}</div>}
      </StyleHeaderContainer>
      {children}
    </>
  )
}

Card.Header = Header

export default Card
