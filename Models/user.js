const { Schema, model } = require("mongoose");

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
      match: [/.+@.+\..+/, "Invalid email format"],
    },

    // module: {
    //     rules: [
    //       {
    //         test: /\.css$/,
    //         use: ['style-loader', 'css-loader'],
    //       },
    //     ],

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
userNameSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("user", userNameSchema);

module.exports = User;
