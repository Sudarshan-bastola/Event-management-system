import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    registration: {
      type: Schema.Types.ObjectId,
      ref: "Registration",
      required: [true, "Registration is required"],
      unique: true, // one payment per registration
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "eSewa", "Khalti", "Card"],
      required: [true, "Payment method is required"],
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    transactionId: {
      type: String,
      trim: true, // removes extra spaces from transaction id

      validate: {
        validator: function (value) {
          // this = current payment document
          // value = transaction id
          // this.paymentMethod = payment method of current payment
          // check if payment method is eSewa, Khalti, or Card
          if (["eSewa", "Khalti", "Card"].includes(this.paymentMethod)) {

            // return true if transactionId exists
            // return false if transactionId is empty or missing
            return !!value;
          }

          // if payment method is Cash, transactionId is not required
          return true;
        },

        // show this message if transactionId is missing for online payments
        message: "Transaction ID is required for eSewa, Khalti, and Card payments",
      }


    },
  },
  {
    timestamps: true,
  }
);

export default model("Payment", paymentSchema);