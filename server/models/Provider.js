import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const providerSchema = new Schema({
    providerName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        length: 8,
    },
    patients: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

// if password is new or modified, hash it
providerSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds)
    };

    next();
});

// if password is correct, compare it with password already on file
providerSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
 };

const Provider = model('Provider', providerSchema);

export default Provider;