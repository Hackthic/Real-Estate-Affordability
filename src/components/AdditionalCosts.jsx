import { useState, useEffect, useMemo } from "react";
import {
  Grid2,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

const AdditionalCosts = ({ budget, onAdditionalCostsChange }) => {
  const [costs, setCosts] = useState({
    registration: "",
    maintenance: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value)) {
      setCosts((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ FIX: Use useEffect to update parent state AFTER costs update
  useEffect(() => {
    onAdditionalCostsChange(costs);
  }, [costs, onAdditionalCostsChange]); // Runs whenever costs change

  // ✅ OPTIMIZATION: Memoized calculations to prevent unnecessary recalculations
  const stampDuty = useMemo(
    () => (budget ? (budget * 0.055).toFixed(2) : "0"),
    [budget]
  );
  const brokerCharge = useMemo(
    () => (budget ? (budget * 0.015).toFixed(2) : "0"),
    [budget]
  );

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
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "0 10px",
          }}
        >
          Additional Costs
        </legend>
        <Grid2 container spacing={2} className="justify-center items-center">
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Registration cost
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="registration"
                value={costs.registration}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Registration cost"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Maintenance Cost
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="maintenance"
                value={costs.maintenance}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Maintenance Cost"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Token Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="token"
                value={costs.token}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Token Amount"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={12}>
            {/* Auto-calculated values */}
            <p className="font-bold text-slate-600 opacity-75 ml-2">
              Stamp Duty (5.5%): ₹{stampDuty}
            </p>
            <p className="font-bold text-slate-600 opacity-75 ml-2">
              Broker Charge (1.5%): ₹{brokerCharge}
            </p>
          </Grid2>
        </Grid2>
      </fieldset>
    </>
  );
};

export default AdditionalCosts;
