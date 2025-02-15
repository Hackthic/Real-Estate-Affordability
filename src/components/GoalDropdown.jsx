import { useState } from "react"; 
 
const GoalDropdown =({onSelectGoal})=>{
const [goal, setGoal]= useState("");

const handleChange = (event)=>{
    const selectedValue = event.target.value;
    setGoal(event.target.value);
    onSelectGoal(selectedValue);
};

return(
    <div className="mb-4 ">
        <label className="block font-bold"> Select goal </label>
        <select value={goal}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        >
            <option value="">-- choose goal --</option>
            <option value="personal">personel</option>
            <option value="investment">investment</option>

        </select>

    </div>
);

};
export default GoalDropdown;