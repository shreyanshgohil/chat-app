import style from "./Home.module.css";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBarHome";
import SideBar from "../../components/sidebar/SideBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Home = () => {
  // Inits
  const { user } = useContext(AuthContext);
  const [homePost, setHomePost] = useState([]);

  // Featching posts which need to display on home page
  useEffect(() => {
    const homePostFetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/posts/timeline/${user?._id}`
        );
        setHomePost(response.data);
      } catch (err) {
        console.log("Error occured during fetch of home page products", err);
      }
    };
    homePostFetchHandler();
  }, []);

  return (
    <>
      <TopBar />
      <div className={style.homeContainer}>
        <SideBar />
        <Feed page="home" user={user} posts={homePost} />
        <RightBar />
      </div>
    </>
  );
};

export default Home;
