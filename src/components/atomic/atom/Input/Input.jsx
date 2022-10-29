import { Input as InputAnt } from "antd"

const Input = ({
  value,
  onSearchChange,
  placeholder = "typing...",
  ...prop
}) => {
  const handleOnInputChange = (e) => {
    const value = e?.target?.value
    onSearchChange(value)
  }
  return (
    <InputAnt
      value={value}
      placeholder={placeholder}
      {...prop}
      onChange={handleOnInputChange}
    />
  )
}

export default Input
