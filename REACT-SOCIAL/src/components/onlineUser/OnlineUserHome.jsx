import React from "react";
import style from "./OnlineUserHome.module.css";
const OnlineUser = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className={style.onlineFriend}>
      <img
        src={PF + user.profilePicture}
        alt="Onlie person"
        loading="lazy"
        className={style.onLineUserImage}
      />
      <span className={style.onLineUserName}>{user.username}</span>
    </li>
  );
};

export default OnlineUser;
