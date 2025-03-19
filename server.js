require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// ✅ Logging Middleware (Placed First for Better Debugging)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ✅ Middleware
app.use(express.json());

// ✅ CORS Configuration (Supports Authentication)
const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Allows cookies & authentication headers
};
app.use(cors(corsOptions));

// ✅ Database Connection (Prevents Server Start if DB Fails)
(async () => {
    try {
        await connectDB();

        // ✅ Root Route (Basic API Info)
        app.get("/", (req, res) => {
            res.json({ message: "Todo API is running!" });
        });

        // ✅ Routes
        app.use("/api/todos", todoRoutes);

        // ✅ Start Server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Stops execution if DB fails
    }
})();

// ✅ Graceful Shutdown (Handles SIGINT & SIGTERM)
const shutdown = async () => {
    console.log("\nShutting down server...");
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
