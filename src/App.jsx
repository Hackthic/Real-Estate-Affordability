import { Box, Grid2 } from "@mui/material";
import { signOut } from "firebase/auth";
import { useState } from "react";
import AdditionalCosts from "./components/AdditionalCosts";
import AuthModal from "./components/AuthModal"; // Import Authentication Modal
import CreditScore from "./components/CreditScore";
import FinancialInputs from "./components/FinancialInputs";
import GeneralDetails from "./components/GeneralDetails";
import LoanDetails from "./components/LoanDetails";
import Result from "./components/Result";
import { Boxes } from "./components/ui/background-boxes";
import { auth } from "./firebaseConfig"; // Import Firebase Auth
function App() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [budget, setBudget] = useState(""); // Fixed function naming
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
  });

  const [loanDetails, setLoanDetails] = useState({
    downPayment: "",
    tenure: "",
    interestRate: "",
  });

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

  // Handle Logout with Error Handling
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      setShowResult(false);
    } catch (error) {
      console.error("Logout Error:", error);
    }
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
    <div
      style={{
        backgroundImage: "url('/image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-full h-full overflow-hidden"
    >
      <Boxes />
      <div className="flex flex-row items-center">
        <img
          src="/building-svgrepo-com.svg"
          alt="Real Estate Logo"
          className="w-15 h-15 ml-4 z-10"
        />
        <h1 className="text-3xl font-bold text-white p-5 z-10">
          {" "}
          Real Estate Calculator{" "}
        </h1>
      </div>

      <div className="flex min-h-screen bg-cover bg-center p-4 justify-center items-center">
        <Box className="max-w-5xl bg-white opacity-90 p-6 rounded-lg shadow-md ">
          <Grid2 container spacing={2} className="justify-center items-center">
            <Grid2 size={12}>
              <GeneralDetails
                selectedGoal={selectedGoal}
                setSelectedGoal={setSelectedGoal}
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
                budget={budget}
                setBudget={setBudget}
                selectedPurpose={selectedPurpose}
                setSelectedPurpose={setSelectedPurpose}
              />
            </Grid2>
            {/* Fixed typo */}
            <Grid2 size={12}>
              <FinancialInputs onFinancialChange={setFinancialDetails} />
            </Grid2>
            <Grid2 size={12}>
              <AdditionalCosts onAdditionalCostsChange={setAdditionalCosts} />
            </Grid2>
            <Grid2 size={12}>
              <LoanDetails
                onLoanDetailsChange={setLoanDetails}
                loanDetails={loanDetails}
              />
            </Grid2>
            <Grid2 size={4}>
              <CreditScore
                creditScore={creditScore}
                onCreditScoreChange={setCreditScore}
              />
            </Grid2>
            <Grid2 size={12} display="flex" justifyContent="center">
              {!showResult && (
                <button
                  onClick={handleCheckAffordability}
                  className="bg-blue-600 text-white p-3 rounded mt-4 w-3xl cursor-pointer hover:bg-blue-700"
                >
                  Check Affordability
                </button>
              )}
            </Grid2>
          </Grid2>
          {showResult && (
            <Result
              budget={budget}
              additionalCosts={additionalCosts}
              income={financialDetails.income}
              creditScore={creditScore}
            />
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded mt-4 w-full"
            >
              Logout
            </button>
          )}
        </Box>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default App;
