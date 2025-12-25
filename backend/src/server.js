import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* ---------------- ESM dirname fix ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- Middleware ---------------- */
app.use(express.json());

/* ---------------- Production: Serve Frontend ---------------- */
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../../frontend/dist");

    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

/* ---------------- API Routes ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/* ---------------- Start Server ---------------- */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
