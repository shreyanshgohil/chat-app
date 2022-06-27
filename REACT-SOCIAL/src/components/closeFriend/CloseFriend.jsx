import style from "./CloseFriend.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
const CloseFriend = ({ user }) => {
  const [userObj, setUserObj] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getUserHandler = async () => {
      const reponse = await axios.get(
        `http://localhost:8800/api/users?userId=${user}`
      );
      setUserObj(reponse.data);
    };
    getUserHandler();
  }, []);
  return (
    <>
      {userObj ? (
        <li className={`${style.sideBarFriend} flex`}>
          <img
            src={
              userObj.profilePicture
                ? PF + `person/${userObj.profilePicture}`
                : PF + `person/noAvtar.jpeg`
            }
            alt="Profile of friend"
            className={style.sideBarProfilePicture}
            loading="lazy"
          />
          <span className={style.friendUserName}>{userObj.username}</span>
        </li>
      ) : (
        ""
      )}
    </>
  );
};

export default CloseFriend;
