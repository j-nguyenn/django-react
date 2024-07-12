import SignUpForm from "../components/SignUpForm";

function Register() {
    return <SignUpForm route="/api/user/register/" method="register" />;
}

export default Register