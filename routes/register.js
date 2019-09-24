const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const {
    EMAIL_ID,
    EMAIL_PASS,
    EMAIL_ID_CONFIRM,
    EMAIL_ID_REQUEST,
    EMAIL_ID_ATTEMPT,
    CODES
} = process.env;

// REGISTER PAGE
router.get('/', (req, res, next) => {
    return res.render('register', {
        data: {},
        errors: {}
    });
});

router.post('/', (req, res, next) => {

    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_ID,
            pass: EMAIL_PASS
        }
    });
    const codes = JSON.parse(CODES);

    const search = (input, array) => {
        for (var i = 0; i < array.length; i++) {
            if (array[i].code === input) {
                return array[i];
            }
        }
    }

    if (req.body['submit-confirm-form']) {

        const enteredCode = req.body.code.toLowerCase().trim();
        const school = search(enteredCode, codes);

        if (school) {
            console.log('yay');

            const mailOpts = {
                from: EMAIL_ID,
                to: EMAIL_ID_ATTEMPT,
                subject: `New Login from ${school.school}`,
                html: `
                    <p><strong>School Name</strong>: ${school.school}</p>
                    <hr>
                    Timestamp: ${new Date()}
                `
            };

            smtpTrans.sendMail(mailOpts, (error, response) => {
                if (error) {
                    console.log('some problem');
                } else {
                    console.log('yayy login-attempt emailed');
                }
            });

            return res.render('register', {
                success: true,
                school: school.school,
            })
        } else {
            return res.render('register', {
                success: false
            })
        }

    } else if (req.body['submit-request-form']) {
        console.log('form submitted');
        const info = req.body;
        const mailOpts = {
            from: EMAIL_ID,
            to: EMAIL_ID_REQUEST,
            subject: `ProjectBeta 3.0: New Request from ${info['school-name']}`,
            html: `
                <p><strong>School Name</strong>: ${info['school-name']}</p>
                <p><strong>Contact email</strong>: ${info['contact-email']}</p>
                <hr>
                Timestamp: ${new Date()}
            `
        };
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log('some problem');
                return res.render('register', {
                    emailed: false,
                    msg: 'Some error occured, please try again (later).'
                })
            } else {
                console.log('yayy form emailed');
                return res.render('register', {
                    emailed: true,
                    msg: 'Thank you for requesting an invite! We will get back to you as soon as possible!'
                })
            }
        });
    } else {
        console.log('form submitted');
        const info = req.body;
        const mailOpts = {
            from: EMAIL_ID,
            to: EMAIL_ID_CONFIRM,
            subject: `ProjectBeta 3.0: New Registration from ${info.school}`,
            html: `
                <p><strong>School Name</strong>: ${info.school}</p>
                <p><strong>Incharge name</strong>: ${info.incharge_name}</p>
                <p><strong>Incharge email</strong>: ${info.incharge_email}</p>
                <p><strong>Incharge phone number</strong>: ${info.incharge_number}</p>
                <hr>
                <h2>func(64 Wit)</h2>
                <h3>Participant 1:</h3>
                <p><strong>Name</strong>: ${info.fo_p1_name}</p>
                <p><strong>Email</strong>: ${info.fo_p1_email}</p>
                <h3>Participant 2:</h3>
                <p><strong>Name</strong>: ${info.fo_p2_name}</p>
                <p><strong>Email</strong>: ${info.fo_p2_email}</p>
                <h3>Participant 3:</h3>
                <p><strong>Name</strong>: ${info.fo_p3_name}</p>
                <p><strong>Email</strong>: ${info.fo_p3_email}</p>
                <h3>Participant 4:</h3>
                <p><strong>Name</strong>: ${info.fo_p4_name}</p>
                <p><strong>Email</strong>: ${info.fo_p4_email}</p>
                <hr>
                <h2>Rush_B</h2>
                <h3>Participant 1:</h3>
                <p><strong>Name</strong>: ${info.rb_p1_name}</p>
                <p><strong>Email</strong>: ${info.rb_p1_email}</p>
                <h3>Participant 2:</h3>
                <p><strong>Name</strong>: ${info.rb_p2_name}</p>
                <p><strong>Email</strong>: ${info.rb_p2_email}</p>
                <h3>Participant 3:</h3>
                <p><strong>Name</strong>: ${info.rb_p3_name}</p>
                <p><strong>Email</strong>: ${info.rb_p3_email}</p>
                <h3>Participant 4:</h3>
                <p><strong>Name</strong>: ${info.rb_p4_name}</p>
                <p><strong>Email</strong>: ${info.rb_p4_email}</p>
                <h3>Participant 5:</h3>
                <p><strong>Name</strong>: ${info.rb_p5_name}</p>
                <p><strong>Email</strong>: ${info.rb_p5_email}</p>
                <hr>
                <h2>(In)Vested Interests</h2>
                <h3>Participant 1:</h3>
                <p><strong>Name</strong>: ${info.ivi_p1_name}</p>
                <p><strong>Email</strong>: ${info.ivi_p1_email}</p>
                <h3>Participant 2:</h3>
                <p><strong>Name</strong>: ${info.ivi_p2_name}</p>
                <p><strong>Email</strong>: ${info.ivi_p2_email}</p>
                <hr>
                Timestamp: ${new Date()}
            `
        };
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log('some problem');
                return res.render('register', {
                    emailed: false,
                    msg: 'Some error occured, please try again (later).'
                })
            } else {
                console.log('yayy form emailed');
                return res.render('register', {
                    emailed: true,
                    msg: 'Thank you for confirming your participation! See you on 18th August!'
                })
            }
        });

    }

});

module.exports = router;
