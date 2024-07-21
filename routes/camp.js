import express from "express"
import { campController, getAllDonationCampDetails } from "../controller/campController.js"


//router object
const router = express.Router()

router.post('/donationcampform', campController)

router.get('/get-all-camp-details', getAllDonationCampDetails);

export default router;