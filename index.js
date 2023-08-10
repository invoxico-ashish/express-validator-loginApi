const express = require("express");
const cors = require("cors");
const PORT = 8000;
const app = express();
const mongoDb = require("./Db")
mongoDb();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello backend");
});

app.use("/api",require("./Routes/CreateUser"));
// app.use("/api", require("./Routes/"))






app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is running on port ${PORT}`);
    }
    else {
        console.log(err);
    }
})

