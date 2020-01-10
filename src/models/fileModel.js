import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({

    path: {
        type: String,

    },
    filename:{
        type: String,

    },
    mimetype: {
        type: String,

    },
    encoding: {
        type: String,

    },

});



const file = mongoose.model('file', fileSchema);

export default file;