import express from "express";
import User  from "../models/userModel.js"; // Your existing User model
import Quiz  from "../models/quizModel.js"; // Your existing Quiz model
const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
    // Count total users
    const totalUsers = await User.countDocuments();

    // Count total quizzes
    const totalQuizzes = await Quiz.countDocuments();

    // Sum total attempts
    const totalAttempts = await Quiz.aggregate([
      { $group: { _id: null, totalAttempts: { $sum: "$attempts" } } },
    ]);

    // Calculate pass rate (this example assumes you have pass data in quizzes)
    const passRateData = await Quiz.aggregate([
      { $group: { _id: null, totalPasses: { $sum: "$passes" }, totalAttempts: { $sum: "$attempts" } } },
    ]);
    const passRate = passRateData.length
      ? ((passRateData[0].totalPasses / passRateData[0].totalAttempts) * 100).toFixed(2)
      : 0;

    // Prepare the response
    res.json({
      users: totalUsers,
      quizzes: totalQuizzes,
      attempts: totalAttempts.length ? totalAttempts[0].totalAttempts : 0,
      passRate,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
