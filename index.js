const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./views/index.html"));
});

app.get("/services/ip-cctv", (req, res) => {
  res.sendFile(path.resolve("./views/services/cctv.html"));
});

app.get("/services/networking", (req, res) => {
  res.sendFile(path.resolve("./views/services/networking.html"));
});

app.get("/services/ip-pbx", (req, res) => {
  res.sendFile(path.resolve("./views/services/ip-pbx.html"));
});

app.get("/services/virtual-computing", (req, res) => {
  res.sendFile(path.resolve("./views/services/virtual-computing.html"));
});

app.get("/services/online-ups", (req, res) => {
  res.sendFile(path.resolve("./views/services/online-ups.html"));
});

app.get("/services/biometric-attendance", (req, res) => {
  res.sendFile(path.resolve("./views/services/biometric-attendance.html"));
});

app.get("/services/public-announcement-system", (req, res) => {
  res.sendFile(
    path.resolve("./views/services/public-announcement-system.html")
  );
});

app.get("/clients", (req, res) => {
  res.sendFile(path.resolve("./views/clients.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.resolve("./views/projects.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.resolve("./views/contact.html"));
});

app.get("/credit", (req, res) => {
  res.redirect("https://www.instagram.com/nehan_yaser/");
});

app.post("/contact", async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  async function submit() {
    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      `@ ${new Date().toLocaleTimeString()}`;

    const info = await transporter.sendMail({
      from: '"AS IT Solutions Contact Page" <noreply@asitsolutions.net>',
      to: "info@asitsolutions.net",
      subject: payload.services,
      html: `
        <ul>
            <li>Name:  ${payload.name}</li>
            <li>Email:  ${payload.email}</li>
            <li>Message: <br /> ${payload.message} </li>
        </ul>
      `,
    });
  }

  submit().catch((e) => console.log(e));

  res.sendFile(path.resolve("./views/contact_success.html"));
});

app.get("/credit", (req, res) => {
  res.redirect('https://instagram.com/nehan_yaser');
});


app.get("*", function (req, res) {
  res.status(404).sendFile(path.resolve("./views/404.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
