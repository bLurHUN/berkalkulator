import './style.css'
import {useState} from "react";

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
      <button onClick={e => handleClick(e, true, -1)}>-</button>
      {dep}
      <button onClick={e => handleClick(e, true, 1)}>+</button>
      eltartott, ebből kedvezményezett:
      <button onClick={e => handleClick(e, false, -1)}>-</button>
      {dis}
      <button onClick={e => handleClick(e, false, 1)}>+</button>
    </>
  )
}

export default Family