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

    // get past doubts
    const past = await Doubt.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastQueries = past.map(d => d.description);

    // AI generates clarification questions
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

    // save answers
    doubt.answers = answers;
    await doubt.save();

    // Extract keywords ONLY from title + description
    const text = `${doubt.title} ${doubt.description}`.toLowerCase();

    // simple keyword extraction
    const keywords = text
      .split(/[\s,.-]+/)
      .map(k => k.trim())
      .filter(k => k.length > 2);

    console.log("EXTRACTED KEYWORDS:", keywords);

    // ✅ create master sentence from doubt
    const masterSentence = `Need help with ${doubt.title}`;

    // save keywords + master sentence
    await Doubt.findByIdAndUpdate(
      doubtId,
      {
        keywords: keywords,
        masterSentence: masterSentence
      },
      { returnDocument: "after" }
    );

    // find mentors whose skills match keywords
    const mentors = await User.find({
      skills: {
        $elemMatch: {
          $regex: keywords.join("|"),
          $options: "i"
        }
      }
    });

    console.log("MENTORS FOUND:", mentors);

    res.json({
      keywords,
      mentors,
      masterSentence   // ✅ send to frontend
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting answers" });
  }
};