import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

const BudgetInput = ({ onBudgetChange }) => {
  const [budget, setBudget] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBudget(value);
      onBudgetChange(value);
    }
  };

  return (
    <>
      {/* <div className="mb-4 ">
        <label className="block font-bold">Enter Budget($):</label>
        <input
          type="text"
          value={budget}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="enter your budget"
        />
      </div> */}
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Budget</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={budget}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          label="Budget"
        />
      </FormControl>
    </>
  );
};

export default BudgetInput;
