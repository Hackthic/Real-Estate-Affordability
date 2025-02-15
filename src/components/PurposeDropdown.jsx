import { useState } from "react";

const PurposeDropdown = ({onselectPurpose})=>{
    const [purpose, setPurpose] = useState("");

    const handleChange=(e)=>{
    const selectedValue = e.target.value;
    setPurpose(selectedValue);
    onselectPurpose(selectedValue);

};
return(
    <div className="mb-4 ">
        <label className="block font-bold">select purpose :</label>
   <select 
   value={purpose}
   onChange={handleChange}
   className="w-full p-2 border rounded-lg"
   >
    <option value="">--choose purpose</option>
    <option value="live">live</option>
    <option value="rent">rent</option>
    <option value="sell">sell it for later</option>
   </select>

    </div>
)


}

export default PurposeDropdown;