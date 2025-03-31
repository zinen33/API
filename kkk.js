const axios = require("axios");
const fs = require("fs");
const path = require("path");

const imageUrl =
  "https://wxtechhk.oss-cn-hongkong.aliyuncs.com/tasks/output/visual_image_watermarking/e5e7914b-7c7d-4c35-a476-a69b4de685a1.png?x-oss-credential=LTAI5tGjJnh66c1txANiRBQN/20241213/cn-hongkong/oss/aliyun_v4_request&x-oss-date=20241213T092349Z&x-oss-expires=3600&x-oss-signature=138ede21da5e67b2c1771c5c29715fc3353d1a341aa8921ef41be52cd85f6498&x-oss-signature-version=OSS4-HMAC-SHA256";

const imagePath = path.join(__dirname, "downloaded_image.png");

(async () => {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("تم تحميل الصورة بنجاح!");
    });

    writer.on("error", (err) => {
      console.error("حدث خطأ أثناء حفظ الصورة:", err);
    });
  } catch (error) {
    console.error("حدث خطأ أثناء تحميل الصورة:", error.message);
  }
})();
