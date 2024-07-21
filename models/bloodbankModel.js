import mongoose from "mongoose";

const bloodbankSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Blood_group: {
        type: Object,
        required: true
    }

}, { timestamps: true })

export default mongoose.model('bloodbank', bloodbankSchema);