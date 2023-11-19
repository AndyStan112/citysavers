//@ts-nocheck
import fs from "fs";
import path from "path";
import formidable, { errors as formidableErrors } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import upload from "/lib/upload";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import streamifier from "streamifier";
import prisma from "../../../lib/prismadb";

const storage = new Storage({
  keyFilename: "googleCloudKey.json",
  projectId: "centered-binder-405515",
});

const bucket = storage.bucket("city_savers_photos");

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  const fileName = uuidv4() + ".png";
  const file = bucket.file(fileName);
  const form = formidable({});
  let fields;
  let files;
  try {
    [fields, files] = await form.parse(req);
    // console.log(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  fs.createReadStream(files.userpic[0].filepath)
    .pipe(file.createWriteStream())
    .on("error", (err) => res.status(500).json({ error: err.message }))
    .on("finish", () =>
      res.status(200).json({
        photoUrl: `https://storage.googleapis.com/${bucket.name}/${fileName}`,
      })
    );
  // streamifier
  //   .createReadStream(files[0].buffer)
  //   .pipe(file.createWriteStream())
  //   .on("error", (err) => res.status(500).json({ error: err.message }))
  //   .on("end", () =>
  //     res.status(200).json({ message: "file uploaded name " + fileName })
  //   );
}
