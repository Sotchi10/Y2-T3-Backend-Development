import express from "express";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/reports", reportRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
