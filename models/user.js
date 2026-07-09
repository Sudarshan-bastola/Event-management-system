import { Schema, model } from "mongoose";
import { hash } from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (email) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email address",
      },
    },

   password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [8, "Password must be at least 8 characters long"],
  validate: {
    validator: function (pwd) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);
    },
    message:
      "Password must contain uppercase, lowercase, number, and special character",
  },
},

    phone: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "organizer", "attendee"],
      default: "attendee",
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {
  // runs before saving user
  // used in create() or save()

  // if password is new or changed
  if (this.isModified("password")) {
    // hash plain password before storing in db
    this.password = await hash(this.password, 10);
  }
});

userSchema.pre("findOneAndUpdate", async function () {
  // runs before updating user with findOneAndUpdate() / findByIdAndUpdate()

  // this.getUpdate() gives update object
  // example: { password: "abc12345" }

  // if password exists inside update object
  if (this.getUpdate().password) {
    // hash updated password before saving in db
    this.getUpdate().password = await hash(this.getUpdate().password, 10);
  }
});


export default model("User", userSchema);