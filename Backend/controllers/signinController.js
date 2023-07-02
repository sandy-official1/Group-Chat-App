const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists with the provided email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key");
    const encryptedId = jwt.sign({ id: user.id }, "your-secret-key");

    // Send the JWT to the frontend
    res.status(200).json({ token, encryptedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while signin" });
  }
};
