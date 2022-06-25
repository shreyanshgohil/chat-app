import style from "./OnlineUserProfile.module.css";

const OnlineUerProfile = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={style.OnlineUerProfile}>
      <div className={style.OnlineUerProfileWrapper}>
        <div className={style.usersContainer}>
          <img
            src={PF + user.profilePicture}
            alt="User Profile"
            className={style.userImage}
          />
          <span className={style.userName}>{user.username}</span>
        </div>
      </div>
    </div>
  );
};

export default OnlineUerProfile;
