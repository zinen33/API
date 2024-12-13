const axios = require("axios").default;
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

app.get("/api", async (req, res) => {
  const imageUrl = "https://wxtechhk.oss-cn-hongkong.aliyuncs.com/tasks/output/visual_image_watermarking/8e7fe3cb-b274-46e6-82e0-e39d6ef4de06.png?x-oss-credential=LTAI5tGjJnh66c1txANiRBQN/20241213/cn-hongkong/oss/aliyun_v4_request&x-oss-date=20241213T080612Z&x-oss-expires=3600&x-oss-signature=f4fa774f5200485ef0276bfe5f6e5f4fe86e0a9828ec0c47ce1797dbd6f7f345&x-oss-signature-version=OSS4-HMAC-SHA256";
  const imagePath = path.join(__dirname, "downloaded_image.png");

  try {
    const imageResponse = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imagePath);

    imageResponse.data.pipe(writer);

    writer.on("finish", () => {
      console.log("Image downloaded successfully");
      res.send("Image downloaded successfully");
    });

    writer.on("error", (err) => {
      console.error("Error downloading the image", err);
      res.status(500).send("Error downloading the image");
    });
  } catch (error) {
    console.error("Error making the request", error);
    res.status(500).send("Error making the request");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
