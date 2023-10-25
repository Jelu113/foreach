const { Thought } = require("../Models");
const { User } = require("../Models");

const thoughtController = {
  getAll: async function (req, res) {
    const thoughtData = await Thought.find();
    res.json(thoughtData);
  },
  getOne: async function (req, res) {
    const thoughtData = await Thought.findById(req.params.userId)
      .populate("reactions")
      .populate("userName");
    res.json(thoughtData);
  },
  createThought: async function (req, res) {
    try {
      const { thoughtText, userName, userId } = req.body;

      // Create a new thought and associate it with a user
      const newThoughtData = {
        thoughtText,
        userName,
        userId,
      };

      const newThought = await Thought.create(newThoughtData);

      //update the user's document to add the thought's ID to their thoughts array
      const thoughtId = newThought._id;

      await User.updateOne({ _id: userId }, { $push: { thoughts: thoughtId } });

      res.status(201).json(newThought);
    } catch (error) {
      res.status(500).json({ error: "Failed to create a new thought." });
    }
  },
  updateThought: async function (req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const updatedThoughtData = req.body; // This should contain the updated data

      // Use the findByIdAndUpdate method to update the thought by its _id
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        updatedThoughtData,
        { new: true } // This option returns the updated thought
      );

      if (!updatedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ error: "Failed to update the thought." });
    }
  },
  removeThought: async function (req, res) {
    try {
      const thoughtId = req.params.thoughtId;

      // Use the findByIdAndRemove method to delete the thought by its _id
      const removedThought = await Thought.findByIdAndRemove(thoughtId);

      if (!removedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      // Optionally, you can remove the thought's reference from the user's thoughts array
      await User.updateOne(
        { _id: removedThought.userId },
        { $pull: { thoughts: thoughtId } }
      );

      res.json(removedThought);
    } catch (error) {
      res.status(500).json({ error: "Failed to remove the thought." });
    }
  },
};

module.exports = thoughtController;
