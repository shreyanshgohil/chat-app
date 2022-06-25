import style from "./RightBarHome.module.css";
import { Users } from "../../dummyData";
import OnlineUser from "../onlineUser/OnlineUserHome";
const RightBar = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={style.rightBar}>
      <div className={style.rightBarWrapper}>
        <div className={style.birthDayContainer}>
          <img
            src={PF + "gift.png"}
            alt="Birthday reminder"
            loading="lazy"
            className={style.birhDayImage}
          />
          <p className={style.birthDayText}>
            <strong> Prachi patel</strong> and <strong>3 other friends </strong>
            <br />
            have birthday today
          </p>
        </div>
        <img
          src={PF + "ad.png"}
          alt="Advertisement"
          loading="lazy"
          className={style.advertisementImage}
        />
        <h4 className={style.onlineTextLable}>Online Friends</h4>
        <ul className={style.onlineFriends}>
          {Users.map((user) => (
            <OnlineUser user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
