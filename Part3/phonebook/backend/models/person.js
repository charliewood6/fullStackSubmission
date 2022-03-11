const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url)
    .then(results => {
        console.log('Connected to the database');
    })
    .catch(error => {
        console.log(`Error connecting to database: ${error.message}`)
    })

const validator = (value) => {
    const format1 = /^\d{2,3}-\d{5,10}$/
    return (format1.test(value))
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: [validator, 'Invalid number format']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
