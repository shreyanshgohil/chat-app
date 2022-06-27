import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/registration/Registration";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import BookMark from "./pages/bookmark/BookMark";
import Messenger from "./pages/Messenger/Messenger";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Switch>
      <Route path="/" exact>
        {user ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login" exact>
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/register" exact>
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route path="/profile/:username" exact>
        {user ? <Profile /> : <Redirect to="/login" />}
      </Route>
      <Route path="/bookmarks">
        {user ? <BookMark /> : <Redirect to="/login" />}
      </Route>
      <Route path="/messenger">
        {user ? <Messenger/> :<Redirect to="/login"/>}
      </Route>
    </Switch>
  );
}

export default App;
