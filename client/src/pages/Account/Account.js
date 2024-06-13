import AccountDetail from "../../components/account/AccountDetail";
import RegisterForm from "../../components/account/RegisterForm";
import LoginForm from "../../components/account/LoginForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import ForgotPassworForm from "../../components/account/ForgotPasswordForm";
import ResetPassworForm from "../../components/account/ResetPasswordForm";

function Account() {
    const { user, logout } = useContext(UserContext);
    const { action } = useParams();

    const renderAction = () => {
        switch (action) {
            case "register":
                return <RegisterForm />;
            case "forgot-password":
                return <ForgotPassworForm />;
            case "reset-password":
                return <ResetPassworForm />;
            default:
                return <LoginForm />;
        }
    };

    return (
        <>
            {user?.email ? (
                <AccountDetail logout={logout} user={user} />
            ) : (
                <div>{renderAction()}</div>
            )}
        </>
    );
}

export default Account;
