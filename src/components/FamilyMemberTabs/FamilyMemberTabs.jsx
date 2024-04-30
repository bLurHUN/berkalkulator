import Button from "react-bootstrap/Button";

const FamilyMemberTabs = (props) => {
  return(
    <>
      {/* eslint-disable-next-line react/prop-types */}
      <Button variant={"outline-success"} onClick={props.onClick}>{props.name}</Button>
    </>
  )
};

export default FamilyMemberTabs;
