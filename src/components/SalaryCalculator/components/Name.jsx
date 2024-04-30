/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";

const Name = (props) => {

  return (
    <>
      <Form.Label>Családtag neve</Form.Label>
      <Form.Control
        type={"text"}
        value={props.name}
        onChange={e => props.handleName(e.target.value)}
      />
      <Form.Text className={"text-muted"}>Add meg a családtag nevét!</Form.Text>
    </>
  )

}

export default Name
