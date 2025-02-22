import { Grid2 } from "@mui/material";
import GoalDropdown from "./GoalDropdown";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import BudgetInput from "./BudgetInput";
import PurposeDropdown from "./PurposeDropdown";
import PropTypes from "prop-types";
const GeneralDetails = ({
  selectedGoal,
  setSelectedGoal,
  selectedPropertyType,
  setSelectedPropertyType,
  budget,
  setBudget,
  selectedPurpose,
  setSelectedPurpose,
}) => {
  return (
    <fieldset
      style={{
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <legend
        style={{
          fontWeight: "bold",
          fontSize: "1.2rem",
          padding: "0 10px",
        }}
      >
        General Details
      </legend>
      <Grid2 container spacing={2} className="justify-center items-center">
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <GoalDropdown
            onSelectGoal={setSelectedGoal}
            selectedGoal={selectedGoal}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <PropertyTypeDropdown
            onSelectPropertyType={setSelectedPropertyType}
            selectedPropertyType={selectedPropertyType}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <BudgetInput onBudgetChange={setBudget} budget={budget} />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <PurposeDropdown
            onSelectPurpose={setSelectedPurpose}
            selectedPurpose={selectedPurpose}
          />
        </Grid2>
      </Grid2>
    </fieldset>
  );
};

// Add PropTypes validation
GeneralDetails.propTypes = {
  selectedGoal: PropTypes.string.isRequired,
  setSelectedGoal: PropTypes.func.isRequired,
  selectedPropertyType: PropTypes.string.isRequired,
  setSelectedPropertyType: PropTypes.func.isRequired,
  budget: PropTypes.string.isRequired,
  setBudget: PropTypes.func.isRequired,
  selectedPurpose: PropTypes.string.isRequired,
  setSelectedPurpose: PropTypes.func.isRequired,
};
export default GeneralDetails;
