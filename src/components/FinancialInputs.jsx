import { useState } from "react";

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
      setFinancialData((prev) => {
        const updatedData = { ...prev, [name]: value };
        onFinancialChange(updatedData); // Send updated data to parent component
        return updatedData;
      });
    }
  };

  return (
    <div className="mb-4 ">
      <label className="block font-bold">Enter Saving (₹)</label>
      <input
        type="text"
        name="saving"
        value={financialData.saving}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter your saving"
      />

      <label className="block font-bold mt-3">Enter Monthly Income (₹)</label>
      <input
        type="text"
        name="income"
        value={financialData.income}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Monthly Income"
      />

      <label className="block font-bold mt-3">Enter Existing Debt (₹)</label>
      <input
        type="text"
        name="debt"
        value={financialData.debt}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Existing Debt"
      />
    </div>
  );
};

export default FinancialInputs;
