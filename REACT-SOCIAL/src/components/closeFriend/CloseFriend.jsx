import style from "./CloseFriend.module.css";

const CloseFriend = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className={`${style.sideBarFriend} flex`}>
      <img
        src={PF + user.profilePicture}
        alt="Profile of friend"
        className={style.sideBarProfilePicture}
        loading="lazy"
      />
      <span className={style.friendUserName}>{user.username}</span>
    </li>
  );
};

export default CloseFriend;
