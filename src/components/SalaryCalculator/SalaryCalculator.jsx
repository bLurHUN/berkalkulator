import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";
import {useState} from "react";
import Family from "./components/Family.jsx";

const SalaryCalculator = () => {
  const [name, setName] = useState("Bendi")
  const [gross, setGross] = useState(500000)
  const [net, setNet] = useState(332500)
  const [szja, setSzja] = useState(false)
  const [married, setMarried] = useState(false)

  function handleInput(value) {
    setGross(value)

    let m = 0
    if (married) {
      m = 5000
    }

    if (szja) {
      if (value > 499952) {
        let calc = value - 499952
        calc -= calc * 0.15
        setNet(499952 + calc + m)
      } else {
        setNet(value + m)
      }
    } else {
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
          return 499952 + calc + m
        } else {
          return gross + m
        }
      } else {
        return (gross * 0.665) + m
      }
    })
  }

  function handleMarried(checked) {
    setMarried(checked)
    setNet(n => {
      if (checked) {
        return n + 5000
      } else if (married) {
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
                onChange={e => setName(e.target.value)}
              />
              <Form.Text className={"text-muted"}>Add meg a családtag nevét!</Form.Text>
            </Form.Group>
            <Form.Group className={"sm-2"} controlId={"calculatorForm.Salary"}>
              <Form.Label>Bruttó bér</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder={gross + " Ft"}
                  value={gross}
                  onChange={e => handleInput(e.target.value)}
                  type={"number"}
                />
                <InputGroup.Text>Ft</InputGroup.Text>
              </InputGroup>
              <Form.Text className={"text-muted"}>Add meg a bruttó béredet!</Form.Text>
              <Form.Range
                value={gross / 10000}
                onChange={e => handleInput(e.target.value * 10000)}
              />
              <div className={"d-flex justify-content-center"}>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleInput(Number(gross) - 10000)}>-1%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleInput(Number(gross) - 50000)}>-5%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleInput(Number(gross) + 10000)}>+1%</Button>
                <Button className={"mx-2 col-1"}
                        onClick={() => handleInput(Number(gross) + 50000)}>+5%</Button>
              </div>
            </Form.Group>
            <h3>Kedvezmények</h3>
            <Form.Group className={"sm-2"} controlId={"calculatorForm.Discounts"}>
              <Form.Check
                type={"switch"}
                id={"szja"}
                label={"25 év alattiak SZJA mentessége"}
                onChange={e => handleSZJA(e.target.checked)}
              />
              <Form.Check
                type={"switch"}
                id={"married"}
                label={"Friss házasok kedvezménye"}
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
          <Button variant={"danger"}><Trash/></Button>
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
