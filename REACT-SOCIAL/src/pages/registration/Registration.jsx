import { useRef } from "react";
import style from "./Registration.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Registration = () => {
  const userName = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const email = useRef();
  const history = useHistory();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (password.current.value === passwordAgain.current.value) {
      try {
        await axios.post("http://localhost:8800/api/auth/register", {
          username: userName.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={style.registration}>
      <div className={style.registrationWrapper}>
        <div className={style.registrationLeft}>
          <h3 className={style.webLogo}>Shreyansh+</h3>
          <span className={style.webDecription}>
            Connect with friends and the world arround you on Lamasocial
          </span>
        </div>
        <div className={style.registrationRight}>
          <form className={style.rightWrapper} onSubmit={formSubmitHandler}>
            <input
              type="text"
              className={`${style.userName} inputBox`}
              name="username"
              placeholder="Username"
              ref={userName}
              required
            />
            <input
              type="email"
              className={`${style.userEmail} inputBox`}
              name="email"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className={`${style.userPassword} inputBox`}
              name="password1"
              placeholder="Password"
              ref={password}
              required
              minLength="6"
            />
            <input
              type="password"
              className={`${style.userPassword} inputBox`}
              name="passwor2"
              placeholder="Password Again"
              ref={passwordAgain}
              minLength="6"
            />
            <button className={`${style.registrationButton} btn`}>
              Sign Up
            </button>
            <a href="/abc" className={`${style.registerButton} btn`}>
              Log into Account
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
