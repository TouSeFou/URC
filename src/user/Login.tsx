import { useState } from "react";
import { loginUser } from "./loginApi";
import { Session } from "../model/common";
import { CustomError } from "../model/CustomError";
import { TextField, Button, Typography, Box } from "@mui/material";
import "./LoginCss.css"; // Import the CSS file
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';

export function Login() {
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as Session);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    loginUser(
      {
        user_id: -1,
        username: data.get("login") as string,
        password: data.get("password") as string,
      },
      (result: Session) => {
        console.log(result);
        setSession(result);
        form.reset();
        setError(new CustomError(""));
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError(loginError);
        setSession({} as Session);
      }
    );
  };

  return (
    <>
    <Link to="/signup">Creer un compte</Link>
    <Box className="login-container">
      <Typography variant="h4" className="login-title">
        Se connecter
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <TextField
          name="login"
          label="Login"
          variant="outlined"
          className="login-input"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          className="login-input"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="login-button"
        >
          Connexion
        </Button>
        
      </form>

      {session.token && (
        <Typography variant="body2" className="session-info">
          {session.username} : {session.token}
        </Typography>
      )}

      {error.message && (
        <Typography variant="body2" className="error-message">
          {error.message}
        </Typography>
      )}
    </Box>
    </>
  );
}
