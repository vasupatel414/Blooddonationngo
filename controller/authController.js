import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, blood_group, answer, role } = req.body;
        //validations
        if (!name) {
            return res.send({ message: "name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!blood_group) {
            return res.send({ message: "blood_group is Required" });
        }
        if (!answer) {
            return res.send({ message: "answer is Required" });
        }
        if (!role) {
            return res.send({ message: "role is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            blood_group,
            answer,
            role,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address,
                blood_group: user.blood_group,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newPassword is required" })
        }

        //check
        const user = await userModel.findOne({ email, answer })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};




//get all donors
export const getAllDonorDetails = async (req, res) => {
    try {
        const donordetails = await userModel.find({})
        res.status(200).send({
            success: true,
            counTotal: donordetails.length,
            message: "ALlProducts ",
            donordetails,
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