import mongoose from "mongoose";

const bloodrequireSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    blood_group: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },

}, { timestamps: true })

export default mongoose.model('bloodrequire', bloodrequireSchema);