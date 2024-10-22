import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Account from "../models/Account";

const authRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
authRouter.get("/account", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Account[]>("accounts").find();
    const results = await cursor.toArray();
    results
      ? res.status(200).json(results)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    errorResponse(err, res);
  }
});

authRouter.get("/account/:id", async (req, res) => {
  try {
    let uid: string = req.params.id as string;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ uid });
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: "ID not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

authRouter.post("/account", async (req, res) => {
  try {
    const client = await getClient();
    const newItem = req.body;
    await client.db().collection<Account>("accounts").insertOne(newItem);
    res.status(200);
    res.json(newItem);
  } catch (error) {
    errorResponse(error, res);
  }
});

authRouter.put("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const replacement = req.body;
    replacement._id = new ObjectId(id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .replaceOne({ _id: new ObjectId(id) }, replacement);
    if (result.modifiedCount) {
      res.status(200);
      res.json(replacement);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

authRouter.patch("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
authRouter.patch("/account/update-player/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body; //{player: player}
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});
authRouter.patch("/account/delete-player/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const update = req.body; //{player: player}
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .updateOne({ _id: new ObjectId(id) }, { $unset: { player: "" } });
    if (result.modifiedCount) {
      res.status(200);
      res.json(update);
    } else {
      res.status(404);
      res.send("ID not found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

authRouter.delete("/account/:id", async (req, res) => {
  try {
    let id: string = req.params.id as string;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404);
      res.send("No ID found");
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default authRouter;
