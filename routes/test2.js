const express = require("express");
const Test2 = require("../models/Test2");
const {body,validationResult} = require("express-validator");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();


router.post(
    "/createtest2",fetchuser,
    [
      body("value1").isNumeric(),
      body("value2").isNumeric(),
      body("value3").isNumeric(),
      body("value4").isNumeric(),
      body("value5").isNumeric(),
      body("value6").isNumeric(),
      body("value7").isNumeric(),
      body("value8").isNumeric(),
      body("value9").isNumeric(),
      body("value10").isNumeric(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const {
          value1,
          value2,
          value3,
          value4,
          value5,
          value6,
          value7,
          value8,
          value9,
          value10,
        } = req.body;
  
        const avg_value =
          (value1 + value2 + value3 + value4 + value5 + value6 + value7 + value8 + value9 + value10) / 10;
  
        const test2 = new Test2({
          user_id: req.user.id, 
          value1,
          value2,
          value3,
          value4,
          value5,
          value6,
          value7,
          value8,
          value9,
          value10,
          avg_value,
        });
  
        await test2.save();
  
        res.json(test2);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    }
  );

module.exports = router;
