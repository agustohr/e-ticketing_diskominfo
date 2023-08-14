let express = require('express');
let bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config();
}
// let db = require('./models');
let app = express();
const { User } = require('./models');
const session = require('express-session')
const flash = require('express-flash')
let fs = require('fs');
let handlebars = require('handlebars');
let path = require('path');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Kedua, setting session handler
app.use(session({
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized: false
}))

// Ketiga, setting passport 
// (sebelum router dan view engine)
const passport = require('./src/lib/passport')
// const passportDinas = require('./src/lib/passportDinas')
app.use(passport.initialize())
app.use(passport.session())
// app.use(passportDinas.initialize())
// app.use(passportDinas.session())

// Keempat, setting flash
app.use(flash())

// Kita pakai untuk memasang view engine EJS
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/admin'));

const router = require('./src/router');
// const users = require('./src/controllers/api/users');
app.use(router);

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => res.send('Hello World!!!'))


// app.listen(PORT, ()=>console.log(`listening on: http://localhost:${PORT}`))

const server = app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
});

const socket = require("socket.io");
const io = socket(server);

let onlineUsers = [];

const addNewUser = (username, socketId) => {
    console.log('usernameAtas : '+username);
    console.log('sockedId : '+socketId);
    !onlineUsers.some((user) => user.username === username) && onlineUsers.push({username, socketId});
    console.log('onlineUsers : '+JSON.stringify(onlineUsers));
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
    console.log('onlineUsers : '+JSON.stringify(onlineUsers));
};

const getUser = (username) => {
    console.log('check1 === '+username)
    console.log('check2 === '+onlineUsers.find((user) =>  user.username === username));
    return onlineUsers.find((user) => user.username === username);
};

