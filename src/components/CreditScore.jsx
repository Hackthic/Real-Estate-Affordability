import { TextField } from "@mui/material";

const CreditScore = ({ creditScore, onCreditScoreChange }) => {
  const handleChange = (e) => {
    let value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      onCreditScoreChange(value);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        id="outlined-number"
        value={creditScore}
        onChange={handleChange}
        label="Credit Score"
        type="number"
        placeholder="Enter Credit Score: (300-800)"
        inputProps={{
          min: 300,
          max: 800,
        }}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
    </>
  );
};

export default CreditScore;
