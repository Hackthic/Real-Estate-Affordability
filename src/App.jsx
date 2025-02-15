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
import AuthModal from "./components/AuthModal"; // Import Authentication Modal
import { auth } from "./firebaseConfig"; // Import Firebase Auth
import { signOut } from "firebase/auth";

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // Handle Successful Login
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setUser(auth.currentUser); // Store user details
    setShowResult(true); // Show result after login
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setUser(null);
    setShowResult(false);
  };

  // Handle Affordability Check (Show Auth Modal if Not Logged In)
  const handleCheckAffordability = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowResult(true);
    }
  };
  
  return (
    < div className="min-h-screen flex flex-col items-center justify-center bg-[url('image.jpg')] bg-cover bg-center p-4  inset-0 bg-black opacity-90">
      <h1 className="text-3xl font-bold mb-5"> Real Estate Calculator </h1>
      <div className="bg-gray-300 p-6 rounded-lg shadow-md w-96">
      <GoalDropdown onSelectGoal={setSelectedGoal} />

        <PropertyTypeDropdown onSelectPropertyType={setSelectedPropertyType} />
        
        <BudgetInput onBudgetChange={setbudget} />
       

        <PurposeDropdown onselectPurpose={setSelectedPurpose} />
       

        <FinancialInputs onFinancialChange={setFinancialDetails} />
        <AdditionalCosts onAdditionalCostsChange={setAdditionalCosts} />
        <LoanDetails onLoanDetailsChange={setLoanDetails} />
        <CreditScore creditScore={creditScore} onCreditScoreChange={setCreditScore} />
        {!showResult && (
          <button onClick={handleCheckAffordability} className="bg-blue-600 text-white p-3 rounded mt-4 w-full">
            Check Affordability
          </button>
        )}

        {showResult && (
          <Result
            budget={budget}
            additionalCosts={additionalCosts}
            income={financialDetails.income}
            creditScore={creditScore}
          />
        )}

        {isAuthenticated && (
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded mt-4 w-full">
            Logout
          </button>
        )}
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onAuthSuccess={handleAuthSuccess} />}
        
      
    </div>
  );
}

export default App;
