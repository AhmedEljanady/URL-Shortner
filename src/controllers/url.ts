import shortid from "shortid";
import express, { Request, Response } from "express";
import URL from "../models/url.js";

// interface IRequest extends express.Request {
//   body: {
//     url: string;
//   };
//   params: {
//     [key: string]: string;
//   };
// }

// interface IResponse {
//   statusCode?: number;
//   statusMessage?: string;
//   body?: any;
//   id?: string;
//   error?: string;
// }

export async function GenerateNewShortURL(req: Request, res: Response) {
  try {
    if (!req.body.url) {
      return res.status(400).send({ error: "url is required" });
    }
    const shortId: string = shortid();
    await URL.create({
      shortId,
      redirectURL: req.body.url,
      visitHistory: [],
    });
    return res.status(200).json({ id: shortId });
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });

    if (result) {
      res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      });
    } else {
      res.status(404).send("URL not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
