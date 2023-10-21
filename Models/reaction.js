const { Schema, model } = require('mongoose');

// -reactionId
// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        userName: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);



module.exports = reactionSchema;
// --Reaction (SCHEMA ONLY)






// Use a getter method to format the timestamp on query

// --Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

