import mongoose from "mongoose";

// Document schema to store information about each document
const DocumentSchema = new mongoose.Schema({
  docName: { type: String, required: true },
  file: { type: String, required: true }, // Assuming this is a Base64 encoded file or a URL to the file
});

// Main MotorPolicy schema
const MotorPolicySchema = new mongoose.Schema(
  {
    policyType: { type: String},
    caseType: { type: String }, 
    policyCategory: { type: String }, 
    category:{type:String},
    subCategory: { type: String, default: "" }, 
    companyName: { type: String }, 
    broker: { type: String }, 
    make: { type: String }, 
    model: { type: String }, 
    fuelType: { type: String },
    rto: { type: String}, 
    vehicleNumber: { type: String}, 
    seatingCapacity: { type: String }, 
    cc: { type: String }, 
    ncb: { type: String }, 
    policyNumber: { type: String, default: "" }, 
    fullName: { type: String }, 
    emailId: { type: String }, 
    phoneNumber: { type: String }, 
    mfgYear: { type: String}, 
    tenure: { type: String }, 
    registrationDate: { type: Date }, 
    endDate: { type: Date}, 
    issueDate: { type: Date }, 
    idv: { type: String }, 
    od: { type: String}, 
    tp: { type: String }, 
    netPremium: { type: String}, 
    finalPremium: { type: String}, 
    paymentMode: { type: String}, 
    policyCreatedBy: { type: String }, 
    documents: [DocumentSchema], 
  },
  { timestamps: true } 
);

export default mongoose.model("MotorPolicy", MotorPolicySchema);
