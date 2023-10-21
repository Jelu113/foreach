const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id:false,
    }
);
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
thoughtSchema.virtual('formattedCreatedAt').get(function(){
    const options = {
        year: 'numeric',
         month: 'long', 
         day: 'numeric', 
         hour: '2-digit', 
         second: '2-digit'
    }; return this.createdAt.toLocaleDateString('en-US',options);
})

const Thought = model('thought', thoughtSchema);
// Use a getter method to format the timestamp on query

// -reactions (These are like replies)
// Array of nested documents created with the reactionSchema   FROM THE REACTION.JS

// --Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;