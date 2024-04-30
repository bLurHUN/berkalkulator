import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import Container from "react-bootstrap/Container";

const HouseholdSalaryCalculator = () => {
  return (
    <Container fluid>
      <header>
        <FamilyMemberTabs />
      </header>
      <main>
        <SalaryCalculator />
        <HouseholdSummary />
      </main>
    </Container>
  );
};

export default HouseholdSalaryCalculator;
