import style from "./Login.module.css";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

const Login = () => {
  // Inins of site
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  // Form submit function
  const formSubmitHandler = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch
    );
  };

  // Html code
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.loginLeft}>
          <h3 className={style.webLogo}>Shreyansh+</h3>
          <span className={style.webDecription}>
            Connect with friends and the world arround you on Lamasocial
          </span>
        </div>
        <div className={style.loginRight}>
          <form className={style.rightWrapper} onSubmit={formSubmitHandler}>
            <input
              type="email"
              className={`${style.userName} inputBox`}
              name="username"
              placeholder="Username"
              ref={emailRef}
              required
            />
            <input
              type="password"
              className={`${style.userPassword} inputBox`}
              name="password"
              placeholder="Password"
              ref={passwordRef}
              minLength="6"
              required
            />
            <button
              className={`${style.loginButton} btn`}
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <a href="/abc" className={style.forgotPassword}>
              Forgot password
            </a>
            <a
              href="/abc"
              className={`${style.registerButton} btn`}
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
