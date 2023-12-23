import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, addUpdateSetting } from "../models/hooks.js";
// import gravatar from "gravatar";
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // avatars: {
    //   type: String,
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
// contactsSchema.pre("save", async function (next) {
//   if (!this.avatars) {
//     this.avatars = gravatar.url(this.email, {
//       s: "250",
//       r: "pg",
//       d: "identicon",
//     });
//   }
//   next();
// });
contactsSchema.post("save", handleSaveError);
contactsSchema.pre("findOneAndUpdate", addUpdateSetting);
contactsSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
export const contactUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
export const contactUpdateFavoritesSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactsSchema);

export default Contact;
