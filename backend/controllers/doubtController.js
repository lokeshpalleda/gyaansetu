const Doubt = require("../models/Doubt");
const analyzeDoubt = require("../utils/ai");

// CREATE DOUBT (step 1)
exports.createDoubt = async (req, res) => {

  try {

    const { userId, title, description } = req.body;

    // create new doubt
    const doubt = new Doubt({
      userId,
      title,
      description
    });

    await doubt.save();

    // get last 5 doubts of this user
    const past = await Doubt.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastQueries = past.map(d => d.description);

    // run AI to generate clarification questions
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


// SUBMIT ANSWERS (step 2)
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

    // get past doubts
    const past = await Doubt.find({ userId: doubt.userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const pastQueries = past.map(d => d.description);

    // run AI again for keywords
    const aiResult = await analyzeDoubt(
      pastQueries,
      doubt.description + " " + answers.join(" ")
    );

    doubt.keywords = aiResult.keywords;
    doubt.masterSentence = aiResult.masterSentence;

    await doubt.save();

    res.json({
      keywords: aiResult.keywords,
      summary: aiResult.masterSentence
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error submitting answers" });

  }

};