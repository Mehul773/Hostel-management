const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectUser = async (req, res, next, role) => {
  try {
    const _token = req.cookies._token;

    if (!_token) {
      return res.status(401).json({ message: "Token does not exists" });
    }
    const verifiedUser = jwt.verify(_token, process.env.JWT_SECRET);

    root_user = await User.findOne({
      _id: verifiedUser._id,
    });

    if (role === undefined) {
      // Open for all 3
      req.user = root_user;
      next();
    } else if (role && root_user.role === role) {
      // Open for specific
      req.user = root_user;
      next();
    }else if(role=="Both" && (root_user.role === "Rector" || root_user.role === "Accountant")){
      // Open for both Rector and Accountant
      req.user = root_user;
      next();
    } 
    else {
      // Else
      // Open for all will not have any protection
      res.status(401).json({ message: "Authorization failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Authorization failed" });
  }
};

module.exports = { protectUser };
