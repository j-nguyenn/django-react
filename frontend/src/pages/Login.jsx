import Form from "../components/Form";

function Login() {
  return (
    <div className="flex items-center gap-20">
      <img width={650} src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <Form route="/api/token/" method="login" />
    </div>
  );
}

export default Login;
