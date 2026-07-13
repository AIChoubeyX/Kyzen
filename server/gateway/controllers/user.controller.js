export const getCurrentUser = async (req, res) => {
  try {
      return res.status(200).json(req.user);

  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};