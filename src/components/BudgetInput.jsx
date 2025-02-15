import { useState } from "react";

const BudgetInput = ({onBudgetChange})=>{
    const [budget,setBudget] = useState("");

        const handleChange = (e)=>{
            const value = e.target.value;
            if(/^\d*$/.test(value)){
                setBudget(value);
                onBudgetChange(value);     
            }
        };

        return (
            <div className="mb-4 ">
                <label className="block font-bold">Enter Budget($):</label>
                <input  
                type= "text"
                value={budget}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="enter your budget"
                />


            </div>
        )
    
}

export default BudgetInput;