const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSec = "poiuytrewqasdfghjklmnbvcxzasdfe%^"


router.post("/createuser",
    [
        body("name").isLength({ min: 5 }),
        body("email", "Incorrect Email").isEmail(),
        body("password", "Incorrect Password").isLength({ min: 5 })
    ], async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.status(200).json({ Success: true })
        }
        catch (err) {
            if (err) {
                res.status(400).json({ Success: false });
                console.log(err)
            }
        }

    });


router.post("/loginuser",
    [
        body("email", "Incorrect Email").isEmail(),
        body("password", "Invalid Password").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!email) {
                return res.status(400).json({ errors: "Invalid email" })
            }
            let comPass = await bcrypt.compare(req.body.password, userData.password)
            if (!comPass) {
                return res.status(400).json({ errors: "Invalid pass" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSec);
            return res.json({ Success: "true", authToken: authToken });
        }
        catch (err) {
            console.log(err);
            res.json({ Success: "false" });

        }

    })





module.exports = router;