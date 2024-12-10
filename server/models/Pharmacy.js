import { Schema, model } from "mongoose";

const pharmacySchema = new Schema({
  pharmacyName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipcode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 9,
    minlength: 5
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
    trim: true,
  },
});

const Pharmacy = model("Pharmacy", pharmacySchema);

export default Pharmacy;
