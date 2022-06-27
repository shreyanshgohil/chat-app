import style from "./TopBar.module.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const TopBar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={style.topBarContainer}>
      <div className={style.topBarLeft}>
        <span className={style.topBarLogo}>
          <NavLink
            to="/"
            className={style.navColor}
            activeClassName={style.activeLink}
          >
            shreyansh+
          </NavLink>
        </span>
      </div>
      <div className={style.topBarCenter}>
        <div className={style.searchBarWrapper}>
          <Search className={style.searchIcon} />
          <input
            type="text"
            placeholder="Search for post,friend or video"
            className={style.searchInput}
          />
        </div>
      </div>
      <div className={style.topBarRight}>
        <div className={style.topBarLinksWrapper}>
          <ul className={style.topBarLinks}>
            <li className={style.topBarLink}>
              <NavLink to="/" className={style.navColor}>
                Home
              </NavLink>
            </li>
            <li className={style.topBarLink}>
              <NavLink to="/login" className={style.navColor}>
                Timeline
              </NavLink>
            </li>
          </ul>
          <div className={style.topBarIconsWrapper}>
            <ul className={style.topBarIcons}>
              <li className={style.topBarIcon}>
                <Person className={style.topBarIconMain} />
                <span className={style.topBarIconBadge}>1</span>
              </li>
              <li className={style.topBarIcon}>
                <Chat className={style.topBarIconMain} />
                <span className={`${style.topBarIconBadge} ${style.chatIcon}`}>
                  1
                </span>
              </li>
              <li className={style.topBarIcon}>
                <Notifications className={style.topBarIconMain} />
                <span className={style.topBarIconBadge}>1</span>
              </li>
            </ul>
          </div>
          <img
            src={
              user.profilePicture
                ? PF + `person/${user.profilePicture}`
                : PF + `person/noAvtar.jpeg`
            }
            className={style.topBarImage}
            loading="lazy"
            alt="User profile"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
