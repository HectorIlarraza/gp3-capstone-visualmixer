// DEPENDENCIES
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../validations/jwt-helpers");
const sendConfirmationEmail = require("../validations/sendEmail.js");
const refreshCookie = require("../validations/refreshCookie");

// ENVIRONMENTAL VARS
require("dotenv").config();

// QUERIES
const {
    addUser,
    deleteUser,
    getUserByEmail,
    updateUser,
    getUserById,
    updateUserVotes,
    resetVotes,
    updateUserValidation,
    getUserByUserName,
} = require("../queries/users.js");

// CONFIGURATION
const user = express.Router();

// REGISTER REQUEST
user.post("/register", async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // CHECK IF EMAIL IS IN USE
        let dbUserEmail = await getUserByEmail(email);

        if (dbUserEmail.user_id) {
            return res.status(400).json({
                email: "User with that email already exists.",
            });
        }

        // CHECK IF USERNAME IS IN USE
        let dbUser = await getUserByUserName(username);

        if (dbUser.user_id) {
            return res.status(400).json({
                username: "User with that username already exists.",
            });
        }

        // HASH PASSOWRD
        const hashPassword = await bcrypt.hash(password, 10);

        // TOKEN FOR EMAIL AUTHORIZATION
        const token = await (await bcrypt.hash(username, 2))
            .replace("/", "")
            .slice(0, 10);

        const newUser = await addUser(username, email, hashPassword, token);

        // NODEMAILER FUNCTION TO SEND OUT EMAIL
        sendConfirmationEmail(newUser, token);

        // JWT TOKEN
        res.locals.tokens = jwtTokens(newUser);
        next();

    } catch (err) {
        res.status(404).send("Post failed");
    }
}, refreshCookie);

// LOGIN REQUEST
user.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // GET USER DETAILS
        const user = await getUserByEmail(email);
        if (!user.email) {
            res.status(400).json({
                error: "email",
                errorMsg: "Incorrect email, please try again.",
            });
        } else {
            // DECRYPT PASSWORD
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (isValidPassword) {
                // JWT TOKEN
                res.locals.tokens = jwtTokens(user);
                next(); 
            } else {
                res.status(400).json({
                    error: "password",
                    errorMsg: "Incorrect Password, please try again.",
                });
            }
        }
    } catch (error) {
        res.status(404).json({ error: error });
    }
}, refreshCookie);

user.get("/refresh_token", (req, res, next) => {
    try {
        // USE REFRESH TOKEN TO GET NEW ACCESS TOKEN
        const refresh_token = req.cookies.refresh_token;

        if (!refresh_token) {
            return res.status(401).json({ error: "Null refresh token" });
        }

        jwt.verify(refresh_token, process.env.REFRESH_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({ error: error.message });
            }

            // JWT TOKEN
            res.locals.tokens = jwtTokens(user);
            next();
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}, refreshCookie);

// RESET VOTES
user.get("/reset", async (req, res) => {
    try {
        const reset = await resetVotes();
        res.status(200).json({ success: "completed" });
    } catch (error) {
        res.status(404).json({ error: "unable to reset votes" });
    }
});

//GET USER INFO
user.get("/:id", async (req, res) => {
    const id = req.params;
    try {
        const user = await getUserById(id.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});

// UPDATE A USER
user.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const user = await getUserById(id);
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedUser = await updateUser(user, hashPassword);

        res.status(202).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: "Update was unsuccessful." });
    }
});

// UPDATE USER'S VOTES
user.put("/votes/:id/:votes", async (req, res) => {
    const { id, votes } = req.params;
    try {
        const updatedUser = await updateUserVotes(votes, id);

        res.status(202).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: "Update was unsuccessful." });
    }
});

// PATCH USER VALIDATION
user.patch("/verify/:id", async (req, res) => {
    const { id } = req.params;
    try {
        let updated = await updateUserValidation(id);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: "Unable to update validation on user" });
    }
});

// LOGOUT FUNCITONALITY
user.delete("/refresh_token", (req, res) => {
    try {
        res.clearCookie("refresh_token");
        return res.status(200).json({ message: "refresh token deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE A USER
user.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(404).json({ error: "User was not found" });
    }
});

module.exports = user;
