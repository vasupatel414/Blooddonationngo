import campModel from "../models/campModel.js";

export const campController = async (req, res) => {
    try {
        const { name, email, phone, date, time, address, addressLink } = req.body;

        //validation
        if (!name) {
            return res.send({ message: "name is Required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is required" });
        }
        if (!date) {
            return res.send({ message: "date is required" });
        }
        if (!time) {
            return res.send({ message: "time is required" });
        }
        if (!address) {
            return res.send({ message: "address is required" });
        }
        if (!addressLink) {
            return res.send({ message: "Address Link is Required" })
        }

        //check camp
        const exisitingCamp = await campModel.findOne({ date, time, address });

        if (exisitingCamp) {
            return res.status(200).send({
                success: false,
                message: "Already Register Camp details please Check in Donation Camp"
            })
        }

        //save
        const camp = await new campModel({
            name,
            email,
            phone,
            date,
            time,
            address,
            addressLink
        }).save();

        res.status(201).send({
            success: true,
            message: "CAmp Details Register Successfully",
            camp,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register Camp",
            error,
        })
    }
}


//get all donation camp details
export const getAllDonationCampDetails = async (req, res) => {
    try {
        const campdetails = await campModel.find({})
        res.status(200).send({
            success: true,
            counTotal: campdetails.length,
            message: "ALlProducts ",
            campdetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting products",
            error: error.message,
        });
    }
};

