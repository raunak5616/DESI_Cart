import mongoose from "mongoose";

const userProfileModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    images: {
  url: String,
    public_id: String
}
});

const  userProfile = mongoose.model("userProfile", userProfileModel);

export default userProfile;