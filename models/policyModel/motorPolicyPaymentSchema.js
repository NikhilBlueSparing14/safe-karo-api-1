import mongoose from "mongoose";

const motorPolicyPaymentSchema = new mongoose.Schema({
  partnerId: { type: String, trim: true },
  policyId: { type: String, trim: true },
  policyNumber: { type: String, trim: true },
  bookingId: { type: String, trim: true },
  od: { type: Number, trim: true },
  tp: { type: Number, trim: true },
  netPremium: { type: Number, trim: true },
  finalPremium: { type: Number, trim: true },
  payInODPercentage: { type: Number, trim: true },
  payInTPPercentage: { type: Number, trim: true },
  payInODAmount: { type: Number, trim: true },
  payInTPAmount: { type: Number, trim: true },
  payOutODPercentage: { type: Number, trim: true },
  payOutTPPercentage: { type: Number, trim: true },
  payOutODAmount: { type: Number, trim: true },
  payOutTPAmount: { type: Number, trim: true },
  payInCommission: { type: Number, trim: true }, // payInOD + payInTP
  payOutCommission: { type: Number, trim: true }, // payOutOD + payOutTP
  policyDate:{type:String},
  createdBy: { type: String },
  updatedBy: { type: String, default: null },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

const motorPolicyPayment = mongoose.model(
  "motorPolicyPayment",
  motorPolicyPaymentSchema
);
export default motorPolicyPayment;
