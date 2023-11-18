import { Storage } from "@google-cloud/storage";
import googleCloudKey from "./googleCloudKey.json";
console.log(googleCloudKey);
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    ...googleCloudKey,
  },
});

// TODO: throw errors if env variables do not exist
const bucket = storage.bucket(process.env.BUCKET_NAME!);

export default bucket;
