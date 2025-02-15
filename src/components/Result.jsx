const Result = ({ budget, additionalCosts, income, creditScore, emi }) => {
    const totalCost = 
      Number(budget) +
      Number(additionalCosts.registration || 0) +
      Number(additionalCosts.maintenance || 0) +
      Number(additionalCosts.token || 0);
  
    const maxLoanAmount = income * 60; // Approx loan eligibility (assuming 5 years max tenure)
    const interestRate = creditScore >= 750 ? 7 : creditScore >= 600 ? 9 : 12;
    const emiPerMonth = emi; // EMI already calculated in EMI component
    const totalLoanRepayment = emiPerMonth * 60; // Assuming 5 years
  
    const affordabilityGap = totalCost - maxLoanAmount;
    const canAfford = maxLoanAmount >= totalCost;
  
    return (
      <div className="p-4 border rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-2">Affordability Check</h2>
  
        {canAfford ? (
          <div>
            <p className="text-green-600 font-semibold">✅ You can afford this property!</p>
            <p><strong>Total Property Cost:</strong> ₹{totalCost.toLocaleString()}</p>
            <p><strong>EMI per Month:</strong> ₹{emiPerMonth.toLocaleString()}</p>
            <p><strong>Interest Rate:</strong> {interestRate}%</p>
            <p><strong>Total Loan Repayment:</strong> ₹{totalLoanRepayment.toLocaleString()}</p>
          </div>
        ) : (
          <div>
            <p className="text-red-600 font-semibold">❌ You cannot afford this property.</p>
            <p><strong>Total Required:</strong> ₹{totalCost.toLocaleString()}</p>
            <p><strong>Max Loan Possible:</strong> ₹{maxLoanAmount.toLocaleString()}</p>
            <p><strong>Shortfall:</strong> ₹{affordabilityGap.toLocaleString()}</p>
  
            <h3 className="mt-3 font-bold">Breakdown of Additional Money Needed:</h3>
            <ul className="list-disc pl-5">
              <li>Registration Cost: ₹{additionalCosts.registration || 0}</li>
              <li>Maintenance Cost: ₹{additionalCosts.maintenance || 0}</li>
              <li>Token Amount: ₹{additionalCosts.token || 0}</li>
              <li>Remaining Needed for Property: ₹{affordabilityGap.toLocaleString()}</li>
            </ul>
  
            <h3 className="mt-3 font-bold">Loan Options Based on Credit Score:</h3>
            {creditScore >= 750 ? (
              <p className="text-green-600">You qualify for a **low-interest** loan at {interestRate}%.</p>
            ) : creditScore >= 600 ? (
              <p className="text-yellow-600">You qualify for a **medium-interest** loan at {interestRate}%.</p>
            ) : (
              <p className="text-red-600">Your credit score is **low**. Expect **higher interest rates** ({interestRate}%) or improve your score first.</p>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default Result;
  