import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
// import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const HouseholdSalaryCalculator = () => {
  const [members, setMembers] = useState([])
  const [active, setActive] = useState(null);

  function modMember(id, newName, newGross, newNet, newSzja, newMarried) {
    const updated = members.map(m => {
      if (id === m.id) {
        return { id: id, name: newName, gross: newGross, net: newNet, szja: newSzja, married: newMarried };
      } else {
        return m;
      }
    })

    setMembers(updated)
  }

  function deleteMember(id) {
    setMembers(
      members.filter(a => a.id !== id)
    );
  }

  function newMember(e) {
    e.preventDefault()

    setMembers(m => {
      return [
        ...m,
        { id: crypto.randomUUID(), name: "Új családtag", gross: 500000, net: 332500, szja: false, married: false },
      ]
    })
  }


  return (
    <Container fluid>
      <header>
        { members.map(m => {
          return (<FamilyMemberTabs key={m.id} name={m.name} onClick={() => setActive(m.id)} />)
        })}
        <Button variant={"outline-success"} onClick={e => newMember(e)}>+</Button>
      </header>
      <main>
        { members.map(m => {
          if (active === m.id) {
            return (<SalaryCalculator key={m.id} modMember={modMember} deleteMember={deleteMember} id={m.id} name={m.name} gross={m.gross} net={m.net} szja={m.szja} married={m.married} />)
          }
        }) }
        {/*<HouseholdSummary />*/}
      </main>
    </Container>
  );
};

export default HouseholdSalaryCalculator;
