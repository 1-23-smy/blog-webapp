import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState } from 'react';
import { API } from "../../services/api.js";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 150,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
  height: "auto",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #2e3192;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 2px;
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;
const error = styled(Typography)`
 font-size:10px;
 color:#ff6161;
 line-height:0;
 margin-top:10px;
 font-weight:600;
 `
const SignupValue = {
  name: "",
  username: "",
  password: ""
}
const Login = () => {
  const imageURL =
    "https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png";
  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(SignupValue);
  const [err, Seterr] = useState('');

  const toggleon = () => {
    account === 'login' ? toggleAccount('signup') : toggleAccount('login')
  }
  const onInputChange = (e) => {
    // setSignup(...signup, [e.target.name])
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        Seterr('');
        setSignup(SignupValue);
        toggleAccount('login');
      }
      else {
        Seterr("Something went wrong! Please try again later");
      }
    }
    catch (er) {
      console.log(er);
    }
  }
  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />
      </Box>
      {account === 'login' ?
        <Wrapper>
          <TextField variant="standard" label="Enter username" />
          <TextField variant="standard" label=" Enter password" />
          <LoginButton variant="contained">Login</LoginButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <SignupButton variant="outlined" onClick={toggleon}>Create an account</SignupButton>
        </Wrapper>
        :
        <Wrapper>
          <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label="Enter Name" />
          <TextField variant="standard" onChange={(e) => onInputChange(e)} username='username' label=" Enter Username" />
          <TextField variant="standard" onChange={(e) => onInputChange(e)} password='password' label=" Enter Password" />

          {err && <error>{err}</error>}

          <SignupButton onClick={() => signupUser()} variant="contained">Signup</SignupButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <LoginButton variant="contained" onClick={toggleon}>Already have an account</LoginButton>
        </Wrapper>
      }
    </Component>
  )
};

export default Login;