io.on('connection', function(socket){
    console.log('made socket connection', socket.id)
    // io.emit("firstEvent", "Hello World")
    socket.on("newUser", (username) => {
        console.log('username : '+username);
        addNewUser(username, socket.id);
    });

    //newIncTicket
    socket.on("newIncTicket", ({sender_nip, sender_name, no_ticket, text}) => {
        User.findAll()
        .then((pegawai) => {
            pegawai.forEach(i => {
                if (i.role == "admin") {
                    const filePath = path.join(__dirname, 'public/templateEmail/newTicket.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    var template = handlebars.compile(source);
                    var replacements = {
                            sender_nip: sender_nip,
                            sender_name: sender_name,
                            no_ticket: no_ticket,
                            text: text,
                            subtext: "Seorang pegawai telah melaporkan permasalahan, segera periksa dan tangani!",
                    };
                    var htmlToSend = template(replacements);
                    const mailOptions = {
                        from: `Diskominfo <${process.env.EMAIL}>`,
                        to : i.email,
                        subject : 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
                        html : htmlToSend
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('email berhasil dikirim : '+info.response);
                        }
                    });
                }
            });
        })
        .catch((err) => console.log(err));
        io.emit("getNewIncTicket", {
            sender_nip,
            sender_name,
            no_ticket,
            text,
        });
    });

    //newReqTicket
    socket.on("newReqTicket", ({sender_nip, sender_name, no_ticket, text}) => {
        User.findAll()
        .then((pegawai) => {
            pegawai.forEach(i => {
                if (i.role == "admin") {
                    const filePath = path.join(__dirname, 'public/templateEmail/newTicket.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    var template = handlebars.compile(source);
                    var replacements = {
                            sender_nip: sender_nip,
                            sender_name: sender_name,
                            no_ticket: no_ticket,
                            text: text,
                            subtext: "Seorang pegawai telah mengajukan permintaan pelayanan, segera periksa dan kerjakan!",
                    };
                    var htmlToSend = template(replacements);
                    const mailOptions = {
                        from: `Diskominfo <${process.env.EMAIL}>`,
                        to : i.email,
                        subject : 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
                        html : htmlToSend
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('email berhasil dikirim : '+info.response);
                        }
                    });
                }
            });
        })
        io.emit("getNewReqTicket", {
            sender_nip,
            sender_name,
            no_ticket,
            text,
        });
    });

    //validation incident ticket
    socket.on("validationIncTicket", ({receiver_nip, receiver_name, sender_role, receiver_email, no_ticket, ticketID, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/completedTicket.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                // senderId: senderId,
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                no_ticket: no_ticket,
                text: text,
                link: "http://localhost:3000/home/incident/detail/" + ticketID,
                subtext: "Ticket incident anda telah selesai diproses, silakan periksa ticket anda!"
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });
        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getValidationIncTicket", {
                receiver_nip,
                receiver_name,
                sender_role,
                text,
                no_ticket,
                ticketID
            });
        }
    });

    //validation request ticket
    socket.on("validationReqTicket", ({receiver_nip, receiver_name, sender_role, receiver_email, no_ticket, ticketID, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/completedTicket.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                // senderId: senderId,
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                no_ticket: no_ticket,
                text: text,
                link: "http://localhost:3000/home/request/detail/" + ticketID,
                subtext: "Ticket request anda telah selesai diproses, silakan periksa ticket anda!"
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });

        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getValidationReqTicket", {
                receiver_nip,
                receiver_name,
                sender_role,
                text,
                no_ticket,
                ticketID
            });
        }
    });

    //reqAkunDinas
    socket.on("reqAkunDinas", ({sender_nip, sender_name, dinas, text}) => {
        User.findAll()
        .then((pegawai) => {
            pegawai.forEach(i => {
                if (i.role == "admin") {
                    const filePath = path.join(__dirname, 'public/templateEmail/reqAkunDinas.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    var template = handlebars.compile(source);
                    var replacements = {
                            sender_nip: sender_nip,
                            sender_name: sender_name,
                            text: text,
                            dinas: dinas,
                    };
                    var htmlToSend = template(replacements);
                    const mailOptions = {
                        from: `Diskominfo <${process.env.EMAIL}>`,
                        to : i.email,
                        subject : 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
                        html : htmlToSend
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('email berhasil dikirim : '+info.response);
                        }
                    });
                }
            });
        })
        .catch((err) => console.log(err));
        io.emit("getReqAkunDinas", {
            sender_nip,
            sender_name,
            text,
        });
    });

    //approveAkunDinas
    socket.on("approveAkunDinas", ({receiver_nip, receiver_name, sender_role, receiver_email, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/actionAkunDinas.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                text: text,
                subtext: "Admin telah mensetujui permohonan pembuatan akun dinas anda.",
                subtext2: "Anda dapat membuat ticket dalam pelaporan masalah (Incident) dan pengajuan layanan (Request) yang berasal dari Dinas OPD anda."
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });

        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getApproveAkunDinas", {
                receiver_nip,
                receiver_name,
                sender_role,
                text,
            });
        }
    });

    //rejectAkunDinas
    socket.on("rejectAkunDinas", ({receiver_nip, receiver_name, sender_role, receiver_email, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/actionAkunDinas.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                text: text,
                subtext: "Admin telah menolak permohonan pembuatan akun dinas anda.",
                subtext2: "Maaf kami menolak permohonan pembuatan akun dinas anda karena suatu hal. Namun anda dapat melakukan permohonan pembuatan akun dinas kembali."
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - ' + text,
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });

        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getRejectAkunDinas", {
                receiver_nip,
                receiver_name,
                sender_role,
                text,
            });
        }
    });

    //newIncMessage pegawai -> admin
    socket.on("newIncMessage_pegawai-admin", ({sender_nip, sender_name, no_ticket, ticketID, text}) => {
        User.findAll()
        .then((pegawai) => {
            pegawai.forEach(i => {
                if (i.role == "admin") {
                    const filePath = path.join(__dirname, 'public/templateEmail/newMessageAdmin.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    var template = handlebars.compile(source);
                    var replacements = {
                            sender_nip: sender_nip,
                            sender_name: sender_name,
                            no_ticket: no_ticket,
                            link: "http://localhost:3000/homeAdmin/incident/detail/" + ticketID,
                            title: "New Message",
                            subtext: "Seorang pegawai telah memberikan pesan pada ticket incident, segera periksa dan balas pesan tersebut!",
                    };
                    var htmlToSend = template(replacements);
                    const mailOptions = {
                        from: `Diskominfo <${process.env.EMAIL}>`,
                        to : i.email,
                        subject : 'e-Ticketing Pelayanan Pengaduan Diskominfo - New Message',
                        html : htmlToSend
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('email berhasil dikirim : '+info.response);
                        }
                    });
                }
            });
        })
        .catch((err) => console.log(err));
        io.emit("getNewIncMessage_pegawai-admin", {
            sender_nip,
            sender_name,
            no_ticket,
            ticketID,
            text,
        });
    });

    //newIncMessage admin -> pegawai
    socket.on("newIncMessage_admin-pegawai", ({sender_role, receiver_nip, receiver_name, receiver_email, no_ticket, ticketID, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/newMessagePegawai.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                // senderId: senderId,
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                no_ticket: no_ticket,
                link: "http://localhost:3000/home/incident/detail/" + ticketID,
                title : "New Message",
                subtext: "Seorang Admin telah memberikan pesan pada ticket incident, segera periksa dan balas pesan tersebut!"
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - New Message',
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });
        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getNewIncMessage_admin-pegawai", {
                sender_role,
                receiver_nip,
                receiver_name,
                no_ticket,
                ticketID,
                text,
            });
        }
    });

    //newReqMessage pegawai -> admin
    socket.on("newReqMessage_pegawai-admin", ({sender_nip, sender_name, no_ticket, ticketID, text}) => {
        User.findAll()
        .then((pegawai) => {
            pegawai.forEach(i => {
                if (i.role == "admin") {
                    const filePath = path.join(__dirname, 'public/templateEmail/newMessageAdmin.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    var template = handlebars.compile(source);
                    var replacements = {
                            sender_nip: sender_nip,
                            sender_name: sender_name,
                            no_ticket: no_ticket,
                            link: "http://localhost:3000/homeAdmin/request/detail/" + ticketID,
                            title: "New Message",
                            subtext: "Seorang pegawai telah memberikan pesan pada ticket request, segera periksa dan balas pesan tersebut!",
                    };
                    var htmlToSend = template(replacements);
                    const mailOptions = {
                        from: `Diskominfo <${process.env.EMAIL}>`,
                        to : i.email,
                        subject : 'e-Ticketing Pelayanan Pengaduan Diskominfo - New Message',
                        html : htmlToSend
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('email berhasil dikirim : '+info.response);
                        }
                    });
                }
            });
        })
        .catch((err) => console.log(err));
        io.emit("getNewReqMessage_pegawai-admin", {
            sender_nip,
            sender_name,
            no_ticket,
            ticketID,
            text,
        });
    });

    //newReqMessage admin -> pegawai
    socket.on("newReqMessage_admin-pegawai", ({sender_role, receiver_nip, receiver_name, receiver_email, no_ticket, ticketID, text}) => {
        const filePath = path.join(__dirname, 'public/templateEmail/newMessagePegawai.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        var template = handlebars.compile(source);
        var replacements = {
                // senderId: senderId,
                receiver_nip: receiver_nip,
                receiver_name: receiver_name,
                no_ticket: no_ticket,
                link: "http://localhost:3000/home/request/detail/" + ticketID,
                title : "New Message",
                subtext: "Seorang Admin telah memberikan pesan pada ticket request anda, segera periksa dan balas pesan tersebut!"
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: `Diskominfo <${process.env.EMAIL}>`,
            to: receiver_email,
            subject: 'e-Ticketing Pelayanan Pengaduan Diskominfo - New Message',
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('email berhasil dikirim : '+info.response);
            }
        });
        console.log('onlineUsers == now : '+JSON.stringify(onlineUsers));
        const receiver = getUser(receiver_nip);
        console.log('ini receiver ======= '+ receiver );
        console.log('ini receiver1 ======= '+receiver_nip);
        if (receiver !== undefined) {
            io.to(receiver.socketId).emit("getNewReqMessage_admin-pegawai", {
                sender_role,
                receiver_nip,
                receiver_name,
                no_ticket,
                ticketID,
                text,
            });
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });

});

