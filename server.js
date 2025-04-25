const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Dynamic Link Server</h1>');
});

app.get('/link', (req, res) => {
    const studentId = req.query.studentId || 'unknown';
    const videoId = req.query.videoId || 'default';

    const deepLink = `${process.env.DEEP_LINK_SCHEME}?studentId=${studentId}&videoId=${videoId}`;
    const fallbackUrl = process.env.FALLBACK_URL;

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting...</title>
        <meta charset="utf-8">
        <script type="text/javascript">
          setTimeout(function () {
            window.location.href = "${fallbackUrl}";
          }, 1500);
          window.location.href = "${deepLink}";
        </script>
      </head>
      <body>
        <h3>جاري فتح التطبيق ...</h3>
      </body>
    </html>
  `;

    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
