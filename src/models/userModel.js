import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   /* name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
        },
    ],*/


    fname: {
        type: String,
       // required: true
    },
    lname: {
        type: String,
       // required: true
    },
    email: {
        type: String,
        unique: true,
     required: true
    },
    phoneNo: {
        type: String,
        unique: true,
       // required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    pincode: {
        type: Number
    },
    userType: {
        type: Number,
        default: 1
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }


});

userSchema.pre('save', function() {
    const hashedPassword = bcrypt.hashSync(this.password, 12);
    this.password = hashedPassword;
});

const user = mongoose.model('user', userSchema);

export default user;
