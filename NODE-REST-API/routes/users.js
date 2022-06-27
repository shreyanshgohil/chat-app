import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Post from "../models/Post.js";

// updateuser
router.put("/:id", async (req, res, next) => {
  if (req.params.id == req.body.userId || req.body.idAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(400).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json("Account is updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

// delete user
router.delete("/:id", async (req, res, next) => {
  if (req.body.userId == req.params.id || req.body.idAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      console.log(user);
      res.status(200).json("Your account is deleted");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } else {
    res.status(403).json("Please delete only your account");
  }
});

// get a user
router.get("/", async (req, res, next) => {
  const userId = req.query.userId;
  const userName = req.query.userName;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: userName });
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow a user
router.put("/:id/follow", async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been follwed");
      } else {
        res.status(403).json("you alrady follwed that user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow your self");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res, next) => {
  if (req.body.userId !== req.params.id) {
    try {
      const currentUser = await User.findById(req.body.userId);
      const user = await User.findById(req.params.id);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been follwed");
      } else {
        res.status(403).json("you alrady unfollwed that user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow your self");
  }
});

// Add and remove post to book mark

router.put("/:id/bookmark", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const postId = req.body.postId;
    if (!user.bookmark.includes(postId)) {
      await user.updateOne({ $push: { bookmark: postId } });
      res.status(200).json("post added from bookmark succesfully");
    } else {
      await user.updateOne({ $pull: { bookmark: postId } });
      res.status(200).json("post removed from bookmark succesfully");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all bookmark post of user
router.get("/:id/bookmark/allpost", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const posts = await Promise.all(
      user.bookmark.map((singlePost) => Post.findById(singlePost))
    );
    user && res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
export default router;
