import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


export const sentOtp = async(to , otp) => {
    const result = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: `OTP For Account Creation`,
        html: `<p>Your otp for account creation is : <b>${otp}</b>. </p>`
    })

    console.log(result);
    
}

