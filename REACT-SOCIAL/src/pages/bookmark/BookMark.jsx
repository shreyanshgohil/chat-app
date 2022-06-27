import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import style from "./BookMark.module.css";
import RightBar from "../../components/rightbar/RightBarHome";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const BookMark = () => {
  // Inits
  const { user } = useContext(AuthContext);
  const [bookMarkPost, setBookMarkPost] = useState([]);

  // Geting app post of user
  useEffect(() => {
    try {
      const getBookMarkPostHandler = async () => {
        console.log("userId", user._id);
        const response = await axios.get(
          "http://localhost:8800/api/users/62b5de12232dfe1e1de115b5/bookmark/allpost"
        );
        setBookMarkPost(response.data);
      };
      getBookMarkPostHandler();
    } catch (err) {
      console.log(`error while fetching bookmarked poast ${err}`);
    }
  }, [user._id]);

  // JSX code
  return (
    <>
      <TopBar />
      <div className={`${style.bookmarkContainer} flex`}>
        <SideBar />
        <Feed page="home" user={user} posts={bookMarkPost} />
        <RightBar />
      </div>
    </>
  );
};

export default BookMark;
