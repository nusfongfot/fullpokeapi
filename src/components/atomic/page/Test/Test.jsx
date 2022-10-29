import { Row, Col} from 'antd';
import { Button } from 'antd';
import styled from 'styled-components';

import './index.css'

const StyledButton = styled(Button)`
  background-color: red;  
`

function Test() {
  return (
    <div>
      <StyledButton type='primary'>Click Me</StyledButton>
    </div>
  )
}

export default Test