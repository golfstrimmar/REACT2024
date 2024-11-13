import React from 'react';
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";

const Login = () => {
  return (
    <div className="login">
      <h1>Login page</h1>
      
      <form className="login-form">
        <Input type='text' label={'Login'}/>
        <Input type='password' label={'Password'}/>
        <Button>Login</Button>
      </form>
    </div>
  );
};
export default Login;
  