const vehicleValidationSchema = {
    type: 'object',
    required: ['registrationNumber', 'bonusLevel'],
    properties: {
        registrationNumber: {
            type: 'string',
            format: 'regex',
            pattern: '[A-Z]{2}[0-9]{5}',
            minLength: 7,
            maxLength: 7
        },
        bonusLevel: {
            type: 'string',
            enum: ['30', '40', '50', '60', '70', '75', '75-1', '75-2', '75-3', '75-4', '75-5', '80']
        }
    }
};

module.exports = vehicleValidationSchema;
