const personValidationSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'ssno', 'email'],
    properties: {
        firstName: {
            type: 'string',
            minLength: 2
        },
        lastName: {
            type: 'string',
            minLength: 2
        },
        ssno: {
            type: 'string',
            minLength: 11,
            format: 'regex',
            pattern: '[0-9]{11}'
        },
        email: {
            type: 'string',
            format: 'email'
        }
    }
};

module.exports = personValidationSchema;
