const { User } = require("../Models")

const userController = {
    getAll: async function(req, res){
        const userData = await User.find()
        res.json(userData)
    },
    getOne: async function(req, res){
        const userData = await User.findById(req.params.userId)
        .populate("thoughts")
        .populate("friends")
        res.json(userData)
    }
}








module.exports = userController