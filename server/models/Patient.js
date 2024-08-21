import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// find diff library for date format
// import moment from 'moment'

const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
        // get: (dobVal) => {
        //     moment(dobVal).format('MM DD, YYY')
        // },
        trim: true,
    },
    userName: {
        type: String,
        // required: true,
        trim: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        // required: true,
        length: 8,
    },
    chartNotes: [{
        type: Schema.Types.ObjectId,
        ref: 'ChartNote'
    }],
    medications: [{
        type: String
    }],
});

// if password is new or modified, hash it
patientSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    };

    next();
});

// if password is correct, compare it with password already on file
patientSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
 };

const Patient = model('Patient', patientSchema);

export default Patient;