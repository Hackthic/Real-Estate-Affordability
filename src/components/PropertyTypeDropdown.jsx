import CustomSelect from "./ui/CustomSelect";
import PropTypes from "prop-types";
// import { useState } from "react"; Not Needed
const PropertyTypeDropdown = ({
  selectedPropertyType,
  onSelectPropertyType,
}) => {
  // Not Needed
  // const handleChange = (e) => {
  //   const selectedValue = e.target.value;
  //   onSelectPropertyType(selectedValue);
  // };
  const options = [
    { value: "", label: "--Choose Type--" },
    { value: "commercial", label: "Commercial" },
    { value: "residential", label: "Residential" },
    { value: "industrial", label: "Industrial" },
    { value: "land", label: "Land" },
  ];
  return (
    <>
      <CustomSelect
        label="Select Type"
        onChange={onSelectPropertyType}
        value={selectedPropertyType}
        options={options}
      />
    </>
  );
};
// Prop Types
PropertyTypeDropdown.propTypes = {
  onSelectPropertyType: PropTypes.func.isRequired,
  selectedPropertyType: PropTypes.string.isRequired,
};
export default PropertyTypeDropdown;
