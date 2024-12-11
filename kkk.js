const axios = require('axios');
const express = require('express');
const app = express();

// إعداد نقطة الوصول للصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('Welcome to the GPT API!');
});

// إعداد نقطة الوصول لتحويل الطلب إلى API GPT
app.get('/chat', async (req, res) => {
  const userMessage = req.query.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // إعداد تفاصيل الطلب إلى API GPT
    const options = {
      method: 'POST',
      url: 'https://gpt-4o7.p.rapidapi.com/v1/chat/completions',
      headers: {
        'x-rapidapi-key': '51083dedb4msh27fc01414fc162ap1ee379jsn6cf475608f46',
        'x-rapidapi-host': 'gpt-4o7.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'system',
            content: 'u r a helpful assistant that always output in json.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        response_format: {
          type: 'json_object'
        },
        store: true,
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }
    };

    // إرسال الطلب إلى GPT API
    const response = await axios.request(options);
    
    // الرد مع البيانات المستلمة من GPT API
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from GPT API:', error);
    res.status(500).json({ error: 'Failed to fetch data from GPT API' });
  }
});

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
