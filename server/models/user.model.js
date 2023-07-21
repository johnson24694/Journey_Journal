const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
    name: { type: String,
            required: [true, "You must enter in a name."],
            minlength: [2, "Name must be at least 2 characters."]
        },

    email: { type: String,
        required: [true, "You must enter in an email."],
        validate:[isEmail, "Invalid Email"],
        minlength: [2, "Email must be at least 2 characters."]
    },
    
    password: { type: String,
        required: [true, "You must enter in a password."],
        minlength: [8, "Password must be at least 8 characters."]
    },
    
   },
{timestamps: true });

//* Middleware
UserSchema.virtual("confirmPassword")
   .get(() => this.confirmPassword)
   .set(value => this.confirmPassword = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next();
})

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);