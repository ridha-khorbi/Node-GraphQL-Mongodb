import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});



const state = mongoose.model('state', stateSchema);

export default state;