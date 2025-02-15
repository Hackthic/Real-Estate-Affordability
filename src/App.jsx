import { useState } from "react";
import GoalDropdown from "./components/GoalDropdown";
import PropertyTypeDropdown from "./components/PropertyTypeDropdown";
import BudgetInput from "./components/BudgetInput";
import PurposeDropdown from "./components/PurposeDropdown";
import FinancialInputs from "./components/FinancialInputs";
import AdditionalCosts from "./components/AdditionalCosts";
import LoanDetails from "./components/LoanDetails";
import CreditScore from "./components/CreditScore";
import AffordabilityCheck from "./components/AffordabilityCheck";
import Result from "./components/Result";

function App() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [budget, setbudget] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [financialDetails, setFinancialDetails] = useState({
    savings: "",
    income: "",
    debt: "",
  });
  const [additionalCosts, setAdditionalCosts] = useState({
    registration: "",
    maintenance: "",
    token: "",
  })
  const [loanDetails, setLoanDetails]= useState({
    downPayment :"",
    tenure :"",
    interestRate:""
  })
  const [creditScore, setCreditScore] = useState("");
  const [showResult, setShowResult] = useState(false);

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('image.jpg')] bg-cover bg-center p-4  inset-0 bg-black opacity-90">
      <h1 className="text-3xl font-bold mb-5"> Real Estate Calculator </h1>
      <div className="bg-gray-300 p-6 rounded-lg shadow-md w-96">
        <GoalDropdown onSelected={setSelectedGoal} />
        <PropertyTypeDropdown onSelectPropertyType={setSelectedPropertyType} />
        
        <BudgetInput onBudgetChange={setbudget} />
       

        <PurposeDropdown onselectPurpose={setSelectedPurpose} />
       

        <FinancialInputs onFinancialChange={setFinancialDetails} />
        <AdditionalCosts onAdditionalCostsChange={setAdditionalCosts} />
        <LoanDetails onLoanDetailsChange={setLoanDetails} />
        <CreditScore creditScore={creditScore} onCreditScoreChange={setCreditScore} />
        <AffordabilityCheck
        budget={budget}
        additionalCosts={additionalCosts}
        financialDetails={financialDetails}
        creditScore={creditScore}
      />
       {showResult && (
        <Result budget={budget} additionalCosts={additionalCosts} income={income} creditScore={creditScore} emi={emi} />
      )}
        
      </div>
    </div>
  );
}

export default App;
