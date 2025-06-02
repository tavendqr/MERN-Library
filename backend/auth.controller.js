import User from "./user.models.js";

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      data: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const signUpUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
         return res.status(400).json({ success: false, message: "Please fill all fields" });

    }

    try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username already exists" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Sign up failed" });
  }
};
