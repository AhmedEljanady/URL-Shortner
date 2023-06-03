import express, { Request, Response } from "express";
import connection from "./connect.js";
import urlRoutes from "./routes/url.js";
import URL from "./models/url.js";

const app = express();
app.use(express.json());

connection();

app.use("/url", urlRoutes);

app.get("/:shortId", async (req: Request, res: Response) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3334, () => console.log("server started"));
