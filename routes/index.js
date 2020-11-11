const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Validator, ValidationError } = require('express-json-validator-middleware');

const createCustomerAndQuote = require('../lib/backend');

const vehicleValidationSchema = require("../validators/vehicle");
const personValidationSchema = require("../validators/person");

const validator = new Validator({allErrors: true});

const bodySchema = {
    type: 'object',
    required: ['person', 'vehicle'],
    properties: {
        person: personValidationSchema,
        vehicle: vehicleValidationSchema
    }
}

router.use(bodyParser.json());

/* GET home page. */
router.post('/applications',
    validator.validate({ body: bodySchema }),
    function(req, res, next) {
      createCustomerAndQuote(req.body.person, req.body.vehicle)
          .then(data => {
              res.json(data);
          })
          .catch(error => {
              console.error(error);
              res.status(500).send(`An error occurred, but it's totally our fault. Please contact us if the error persists.`);
          })
    });

router.use(function (error, req, res, next) {
    if (error instanceof ValidationError) {
        console.error('Failed validating request data against schema');
        console.error(req.body);
        console.error(error.validationErrors);
        res.status(400).send('Invalid data');
    } else {
        next(error);
    }
})

module.exports = router;
