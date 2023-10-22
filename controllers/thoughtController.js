const { Thought } = require("../Models")

const thoughtController = {
    getAll: async function(req, res){
        const thoughtData = await Thought.find()
        res.json(thoughtData)
    },
    getOne: async function(req, res){
        const thoughtData = await Thought.findById(req.params.userId)
        .populate("reactions")
        .populate("userName")
    res.json(thoughtData)
    }
}

module.exports = thoughtController