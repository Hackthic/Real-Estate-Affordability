import {
  Grid2,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";

const LoanDetails = ({ loanDetails, onLoanDetailsChange }) => {
  // const [loanDetails, setLoanDetails] = useState({
  //   downPayment: "",
  //   tenure: "",
  //   interestRate: "",
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Allow only numbers
    if (/^\d*$/.test(value)) {
      onLoanDetailsChange((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ FIX: Use useEffect to update parent AFTER state changes
  useEffect(() => {
    onLoanDetailsChange(loanDetails);
  }, [loanDetails, onLoanDetailsChange]); // Runs only when `loanDetails` changes

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
          Load Details
        </legend>
        <Grid2 container spacing={2} className="justify-center items-center">
          <Grid2 size={4}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Down Payment
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="downPayment"
                value={loanDetails.downPayment}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">₹</InputAdornment>
                }
                label="Down Payment"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={4}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Loan Tenure
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="tenure"
                value={loanDetails.tenure}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">Years</InputAdornment>
                }
                label="Loan Tenure"
              />
            </FormControl>
          </Grid2>
          <Grid2 size={4}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Interest Rate
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                name="interestRate"
                value={loanDetails.interestRate}
                onChange={handleChange}
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                label="Token Amount"
              />
            </FormControl>
          </Grid2>
        </Grid2>
      </fieldset>
    </>
  );
};
// ✅ Add PropTypes validation
LoanDetails.propTypes = {
  loanDetails: PropTypes.shape({
    downPayment: PropTypes.string.isRequired,
    tenure: PropTypes.string.isRequired,
    interestRate: PropTypes.string.isRequired,
  }).isRequired,
  onLoanDetailsChange: PropTypes.func.isRequired,
};
export default LoanDetails;
