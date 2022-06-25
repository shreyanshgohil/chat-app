import style from "./Feed.module.css";
import Share from "../share/Share";
import Post from "../post/Post";

const Feed = (props) => {
  // Inits
  const { page } = props;
  const { posts } = props;

  // Display data
  return (
    <div
      className={page === "home" ? `${style.feedHome}` : `${style.feedProfile}`}
    >
      <div className={style.feedWrapeer}>
        <Share />
        {posts.map((post) => {
          return <Post key={post._id} post={post} page="home" />;
        })}
      </div>
    </div>
  );
};

export default Feed;
