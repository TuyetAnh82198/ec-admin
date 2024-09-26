[Introduction]
Name: E-commerce website.
-> Client & Admin: React, MUI, PropTypes.
-> Server: NodeJS (Express), Cors, Express Validator, Bcrypt, Express Validator, Cookie Parser, Json Web Token, Multer, Socket.IO, Nodemailer, Stripe, Crypto, Compression. 
-> Database: MongoDB

[Github link]
-> Client:
https://github.com/TuyetAnh82198/ec-client
-> Admin:
https://github.com/TuyetAnh82198/ec-admin
-> Server:
https://github.com/TuyetAnh82198/ec-server

[Functional description]
An email will be sent to user successfully registered.
CRUD.
Sort.
Search.
Pagination.
Automatically apply free shipping code to eligible orders.
Updating stock.
Displaying top 6 products with high ranking.
Chat.
Page 404, 500.

[Demo]
-> Client: (Account: tuyetanh14102023@gmail.com; Pass: 12345678)
https://ec-web-client.onrender.com
-> Admin: (Account: admin@gmail.com; Pass: 12345678)
https://ec-web-admin.onrender.com


[Deployment guide (on local)]
-> Client:
npm start
.env: REACT_APP_SERVER, REACT_APP_CLIENT, REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_STRIPE_PUBLIC_KEY
-> Admin:
npm start
.env: REACT_APP_SERVER, REACT_APP_ADMIN=http://localhost:3001
-> Server:
"start": "nodemon --env-file=.env app.js"
npm start
.env: MONGODB_USER, MONGODB_PASS, CLIENT, ADMIN, JWT_SECRET, STRIPE_SECRET_KEY
