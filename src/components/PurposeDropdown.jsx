// import { useState } from "react"; Not Required
import CustomSelect from "./ui/CustomSelect";
import PropTypes from "prop-types";
const PurposeDropdown = ({ selectedPurpose, onSelectPurpose }) => {
  // Not Required
  // const [purpose, setPurpose] = useState("");

  // const handleChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setPurpose(selectedValue);
  //   onselectPurpose(selectedValue);
  // };
  const options = [
    { value: "", label: "--Choose Purpose--" },
    { value: "live", label: "Live" },
    { value: "rent", label: "Rent" },
    { value: "sell", label: "Sell" },
  ];
  return (
    <>
      <CustomSelect
        label="Purpose"
        onChange={onSelectPurpose}
        value={selectedPurpose}
        options={options}
      />
    </>
  );
};

//Defining prop types
PurposeDropdown.propTypes = {
  onSelectPurpose: PropTypes.func.isRequired,
  selectedPurpose: PropTypes.string.isRequired,
};
export default PurposeDropdown;
