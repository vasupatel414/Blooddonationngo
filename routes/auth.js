import express from "express"
import { forgotPasswordController, getAllDonorDetails, loginController, registerController, testController } from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";


//router object
const router = express.Router()

// routing 
// register
router.post('/register', registerController)

//login || post
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);


//protedced route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})


router.get("/get-all-donor", getAllDonorDetails);

export default router;