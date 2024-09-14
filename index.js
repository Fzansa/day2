const express = require('express');
const mongoose = require('mongoose');
const validator = require('email-validator');
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
mongoose.connect('mongodb://localhost:27017/user-data').then(
    function (db) {
        console.log('db connected');
    }
).catch(function (err) {
    console.log(err);
});

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    password: {
        required: true,
        type: String,
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    confirmPassword: {
        required: true,
        type: String
    }
});

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
});

userSchema.post('save', function (doc) {
    console.log('baad ka hai ye', doc);
});

const User = mongoose.model('User', userSchema);



app.post("/user", async (req, res) => {
    let newUser = User(req.body);

    await newUser.save();
    res.status(200).send({
        msg: "User Saved successfully",
        user: newUser
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))