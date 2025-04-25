# استخدم Node الرسمي
FROM node:18

# مجلد العمل داخل الكونتينر
WORKDIR /app

# نسخ package.json
COPY package.json ./

# تثبيت الباكدج
RUN npm install

# نسخ باقي الملفات
COPY . .

# السماح بالمتغيرات البيئية
ENV PORT=3000

# تشغيل السيرفر
CMD ["npm", "start"]
