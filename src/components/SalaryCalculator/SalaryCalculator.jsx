import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";
import {useState} from "react";
import Family from "./components/Family.jsx";

const SalaryCalculator = (props) => {
  const [name, setName] = useState(props.name)
  const [gross, setGross] = useState(props.gross)
  const [net, setNet] = useState(props.net)
  const [szja, setSzja] = useState(props.szja)
  const [married, setMarried] = useState(props.married)

  function handleName(value) {
    setName(value)
    props.modMember(props.id, value, gross, net, szja, married)
  }

  function handleGross(value) {
    setGross(value)

    let m = 0
    if (married) {
      m = 5000
    }

    if (szja) {
      if (value > 499952) {
        let calc = value - 499952
        calc -= calc * 0.15
        props.modMember(props.id, name, value, 499952 + calc + m, szja, married)
        setNet(499952 + calc + m)
      } else {
        props.modMember(props.id, name, value, value + m, szja, married)
        setNet(value + m)
      }
    } else {
      props.modMember(props.id, name, value, (value * 0.665) + m, szja, married)
      setNet((value * 0.665) + m)
    }

  }

  function handleSZJA(checked) {
    setSzja(checked)

    let m = 0
    if (married) {
      m = 5000
    }

    setNet(() => {
      if (checked) {
        if (gross > 499952) {
          let calc = gross - 499952
          calc -= calc * 0.15
          props.modMember(props.id, name, gross, 499952 + calc + m, checked, married)
          return 499952 + calc + m
        } else {
          props.modMember(props.id, name, gross, gross + m, checked, married)
          return gross + m
        }
      } else {
        props.modMember(props.id, name, gross, (gross * 0.665) + m, checked, married)
        return (gross * 0.665) + m
      }
    })
  }

  function handleMarried(checked) {
    setMarried(checked)

    setNet(n => {
      if (checked) {
        props.modMember(props.id, name, gross, n+5000, szja, checked)
        return n + 5000
      } else if (married) {
        props.modMember(props.id, name, gross, n-5000, szja, checked)
        return n - 5000
      }
    })
  }

  return (
    <>
      <Row>
        <Col xs={"11"}>
          <Form>
            <h1>{name} bérének számítása</h1>
            <Form.Group className={"sm-2"} controlId={"calculatorForm.Name"}>
              <Form.Label>Családtag neve</Form.Label>
              <Form.Control
                type={"text"}
                placeholder={name}
                onChange={e => handleName(e.target.value)}
              />
              <Form.Text className={"text-muted"}>Add meg a családtag nevét!</Form.Text>
            </Form.Group>
            <Form.Group className={"sm-2"} controlId={"calculatorForm.Salary"}>
              <Form.Label>Bruttó bér</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder={gross + " Ft"}
                  value={gross}
                  onChange={e => handleGross(e.target.value)}
                  type={"number"}
                />
                <InputGroup.Text>Ft</InputGroup.Text>
              </InputGroup>
              <Form.Text className={"text-muted"}>Add meg a bruttó béredet!</Form.Text>
              <Form.Range
                value={gross / 10000}
                onChange={e => handleGross(e.target.value * 10000)}
              />
              <div className={"d-flex justify-content-center"}>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleGross(Number(gross) - 10000)}>-1%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleGross(Number(gross) - 50000)}>-5%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleGross(Number(gross) + 10000)}>+1%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleGross(Number(gross) + 50000)}>+5%</Button>
              </div>
            </Form.Group>
            <h3>Kedvezmények</h3>
            <Form.Group className={"sm-2"} controlId={"calculatorForm.Discounts"}>
              <Form.Check
                type={"switch"}
                id={"szja"}
                label={"25 év alattiak SZJA mentessége"}
                checked={szja}
                onChange={e => handleSZJA(e.target.checked)}
              />
              <Form.Check
                type={"switch"}
                id={"married"}
                label={"Friss házasok kedvezménye"}
                checked={married}
                onChange={e => handleMarried(e.target.checked)}
              />
              <Form.Check type={"switch"} id={"personal"} label={"Személyi adókedvezmény"}/>
              <Form.Check type={"switch"} id={"family"} label={"Családi kedvezmény"}/>
              <Form.Text>
                <Family/>
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col className={"text-end"}>
          <Button variant={"danger"} onClick={() => props.deleteMember(props.id)}><Trash/></Button>
        </Col>
      </Row>
      <Row>
        <Col className={"text-center"}>
          <p>Számított nettó bér:</p>
          <div>
            <p>{net} Ft</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SalaryCalculator;
