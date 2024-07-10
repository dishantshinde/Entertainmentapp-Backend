const User = require("../model/userModel");

module.exports.addBookmarked = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { bookmarkedContent } = user;
      const movieAlreadBookmarked = bookmarkedContent.find(
        ({ id }) => id === data.id
      );
      if (!movieAlreadBookmarked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            bookmarkedContent: [...user.bookmarkedContent, data],
          },
          { new: true }
        );
      } else
        return res.json({ msg: "content already added to bookmarked list" });
    } else await User.create({ email, bookmarkedContent: [data] });
    return res.json({ msg: "content added successfully" });
  } catch (error) {
    return res.json({ msg: "error adding content" });
  }
};
module.exports.getBookmarked = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({
        msg: "successfully fetched bookmarks",
        content: user.bookmarkedContent,
      });
    } else {
      res.json({ msg: "user with given email not found" });
    }
  } catch (error) {
    console.log("error getting bookmarked content", error);
  }
};
module.exports.removeBookmarked = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { bookmarkedContent } = user;
    const movieIndex = bookmarkedContent.findIndex(({ id }) => id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ msg: "Movie not found in bookmarks" });
    }

    bookmarkedContent.splice(movieIndex, 1);
    await User.findByIdAndUpdate(user._id, { bookmarkedContent });

    return res.json({ msg: "Content removed successfully" });
  } catch (error) {
    console.error("Error removing movie:", error);
    return res.status(500).json({ msg: "Error removing movie" });
  }
};
