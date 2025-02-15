import { useState } from "react";
 const PropertyTypeDropdown = ({ onSelectPropertyType})=>{
    const [propertyType, setPropertyType] = useState("")

    const handleChange =(e)=>{
        const selectedValue = e.target.value;
        setPropertyType(selectedValue);
        onSelectPropertyType(selectedValue);
    };

    return(
        <div className="mb-4 ">
            <label className="block font-bold"> Select property type:</label>

            <select 
            value={propertyType}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            >
            <option value="">--choose proprty type--</option>
            <option value="commercial">commercial</option>
            <option value="residential">residential</option>
            <option value="industrial">industrial</option>
            <option value="land">land</option>

            </select>


        </div>
    );
 };
 export default PropertyTypeDropdown;