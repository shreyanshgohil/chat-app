import style from "./RightBarProfile.module.css";
import { Users } from "../../dummyData";
import OnlineUerProfile from "../onlineUser/OnlineUerProfile";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const RightBarProfile = (props) => {
  // Inits
  const { user } = useContext(AuthContext);
  const { profileUser } = props;
  const [isFollowed, setFollwed] = useState(
    profileUser?.followers.find((userId) => userId === user?._id)
  );
  // Follow and unfollow a user
  const followUnfollowHandler = async () => {
    const response = await axios.put(
      `http://localhost:8800/api/users/${profileUser._id}/follow`,
      {
        userId: user._id,
      }
    );
    response.status == 200 && setFollwed(!isFollowed);
  };

  // JSX code
  return (
    <>
      <div className={style.rightBarProfile}>
        <div className={style.rightBarProfileWrapper}>
          <div className={style.rightBarTop}>
            {user._id !== profileUser._id ? (
              <button onClick={followUnfollowHandler}>
                {isFollowed ? "unfollow" : "Follow"}
              </button>
            ) : (
              ""
            )}

            <h3 className={style.userInformationText}>User Information</h3>
            <p className={style.infoText}>
              followers={profileUser.followers.length}
            </p>
            <p className={style.infoText}>
              followings={profileUser.followings.length}
            </p>
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
            {profileUser?.followings.map((user, i) => (
              <OnlineUerProfile user={user} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBarProfile;
