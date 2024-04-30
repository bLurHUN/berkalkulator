import './style.css'
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {ButtonGroup} from "react-bootstrap";

const Family = () => {
  const [dep, setDep] = useState(3)
  const [dis, setDis] = useState(1)

  function handleClick(e, b, v) {
    e.preventDefault()

    if (b) {
      if (dep + v <= 3 && dep + v >= 1) {
        setDep(p => {
          return p + v
        })

        if (dep + v < dis) {
          setDis(p => {
            return p - 1
          })
        }
      }

    } else {
      if (dis + v <= dep && dis + v >= 1) {
        setDis(p => {
          return p + v
        })
      }
    }
  }

  return (
    <>
      <ButtonGroup size={"sm"}>
        <Button onClick={e => handleClick(e, true, -1)}>-</Button>
        <Button disabled={true}>{dep}</Button>
        <Button onClick={e => handleClick(e, true, 1)}>+</Button>
      </ButtonGroup>
        eltartott, ebből kedvezményezett:
      <ButtonGroup size={"sm"}>
        <Button onClick={e => handleClick(e, false, -1)}>-</Button>
        <Button disabled={true}>{dis}</Button>
        <Button onClick={e => handleClick(e, false, 1)}>+</Button>
      </ButtonGroup>
    </>
  )
}

export default Family