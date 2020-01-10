import mongoose from 'mongoose';

const propertyTypesSchema = new mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String,
        required: true,
        enum: ['residential', 'commercial', 'agricultural']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date
    }
});



const propertyType = mongoose.model('propertyTypes', propertyTypesSchema);

export default propertyType;