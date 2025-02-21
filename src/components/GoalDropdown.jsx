import CustomSelect from "./ui/CustomSelect";
import PropTypes from "prop-types";
// import { useState } from "react";

const GoalDropdown = ({ onSelectGoal, selectedGoal }) => {
  // const [goal, setGoal] = useState("");  not needed

  // const handleChange = (event) => {
  //   const selectedValue = event.target.value;
  //   setGoal(selectedValue);

  //   // Ensure `onSelectGoal` is a valid function before calling
  //   if (typeof onSelectGoal === "function") {
  //     onSelectGoal(selectedValue);
  //   } else {
  //     console.error(
  //       "onSelectGoal is not a function. Ensure it is passed from App.jsx correctly."
  //     );
  //   }
  // };

  //Options for Selection
  const options = [
    { value: "", label: "--Select--" },
    { value: "personal", label: "Personal" },
    { value: "investment", label: "Investment" },
  ];
  return (
    <>
      <CustomSelect
        label="Select Goal"
        options={options}
        onChange={onSelectGoal}
        value={selectedGoal}
      />
    </>
  );
};

//Prop Types
GoalDropdown.propTypes = {
  onSelectGoal: PropTypes.func.isRequired,
  selectedGoal: PropTypes.string.isRequired,
};
export default GoalDropdown;
