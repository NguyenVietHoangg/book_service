import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const CONFIG_SMTP = { user: 'hungsama@gmail.com', pass: '' }
const CONTENT_SMTP = {
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: "bar@example.com, baz@example.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>" // html body
}

const SETUP_SMTP = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: CONFIG_SMTP
});

export const sendEmail = async (config={}) => {
  try {
    const mailerSetup = SETUP_SMTP()
    const info = await mailerSetup.sendMail({...CONTENT_SMTP, ...config})
    return { code: 0, msg: info.messageId }
  } catch (error) {
    console.log('error', error)
    return { code: 3000, msg: error.msg }
  }
}