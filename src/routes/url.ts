import express from "express";
import { GenerateNewShortURL, getAnalytics } from "../controllers/url.js";
// interface IRequest extends express.Request {
//   body: {
//     url: string;
//   };
//   // params: {
//   //   [key: string]: string;
//   // };
// }

const router = express.Router();

router.post("/", GenerateNewShortURL);

router.get("/analytics/:shortId", getAnalytics);

// router.get();

export default router;
