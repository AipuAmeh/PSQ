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
    type: Number,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
});

const Pharmacy = model("Pharmacy", pharmacySchema);

export default Pharmacy;