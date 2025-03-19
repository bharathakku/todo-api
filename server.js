require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, 
};
app.use(cors(corsOptions));

(async () => {
    try {
        await connectDB();

        app.get("/", (req, res) => {
            res.json({ message: "Todo API is running!" });
        });

        app.use("/api/todos", todoRoutes);

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(" Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
})();

const shutdown = async () => {
    console.log("\nShutting down server...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
