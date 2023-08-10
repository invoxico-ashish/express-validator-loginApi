const express = require("express");
const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/user_sign_up";

const mongoDb = async () => {
    await mongoose.connect(URI, async (err, res) => {
        if (!err) {
            console.log("Connected");
            const fetchData = await mongoose.connection.db.collection("user");
            fetchData.find({}).toArray(function (err, data) {
                if (err) {
                    console.log(err, "there is and error")
                }
                else {
                    console.log(data);
                }
            })
        }
        else {
            console.log(err, "not connected");
        }
    });
}
module.exports = mongoDb;