import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

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
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        length: 8,
    },
    chartNotes: [{
        type: Schema.Types.ObjectId,
        ref: 'ChartNote'
    }],
    medications: [{
        type: String
    }],
    pharmacies: [{
        type: Schema.Types.ObjectId,
        ref: 'Pharmacy'
    }]
});

// if password is new or modified, hash it
patientSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {

        if (!this.password) {
            throw new Error('Password must be provided');
        }
        
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