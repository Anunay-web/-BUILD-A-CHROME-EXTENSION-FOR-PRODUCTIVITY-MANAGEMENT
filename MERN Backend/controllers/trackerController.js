const Usage = require('../models/Usage');

exports.logUsage = async (req, res) => {
  const { domain, timeSpent } = req.body;
  try {
    const usage = new Usage({ domain, timeSpent });
    await usage.save();
    res.status(200).json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const report = await Usage.aggregate([
      { $match: { date: { $gte: today } } },
      { $group: { _id: "$domain", totalTime: { $sum: "$timeSpent" } } }
    ]);
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
