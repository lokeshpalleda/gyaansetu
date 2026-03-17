const Doubt = require("../models/Doubt");
const User = require("../models/User");
const analyzeDoubt = require("../utils/ai");


// STEP 1 — CREATE DOUBT
exports.createDoubt = async (req, res) => {

  try {

    const { userId, title, description } = req.body;

    const doubt = new Doubt({
      userId,
      title,
      description
    });

    await doubt.save();

    const past = await Doubt.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastQueries = past.map(d => d.description);

    const aiResult = await analyzeDoubt(pastQueries, description);

    res.json({
      doubtId: doubt._id,
      questions: aiResult.questions
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error creating doubt" });

  }

};



// STEP 2 — SUBMIT ANSWERS
exports.submitAnswers = async (req, res) => {

  try {

    const { doubtId, answers } = req.body;

    const doubt = await Doubt.findById(doubtId);

    if (!doubt) {
      return res.status(404).json({ message: "Doubt not found" });
    }

    doubt.answers = answers;
    await doubt.save();

    const past = await Doubt.find({ userId: doubt.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastQueries = past.map(d => d.description);

    const aiResult = await analyzeDoubt(
      pastQueries,
      doubt.description + " " + answers.join(" ")
    );

    await Doubt.findByIdAndUpdate(
  doubtId,
  {
    keywords: aiResult.keywords,
    masterSentence: aiResult.masterSentence,
    answers
  },
  { returnDocument: "after" }
);

    // 🔥 FIND MENTORS USING KEYWORDS
    const mentors = await User.find({
      skills: { $in: aiResult.keywords }
    });

    res.json({
      keywords: aiResult.keywords,
      summary: aiResult.masterSentence,
      mentors
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error submitting answers" });

  }

};