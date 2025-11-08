import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    console.log(event, "event")
    const body = JSON.parse(event.body);
    const filename = body.filename;
    const contentType = body.contentType;

    const command = new PutObjectCommand({
      Bucket: "photos",
      Key: `images/${filename}`,
      ContentType: contentType
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    return {
      statusCode: 200,
      body: JSON.stringify({ uploadUrl: url })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating upload URL" })
    };
  }
};

