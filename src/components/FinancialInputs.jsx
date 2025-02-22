import { Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
const FinancialInputs = ({ onFinancialChange }) => {
  const [financialData, setFinancialData] = useState({
    saving: "",
    income: "",
    debt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers
    if (/^\d*$/.test(value)) {
      setFinancialData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ FIX: Use useEffect to update the parent component AFTER state changes
  useEffect(() => {
    onFinancialChange(financialData);
  }, [financialData, onFinancialChange]); // Runs whenever financialData changes

  return (
    <>
      <fieldset
        style={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
        }}
      >
        <legend
          style={{ fontWeight: "bold", fontSize: "1.2rem", padding: "0 10px" }}
        >
          Financial Details
        </legend>
        <Grid2 container spacing={2} className="justify-center items-center">
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            {" "}
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Savings
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={financialData.saving}
                onChange={handleChange}
                name="saving"
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Savings"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            {" "}
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Monthly Income
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="income"
                value={financialData.income}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Monthly Income"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            {" "}
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Existing Debt
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="debt"
                value={financialData.debt}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Existing Debt"
              />
            </FormControl>
          </Grid2>
        </Grid2>
      </fieldset>
    </>
  );
};

export default FinancialInputs;
