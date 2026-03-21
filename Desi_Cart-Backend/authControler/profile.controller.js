export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const userId = req.user.id; 
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
    res.status(500).json({ message: "Error updating profile" });
  }
};