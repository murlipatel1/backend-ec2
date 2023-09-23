const express = require("express");
const Test = require("../models/Test");
const {body,validationResult} = require("express-validator");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();

router.post("/createtest",fetchuser,
  [
    body("values")
      .isArray({ min: 10, max: 10 })
      .custom((values) =>
        values.every(
          (value) => typeof value === "number" && value >= 0 && value <= 100
        )
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const percentageValues = req.body.values;
      const numericalValues = percentageValues.map((value) => value / 100);
      const averages = {
        bipolar_disorder: (numericalValues[0] + numericalValues[1]) / 2,
        eating_disorder: (numericalValues[2] + numericalValues[3]) / 2,
        anxiety_disorder: (numericalValues[4] + numericalValues[5]) / 2,
        prevalence_drug_disorder: (numericalValues[6] + numericalValues[7]) / 2,
        depressive_disorder: (numericalValues[8] + numericalValues[9]) / 2,
        user_id: req.user.id
      };

      const newTest = new Test(averages);
      await newTest.save();

      res
        .status(201)
        .json({ success: true, message: "Test created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);

router.get("/gettest", fetchuser,async (req, res) => {
  try {
    const tests = await Test.find({ user_id: req.user.id });

    const averages = tests.map((test) => ({
      bipolar_disorder: test.bipolar_disorder,
      eating_disorder: test.eating_disorder,
      anxiety_disorder: test.anxiety_disorder,
      prevalence_drug_disorder: test.prevalence_drug_disorder,
      depressive_disorder: test.depressive_disorder,
    }));

    res.status(200).json(averages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/gettest", async (req, res) => {
  try {
    const tests = await Test.find();

    const averages = tests.map((test) => ({
      bipolar_disorder: test.bipolar_disorder,
      eating_disorder: test.eating_disorder,
      anxiety_disorder: test.anxiety_disorder,
      prevalence_drug_disorder: test.prevalence_drug_disorder,
      depressive_disorder: test.depressive_disorder,
    }));

    res.status(200).json(averages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
