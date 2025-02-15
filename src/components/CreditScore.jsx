const CreditScore = ({ creditScore, onCreditScoreChange }) => {
    const handleChange = (e) => {
      let value = e.target.value;
  
      // Allow only numbers
      if (/^\d*$/.test(value)) {
        onCreditScoreChange(value);
      }
    };
  
    return (
      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Credit Score:</label>
        <input
          type="number"
          value={creditScore}
          onChange={handleChange}
          placeholder="Enter Credit Score (300-800)"
          min="300"
          max="800"
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
    );
  };
  
  export default CreditScore;
  