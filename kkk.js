const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// إعداد نقطة الوصول للصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('Welcome to the Background Removal API!');
});

// إعداد نقطة الوصول لتحميل الصورة وإزالة الخلفية
app.get('/remove-background', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    // إعداد تفاصيل الطلب لتحميل الصورة
    const options = {
      method: 'GET',
      url: imageUrl,
      headers: {
        Referer: 'https://www.artguru.ai/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      },
      responseType: 'arraybuffer', // لتحميل الصورة كـ buffer
    };

    // إرسال الطلب لتحميل الصورة
    const response = await axios.request(options);

    // حفظ الصورة المأخوذة من الرابط
    const filePath = path.join(__dirname, 'downloaded_image.webp');
    fs.writeFileSync(filePath, response.data);

    // الرد مع صورة تم تحميلها
    res.status(200).sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Failed to send the file' });
      } else {
        // بعد إرسال الصورة، يمكن حذفها من الخادم (اختياري)
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch image from URL' });
  }
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
