import React, { useContext, useState, useEffect } from "react";
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
    const getBookMarkPostHandler = async () => {
      const response = await axios.get(
        `http://localhost:8800/api/users/${user._id}/bookmark`
      );
      setBookMarkPost(response.data);
    };
    getBookMarkPostHandler();
  }, []);

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
