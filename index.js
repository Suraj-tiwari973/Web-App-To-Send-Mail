const express  = require('express');
const nodemailer = require('nodemailer');

const user = 'tiwarisuraj0852@gmail.com';
const pass = 'kwlsptvumxockume';
const path = require('path');
const app = express();
const port  = 3002;
const public_path = path.join(__dirname,'public');
app.use(express.static(public_path));
console.log(public_path);

app.get('/',(req,res)=>{
    res.sendFile(`${public_path}/send_mail.html`);
})

app.get('/send',(req,res)=>{
    let To = req.query.To;
    let From = req.query.From;
    let subject = req.query.subject;
    let content = req.query.content;

    // creteTransport will crete an object and further we will use it..
    let mail = nodemailer.createTransport({  
        host: 'smtp.gmail.com',  // this is the host service provided by the google free of cost.
        port: 587,
        secure: false,
        auth: {user:user, pass: pass}, // this weather the person is authorised user or not.
        requireTls:true
    })
    mail.sendMail({
        from:From,
        to:To,
        subject:subject,
        text:content
    },(err)=>{
        if(err){
            throw err;
        }
        res.sendFile(`${public_path}/Succesfull_Conform.html`);
    });
})

app.listen(port,(err)=>{
    if(err){
        throw err;
    }
    console.log(`Server is running at port ${port}`);
})