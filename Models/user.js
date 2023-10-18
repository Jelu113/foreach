const { Schema, model } = require('mongoose');
const thought = require('./Thought')

const userNameSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,

        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Invalid email format'
            }
        },
         thoughts: [thought], //This will need something more. How to self reference as well?
    },
    //learn what a virtual is. 
    {

        toJSON: {
            getters: true
        },

    }
);



// Initialize our User model
const User = model('user', userNameSchema);

module.exports = User;



// -thoughts
// Array of _id values referencing the Thought model

// -friends
// Array of _id values referencing the User model (self-reference)

// --Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.



module.exports = User;