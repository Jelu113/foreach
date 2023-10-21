const { User } = require("../Models")

const userController = {
    getAll: async function (req, res) {
        const userData = await User.find()
        res.json(userData)
    },
    getOne: async function (req, res) {
        const userData = await User.findById(req.params.userId)
            .populate("thoughts")
            .populate("friends")
        res.json(userData)
    },
    deleteUser: async function (req, res) {
        try {
            const userId = req.params.userId;

            const userDelete = await User.deleteOne({ _id: userId });
            if (userDelete.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            await Thought.deletMany({ user: userId });

            res.json({ message: 'User and associated thoughts deleted successfully' });

        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" })
        }

    },
    updateUser: async function (req, res) {
        try {
            const userId = req.params.userId;
            const updateData = req.body; // The data you want to update

            // Use findByIdAndUpdate to update the user
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found.' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    newUser: async function (req, res) {
        try {
            const userData = req.body; // The user data you want to create
            const newUser = await User.create(userData);
            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

};

module.exports = userController