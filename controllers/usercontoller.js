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
            await Thought.deleteMany({ user: userId });

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
    addFriend: async function (req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;

            // Find the user and friend by their IDs
            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found.' });
            }

            // Check if the friend is already in the user's friend list
            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend already added.' });
            }

            // Add the friend's ID to the user's friend list
            user.friends.push(friendId);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    removeFriend: async function (req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;

            // Find the user and friend by their IDs
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            // Check if the friend is in the user's friend list
            if (!user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'Friend not found in user\'s friend list.' });
            }

            // Remove the friend's ID from the user's friend list
            user.friends = user.friends.filter(id => id.toString() !== friendId);
            await user.save();

            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};
    
module.exports = userController