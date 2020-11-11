const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.post('/applications',
    express.json(),
    body('person.firstName').isLength({ min: 20}),
    function(req, res, next) {
      console.info(req.body);
      res.json({});
    });

module.exports = router;
