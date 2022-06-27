import style from "./OnlineUserProfile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const OnlineUerProfile = (props) => {
  // inis
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: userId } = props;
  const [userObj, setUserObj] = useState(null);

  // Fetching user data
  useEffect(() => {
    const getUserDetailsHandler = async () => {
      const response = await axios.get(
        `http://localhost:8800/api/users?userId=${userId}`
      );
      setUserObj(response.data);
    };
    getUserDetailsHandler();
  }, [userId]);
  return (
    <>
      <div className={style.OnlineUerProfile}>
        <div className={style.OnlineUerProfileWrapper}>
          <div className={style.usersContainer}>
            <img
              src={
                userObj?.profilePicture
                  ? `${PF}person/${userObj?.profilePicture}`
                  : PF + "person/noAvtar.jpeg"
              }
              alt="User Profile"
              className={style.userImage}
            />
            <span className={style.userName}>{userObj?.username}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineUerProfile;
