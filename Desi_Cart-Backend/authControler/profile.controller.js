export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const userId = req.user.id;

    let images = null; // ✅ FIX

    if (req.file) {
      images = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const updatedUser = await userProfile.findOneAndUpdate(
      { userId: userId },
      {
        name,
        email,
        phone,
        address,
        images
      },
      {
        new: true,
        upsert: true
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      data: updatedUser
    });

  } catch (error) {
    console.log("ERROR:", error); // 🔥 add this for debugging
    res.status(500).json({ message: "Error updating profile" });
  }
};