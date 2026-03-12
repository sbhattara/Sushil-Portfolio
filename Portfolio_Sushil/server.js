require('dotenv').config(); // Load secrets from a .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
    origin: 'https://yourportfolio.com' // Replace with your live URL later for security
}));
app.use(express.json());

// Set up the Transporter using Environment Variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  // Use App Password here
    }
});

// Verify connection configuration on startup
transporter.verify((error, success) => {
    if (error) {
        console.log("❌ Mail Server Error:", error);
    } else {
        console.log("✅ Mail Server is ready to deliver messages");
    }
});

app.post('/api/notify', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all fields.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Gmail requires 'from' to be your email
        replyTo: email, // This allows you to click 'Reply' in your inbox to email the lead
        to: process.env.EMAIL_USER,
        subject: `🚀 New Portfolio Lead: ${name}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #6366f1; border-radius: 10px;">
                <h2 style="color: #6366f1;">New Message from SUSHIL.SYS</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent!' });
    } catch (error) {
        console.error("SendMail Error:", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));