import style from "./Profile.module.css";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import SideBar from "../../components/sidebar/SideBar";
import RightBarProfile from "../../components/rightbar/RightBarProfile";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  // Inits
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [profilePosts, setProfilePosts] = useState([]);
  // Fetching user profile
  useEffect(() => {
    const getUserAllPostHandler = async () => {
      const user = await axios.get(
        `http://localhost:8800/api/users?userName=${username}`
      );
      setProfileUser(user.data);
    };
    getUserAllPostHandler();
  }, []);

  // Fetching post of profile page
  useEffect(() => {
    const profilePagePostHandler = async () => {
      const response = await axios.get(
        `http://localhost:8800/api/posts/post/${profileUser?._id}`
      );
      setProfilePosts(response.data);
    };
    profilePagePostHandler();
  }, [profileUser]);

  // HTML code is hear
  return (
    <>
      <TopBar />
      <div className={`${style.profile} flex`}>
        <SideBar />
        <div className={style.profileRight}>
          <div className={style.profileRightTop}>
            <div className={style.profileImageWrapper}>
              <img
                src={
                  profileUser?.coverPicture
                    ? `${PF}post/${profileUser?.coverPicture}`
                    : `${PF}post/noPost.png`
                }
                alt="User cover"
                className={style.profileCoverImage}
                loading="lazy"
              />
              <img
                src={
                  profileUser?.profilePicture
                    ? `${PF}person/${profileUser?.profilePicture}`
                    : `${PF}person/noAvtar.png`
                }
                alt="User Profile"
                className={style.profileUserImage}
                loading="lazy"
              />
            </div>
            <div className={style.profileInfo}>
              <h4 className={style.userName}>{profileUser?.username}</h4>
              <p className={style.userDescription}>{profileUser?.desc}</p>
            </div>
          </div>
          <div className={`${style.profileRightBottom} flex`}>
            <Feed page="profile" user={profileUser} posts={profilePosts} />
            <RightBarProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
