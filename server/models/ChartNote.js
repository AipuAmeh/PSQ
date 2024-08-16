import { Schema, model } from 'mongoose';


const chartNoteSchema = new Schema({
dateCreated: {
    type: Date,
    required: true,
    trim: true
},
patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
},
subject: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
},
noteText: {
    type: String,
    required: true,
    trim: true,
    maxLength: 280
}
});

const ChartNote = model('ChartNote', chartNoteSchema);

export default ChartNote;


