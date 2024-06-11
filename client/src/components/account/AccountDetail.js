import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AccountDetail() {

  const [method, setMethod] = useState("login");

  const { user, logout } = useContext(UserContext);

  return (
    <div>
      <h1>AccountDetail</h1>
      {user?.email ? (
        <div>
          <h2>Welcome, {user.firstName} {user.lastName}!</h2>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          {method === "login" ? (
            <LoginForm showRegisterForm={() => setMethod("register")} />
          ) : (
            <RegisterForm showLoginForm={() => setMethod("login")} />
          )}
        </div>
      )}
    </div>
  );
}

export default AccountDetail;