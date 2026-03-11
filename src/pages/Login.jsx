import '../CSS/Login.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import CreateAccount from "./CreateAccount";
import CheckBalance from "./CheckBalance";
function Menu() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="grid">
        <button
          className="bankButton"
          onClick={() => navigate("withdraw")}
        >
          Withdraw
        </button>
        <button
          className="bankButton"
          onClick={() => navigate("deposit")}
        >
          Deposit
        </button>
        <button
          className="bankButton"
          onClick={() => navigate("create")}
        >
          Create Account
        </button>
        <button
          className="bankButton"
          onClick={() => navigate("balance")}
        >
          Check Balance
        </button>
      </div>
    </div>
  );
}
export default function Login() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="withdraw" element={<Withdraw />} />
      <Route path="deposit" element={<Deposit />} />
      <Route path="create" element={<CreateAccount />} />
      <Route path="balance" element={<CheckBalance />} />
    </Routes>
  );
}