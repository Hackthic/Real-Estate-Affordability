import { useState } from "react"; 

const GoalDropdown = ({ onSelectGoal }) => {
  const [goal, setGoal] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setGoal(selectedValue);

    // Ensure `onSelectGoal` is a valid function before calling
    if (typeof onSelectGoal === "function") {
      onSelectGoal(selectedValue);
    } else {
      console.error("onSelectGoal is not a function. Ensure it is passed from App.jsx correctly.");
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-bold"> Select goal </label>
      <select 
        value={goal} 
        onChange={handleChange} 
        className="w-full p-2 border rounded-lg"
      >
        <option value="">-- choose goal --</option>
        <option value="personal">Personal</option>
        <option value="investment">Investment</option>
      </select>
    </div>
  );
};

export default GoalDropdown;
