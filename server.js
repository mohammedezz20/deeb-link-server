const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root Route (styled welcome page)
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>مرحباً بك</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #6EE7B7, #3B82F6);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          text-align: center;
          flex-direction: column;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.2rem;
          margin: 0 0 20px 0;
        }

        a.button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #ffffff;
          color: #3B82F6;
          font-weight: bold;
          border-radius: 8px;
          text-decoration: none;
          transition: background-color 0.3s, color 0.3s;
        }

        a.button:hover {
          background-color: #3B82F6;
          color: #ffffff;
        }
      </style>
    </head>
    <body>
      <h1>أهلاً بك في Fast Web Player 🚀</h1>
      <p>اضغط لتجربة فتح تطبيقك مباشرة</p>
      <a class="button" href="/link?studentId=123">جرب الرابط الآن</a>
    </body>
    </html>
  `);
});

// Deep Link Route
app.get('/link', (req, res) => {
    const studentId = req.query.studentId || 'unknown';
    const deepLink = `${process.env.DEEP_LINK_SCHEME}?studentId=${studentId}`;
    const fallbackUrl = process.env.FALLBACK_URL;

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Redirecting...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8f9fa;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h3 {
          color: #3CB67D;
          margin-bottom: 20px;
        }
        .spinner {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3CB67D;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <script type="text/javascript">
        function isMobile() {
          var userAgent = navigator.userAgent || navigator.vendor || window.opera;
          return /android|iphone|ipad|ipod/i.test(userAgent);
        }

        window.onload = function () {
          if (isMobile()) {
            window.location.href = "${deepLink}";
            setTimeout(function () {
              window.location.href = "${fallbackUrl}";
            }, 1500);
          } else {
            window.location.href = "${fallbackUrl}";
          }
        }
      </script>
    </head>
    <body>
      <h3>جاري فتح التطبيق...</h3>
      <div class="spinner"></div>
    </body>
    </html>
  `);
});

// Local Development Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
