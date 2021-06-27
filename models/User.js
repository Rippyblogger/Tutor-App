const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ["admin", "tutor", "student", "not assigned"],
        default: "not assigned"
    },
    isTutor: {
        type: Boolean,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: 0
    },

},
{
        timestamps: true
    })

    
    module.exports =  mongoose.model( 'User' , userSchema)