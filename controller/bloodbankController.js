import bloodbankModel from "../models/bloodbankModel.js";

//get all blood bank details
export const bloodbankController = async (req, res) => {
    try {
        const bloodbankdetails = await bloodbankModel.find({})
        res.status(200).send({
            success: true,
            counTotal: bloodbankdetails.length,
            message: "Get All Blood Bank details ",
            bloodbankdetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
}


