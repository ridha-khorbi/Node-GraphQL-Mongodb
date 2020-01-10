import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state'
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

const city = mongoose.model('city', citySchema);

export default city;