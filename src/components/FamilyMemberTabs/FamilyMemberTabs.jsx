import Button from "react-bootstrap/Button";

const FamilyMemberTabs = (props) => {
  return(
    <>
      {/* eslint-disable-next-line react/prop-types */}
      <Button className={"me-1 my-2"} variant={"outline-success"} onClick={props.onClick}>{props.name}</Button>
    </>
  )
};

export default FamilyMemberTabs;
