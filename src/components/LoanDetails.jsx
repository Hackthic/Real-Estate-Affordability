import { useState } from "react";

const LoanDetails = ({ onLoanDetailsChange})=>{
    const [loanDetails, setLoanDetails]= useState({
        downPayment :"",
        tenure: "",
        interestRate: ""
    });

    const handleChange = (e)=>{
        const {name, value}=e.target;

        if(/^\d*$/.test(value)){
            setLoanDetails((prev)=>{
                const updatedDetails ={...prev, [name]: value};
                onLoanDetailsChange(updatedDetails);
                return updatedDetails;
            });
        }
    };

    return (
        <div className="mb-4 ">
      <label className="block font-bold">Down Payment (₹)</label>
      <input
        type="text"
        name="downPayment"
        value={loanDetails.downPayment}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Down Payment"
      />

      <label className="block font-bold">Loan Tenure (Years)</label>
      <input
        type="text"
        name="tenure"
        value={loanDetails.tenure}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Loan Tenure"
      />

      <label className="block font-bold">Interest Rate (%)</label>
      <input
        type="text"
        name="interestRate"
        value={loanDetails.interestRate}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Interest Rate"
      />
    </div>
    );
};
export default LoanDetails;