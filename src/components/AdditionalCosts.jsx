import { useState, useEffect, useMemo } from "react";

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
  const stampDuty = useMemo(() => (budget ? (budget * 0.055).toFixed(2) : "0"), [budget]);
  const brokerCharge = useMemo(() => (budget ? (budget * 0.015).toFixed(2) : "0"), [budget]);

  return (
    <div className="mb-4">
      <label className="block font-bold">Registration Cost:</label>
      <input
        type="text"
        name="registration"
        value={costs.registration}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter registration cost"
      />

      <label className="block font-bold">Maintenance Cost:</label>
      <input
        type="text"
        name="maintenance"
        value={costs.maintenance}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter maintenance cost"
      />

      <label className="block font-bold">Token Amount:</label>
      <input
        type="text"
        name="token"
        value={costs.token}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter token amount"
      />

      {/* Auto-calculated values */}
      <div className="mt-3">
        <p className="font-bold">Stamp Duty (5.5%): ₹{stampDuty}</p>
        <p className="font-bold">Broker Charge (1.5%): ₹{brokerCharge}</p>
      </div>
    </div>
  );
};

export default AdditionalCosts;
