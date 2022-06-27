import style from "./Post.module.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Post = (props) => {
  // Inits
  const { user } = useContext(AuthContext);
  const { post } = props;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(
    post.likes.find((userId) => userId === user._id)
  );
  const [postUser, setPostUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isBookmarkedPost, setBookmarkedPost] = useState(
    user?.bookmark?.find((postId) => postId === post._id)
  );

  // Likes and dislikes
  const likeHandler = async () => {
    await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, {
      userId: user._id,
    });
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // Getting a user of the post

  useEffect(() => {
    const getPostUserHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users?userId=${post.userId}`
        );
        setPostUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPostUserHandler();
  }, [user._id]);

  const addBookMarkHandler = async () => {
    try {
      setBookmarkedPost(!isBookmarkedPost);
      await axios.put(`http://localhost:8800/api/users/${user._id}/bookmark`, {
        postId: post?._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={style.post}>
      <div className={style.postWrapper}>
        <div className={style.postTop}>
          <div className={style.postTopLeft}>
            <Link
              to={`/profile/${postUser?.username}`}
              className={style.profileLink}
            >
              <img
                src={
                  postUser?.profilePicture
                    ? `${PF}person/${postUser?.profilePicture}`
                    : PF + "person/noAvtar.jpeg"
                }
                alt="User profile"
                className={style.profileImage}
                loading="lazy"
              />
              <span className={style.userName}>{postUser?.username}</span>
            </Link>
            <p className={style.timeAgoText}>{format(post.createdAt)}</p>
          </div>
          <div className={style.postTopRight}>
            <MoreVert className={style.moreVertLogo} />
          </div>
        </div>
        <div className={style.postCenter}>
          <span className={style.postTitle}>{post?.desc}</span>
          <img
            src={post?.img ? `${PF}post/${post?.img}` : PF + "post/noPost.png"}
            alt="Post"
            className={style.postImage}
            loading="lazy"
          />
        </div>
        <div className={style.postBottom}>
          <div className={style.postBottomLeft}>
            {!isLiked ? (
              <FavoriteBorderIcon
                onClick={likeHandler}
                className={style.likeImage}
              />
            ) : (
              <FavoriteIcon onClick={likeHandler} className={style.likeImage} />
            )}

            <span className={style.noLikes}>{like} people like it</span>
          </div>
          <div className={style.postBottomRight}>
            <span className={style.noPost}>{post.comment} comments</span>

            {isBookmarkedPost ? (
              <BookmarkIcon
                className={style.bookMarkIcon}
                onClick={addBookMarkHandler}
              />
            ) : (
              <BookmarkBorderIcon
                className={style.bookMarkIcon}
                onClick={addBookMarkHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
