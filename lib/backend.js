const axios = require('axios');

const createCustomer = (personData) => new Promise((resolve, reject) => {
    // Mock talking to backend by passing required personData to the backend and expecting a response of sorts back
    // Flesh out with axios calls, handle errors by rejecting the promise and bubble up

    setTimeout(() => {
        resolve({
            status: 'created',
            customerNumber: '123',
            data: personData
        })
    }, 1500);
});

const createQuote = (customerData, vehicleData) => new Promise((resolve, reject) => {
    // Mock talking to backend by passing required customer and vehicle data to the backend and expecting a response of sorts
    // Flesh out with axios calls, handle errors by rejecting the promise and bubble up

    setTimeout(() => {
        resolve({
            status: 'quote_created',
            quoteNumber: '123-1',
            data: vehicleData
        })
    }, 1500);
});

const generateAndSendLetter = (letterData) => new Promise((resolve, reject) => {
    // Mock talking to letter-generating backend by passing required data for a letter, such as email address, quote number, name and vehicle registration number

    setTimeout(() => {
        resolve({ status: 'sent' });
    }, 1000);
});

const setQuoteStatusLetterSent = (customerData, quoteData) => new Promise((resolve, reject) => {
    // Mock the backend call updating the customer quote status

    setTimeout(() => {
        resolve({
            ... quoteData,
            status: 'letter_sent',
        })
    })
});

const createCustomerAndQuote = (personData, vehicleData) => new Promise((resolve, reject) => {
    let createdCustomer,
        createdQuote;

    createCustomer(personData)
        .then(customerData => {
            createdCustomer = customerData;

            return createQuote(customerData, vehicleData);
        })
        .then(quoteData => {
            createdQuote = quoteData;

            const letterData = {
                name: `${createdCustomer.data.firstName} ${createdCustomer.data.lastName}`,
                email: createdCustomer.data.email,
                quoteNumber: createdQuote.quoteNumber,
                vehicleRegistrationNumber: createdQuote.data.vehicleRegistrationNumber
            }

            return generateAndSendLetter(letterData);
        })
        .then(() => setQuoteStatusLetterSent(createdCustomer, createdQuote))
        .then((quoteData) => {
            createdQuote = quoteData;

            resolve({
                customer: createdCustomer,
                quote: createdQuote
            })
        })
        .catch(error => {
            console.error('An error occurred creating the customer or quote data');
            console.error(error);
            reject(error);
        })
});

module.exports = createCustomerAndQuote;