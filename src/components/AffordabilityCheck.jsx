import { useState } from "react";

const AffordabilityCheck = ({ budget, additionalCosts, financialDetails, creditScore }) => {
  const [result, setResult] = useState(null);

  const calculateAffordability = () => {
    const totalCost = 
      parseInt(budget) + 
      parseInt(additionalCosts.registration || 0) + 
      parseInt(additionalCosts.maintenance || 0) + 
      parseInt(additionalCosts.token || 0) + 
      (budget * 0.055) + // Stamp Duty (5.5%)
      (budget * 0.015);  // Brokerage charge (1.5%)

    const availableFunds = parseInt(financialDetails.savings || 0);
    const shortfall = totalCost - availableFunds;

    if (shortfall <= 0) {
      setResult({
        canAfford: true,
        emi: 0,
        interestAmount: 0,
        recurringExpenses: (budget * 0.005).toFixed(2), // Estimated maintenance cost (0.5% of budget)
      });
      return;
    }

    // Loan Calculation
    const maxLoanAmount = financialDetails.income * 60; // Max loan = 5 years' salary
    const loanRequired = shortfall > maxLoanAmount ? maxLoanAmount : shortfall;
    let interestRate = creditScore > 750 ? 8 : creditScore > 650 ? 10 : 12;
    let tenure = 20 * 12; // 20 years loan tenure
    let monthlyInterestRate = interestRate / 12 / 100;
    let emi = (loanRequired * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
              (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    emi = emi.toFixed(2);

    setResult({
      canAfford: false,
      requiredAmount: shortfall.toFixed(2),
      loanOption: {
        amount: loanRequired.toFixed(2),
        interestRate,
        emi,
      },
    });
  };

  return (
    <div className="mt-4">
      <button onClick={calculateAffordability} className="bg-blue-500 text-white p-2 rounded-lg">
        Check Affordability
      </button>

      {result && (
        <div className="mt-4 p-3 border rounded-lg">
          {result.canAfford ? (
            <div>
              <h2 className="text-green-600 font-bold">✅ You Can Afford This Property!</h2>
              <p>Estimated Monthly Recurring Expenses: ₹{result.recurringExpenses}</p>
            </div>
          ) : (
            <div>
              <h2 className="text-red-600 font-bold">❌ You Need More Funds</h2>
              <p>Shortfall: ₹{result.requiredAmount}</p>
              <h3 className="text-blue-600 font-bold">Suggested Loan Option:</h3>
              <p>Loan Amount: ₹{result.loanOption.amount}</p>
              <p>Interest Rate: {result.loanOption.interestRate}%</p>
              <p>Estimated EMI: ₹{result.loanOption.emi}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AffordabilityCheck;
