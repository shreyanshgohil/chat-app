import { Router } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
const router = Router();

// create a post
router.post("/", async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated successfully");
    } else {
      res.status(403).json("you cannot modify others Post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post deleted succesfully");
    } else {
      res.status(403).json("You can not delete others post");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// like / dislike a post
router.put("/:id/like", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post liked succesfully");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post disliked sucessfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Likes user
router.get("/:id/like/users", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const likedUser = await Promise.all(
      post.likes.map(async (userId) => {
        const user = await User.findById(userId);
        const { password, createdAt, updatedAt, bookmark, ...others } =
          user._doc;
        return others;
      })
    );
    res.status(200).json(likedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get a post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    post && res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get timeline post
router.get("/timeline/:userId", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPost));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all post of user
router.get("/post/:userId", async (req, res, next) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    posts && res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(err).json(err);
  }
});



// Add a comment
router.put("/:id/comment", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const postData = {
        userId: req.body.userId,
        comment: req.body.comment,
      };
      await post.updateOne({ $push: { comments: postData } });
      res.status(200).json("comment added succesfully");
    } else {
      res.status(400).json("post not found");
    }
  } catch (err) {
    console.log(err);
    res.status(err).json(err);
  }
});

// Get all comments with user data
router.get("/:id/comments/all", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const postCommentsWithUser = await Promise.all(
      post.comments.map(async (comment) => {
        const commentText = comment.comment;
        const userData = await User.findById(comment.userId);
        const { password, createdAt, updatedAt, bookmark, ...others } =
          userData._doc;
        return { user: others, comment: commentText };
      })
    );
    res.status(200).json(postCommentsWithUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;
