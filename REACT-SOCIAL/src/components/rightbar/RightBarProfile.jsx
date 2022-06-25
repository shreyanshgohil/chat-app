import style from "./RightBarProfile.module.css";
import { Users } from "../../dummyData";
import OnlineUerProfile from "../onlineUser/OnlineUerProfile";
const RightBarProfile = () => {
  return (
    <div className={style.rightBarProfile}>
      <div className={style.rightBarProfileWrapper}>
        <div className={style.rightBarTop}>
          <h3 className={style.userInformationText}>User Information</h3>
          <p className={style.infoText}>
            <span className={style.infoPrefix}>City:</span> Dahegam
          </p>
          <p className={style.infoText}>
            <span className={style.infoPrefix}>From:</span> Botad
          </p>
          <p className={style.infoText}>
            <span className={style.infoPrefix}>Relationship:</span> Bajangdal
          </p>
        </div>
        <h4 className={style.UserFriendsLabel}>User Friends</h4>
        <div className={style.rightBarBottom}>
          {Users.map((user) => (
            <OnlineUerProfile user={user} key={user.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBarProfile;
