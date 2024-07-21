import bloodrequireModel from "../models/bloodrequireModel.js"

export const bloodrequireController = async (req, res) => {
    try {
        const { pname, phone, blood_group, unit } = req.body;
        //validations
        if (!pname) {
            return res.send({ message: "pname is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!blood_group) {
            return res.send({ message: "blood_group is Required" });
        }
        if (!unit) {
            return res.send({ message: "unit is Required" });
        }

        //save
        const requirement = await new bloodrequireModel({
            pname,
            phone,
            blood_group,
            unit
        }).save();

        res.status(201).send({
            success: true,
            message: "Requirement Register Successfully",
            requirement,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Requirement",
            error,
        });
    }
}

export const getAllRequirement = async (req, res) => {
    try {
        const bloodrequirementdetails = await bloodrequireModel.find({})
        res.status(200).send({
            success: true,
            counTotal: bloodrequirementdetails.length,
            message: "ALlProducts ",
            bloodrequirementdetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in getting requirement",
            error: error.message,
        });
    }
}


//get a single requirement
export const getSingleRequirement = async (req, res) => {
    try {
        const singlebloodrequirementdetails = await bloodrequireModel.find({}).sort({ _id: -1 }).limit(1)
        res.status(200).send({
            success: true,
            counTotal: singlebloodrequirementdetails.length,
            message: "Get A Single Requirement",
            singlebloodrequirementdetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting  requirement",
            error: error.message,
        })
    }
}