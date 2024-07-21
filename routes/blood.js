import express from "express"
import { bloodrequireController, getAllRequirement, getSingleRequirement } from "../controller/bloodrequireController.js";
import { bloodbankController } from "../controller/bloodbankController.js";


//router object
const router = express.Router()

router.post('/bloodrequire', bloodrequireController)
router.get('/get-all-requirement', getAllRequirement)
router.get("/get-single-requirement", getSingleRequirement);

router.get('/bloodbank', bloodbankController);
export default router;

