import motorPolicyPayment from "../../models/policyModel/motorPolicyPaymentSchema.js";
import mongoose from "mongoose";
import MotorPolicyModel from "../../models/policyModel/motorpolicySchema.js";

// Create or update a motor policy payment
export const createOrUpdateMotorPolicyPayment = async (req, res) => {
  const {
    partnerId,
    policyId,
    policyNumber,
    bookingId,
    od,
    tp,
    netPremium,
    finalPremium,
    payInODPercentage,
    payInTPPercentage,
    payInODAmount,
    payInTPAmount,
    payOutODPercentage,
    payOutTPPercentage,
    payOutODAmount,
    payOutTPAmount,
    payInCommission,
    payOutCommission,
    createdBy,
    updatedBy,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(policyId)) {
      res.status(400).json({
        message: "Invalid policyId",
        success: false,
        status: "error",
      });
      return;
    }

    const motorPolicy = await MotorPolicyModel.findById(policyId);

    if (!motorPolicy) {
      res.status(404).json({
        message: "Motor Policy not found",
        success: false,
        status: "error",
      });
      return;
    }

    const existingPayment = await motorPolicyPayment.findOne({ policyId });

    if (existingPayment) {
      existingPayment.partnerId = partnerId;
      existingPayment.policyNumber = policyNumber;
      existingPayment.bookingId = bookingId;
      existingPayment.od = od;
      existingPayment.tp = tp;
      existingPayment.netPremium = netPremium;
      existingPayment.finalPremium = finalPremium;
      existingPayment.payInODPercentage = payInODPercentage;
      existingPayment.payInTPPercentage = payInTPPercentage;
      existingPayment.payInODAmount = payInODAmount;
      existingPayment.payInTPAmount = payInTPAmount;
      existingPayment.payOutODPercentage = payOutODPercentage;
      existingPayment.payOutTPPercentage = payOutTPPercentage;
      existingPayment.payOutODAmount = payOutODAmount;
      existingPayment.payOutTPAmount = payOutTPAmount;
      existingPayment.payInCommission = payInCommission;
      existingPayment.payOutCommission = payOutCommission;
      existingPayment.updatedBy = updatedBy;
      existingPayment.policyDate = motorPolicy.createdOn;

      const updatedPayment = await existingPayment.save();
      res.status(200).json({
        message: "Motor Policy Payment updated successfully",
        data: updatedPayment,
        success: true,
        status: "success",
      });
    } else {
      const newMotorPolicyPayment = new motorPolicyPayment({
        partnerId,
        policyId,
        policyNumber,
        bookingId,
        od,
        tp,
        netPremium,
        finalPremium,
        payInODPercentage,
        payInTPPercentage,
        payInODAmount,
        payInTPAmount,
        payOutODPercentage,
        payOutTPPercentage,
        payOutODAmount,
        payOutTPAmount,
        payInCommission,
        payOutCommission,
        policyDate: motorPolicy.createdOn,
        createdBy,
      });

      const savedMotorPolicyPayment = await newMotorPolicyPayment.save();
      res.status(201).json({
        message: "Motor Policy Payment created successfully",
        success: true,
        status: "success",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      status: "error",
    });
  }
};

// Get all motor policy payments
export const getAllMotorPolicyPayments = async (req, res) => {
  try {
    const motorPolicyPayments = await motorPolicyPayment.find();
    res.status(200).json({
      message: "All Motor Policy Payments retrieved successfully",
      data: motorPolicyPayments,
      success: true,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      status: "error",
    });
  }
};

// Get motor policy payment by policyId
export const getMotorPolicyPaymentByPolicyId = async (req, res) => {
  try {
    const motorPolicyPaymentData = await motorPolicyPayment.findOne({
      policyId: req.params.policyId,
    });
    if (!motorPolicyPaymentData) {
      res.status(404).json({
        message: "Motor Policy Payment not found",
        success: false,
        status: "error",
      });
      return;
    }
    res.status(200).json({
      message: "Motor Policy Payment retrieved successfully",
      success: true,
      data: motorPolicyPaymentData,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      status: "error",
    });
  }
};

// Update a motor policy payment by ObjectId
export const updateMotorPolicyPayment = async (req, res) => {
  const {
    partnerId,
    policyId,
    policyNumber,
    bookingId,
    od,
    tp,
    netPremium,
    finalPremium,
    payInODPercentage,
    payInTPPercentage,
    payInODAmount,
    payInTPAmount,
    payOutODPercentage,
    payOutTPPercentage,
    payOutODAmount,
    payOutTPAmount,
    payInCommission,
    payOutCommission,
    updatedBy,
  } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(policyId)) {
      res.status(400).json({
        message: "Invalid policyId",
        success: false,
        status: "error",
      });
      return;
    }

    const existingProfile = await motorPolicyPayment.findOne({
      policyId: req.params.policyId,
    });

    if (!existingProfile) {
      res.status(404).json({
        message: "Motor Policy Payment not found",
        success: false,
        status: "error",
      });
      return;
    }

    existingProfile.partnerId = partnerId;
    existingProfile.policyNumber = policyNumber;
    existingProfile.bookingId = bookingId;
    existingProfile.od = od;
    existingProfile.tp = tp;
    existingProfile.netPremium = netPremium;
    existingProfile.finalPremium = finalPremium;
    existingProfile.payInODPercentage = payInODPercentage;
    existingProfile.payInTPPercentage = payInTPPercentage;
    existingProfile.payInODAmount = payInODAmount;
    existingProfile.payInTPAmount = payInTPAmount;
    existingProfile.payOutODPercentage = payOutODPercentage;
    existingProfile.payOutTPPercentage = payOutTPPercentage;
    existingProfile.payOutODAmount = payOutODAmount;
    existingProfile.payOutTPAmount = payOutTPAmount;
    existingProfile.payInCommission = payInCommission;
    existingProfile.payOutCommission = payOutCommission;
    existingProfile.updatedBy = updatedBy;

    const updatedMotorPolicyPayment = await existingProfile.save();

    res.status(200).json({
      message: "Motor Policy Payment updated successfully",
      data: updatedMotorPolicyPayment,
      success: true,
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      status: "error",
    });
  }
};

// Delete a motor policy payment by ObjectId
export const deleteMotorPolicyPayment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: "Invalid ID",
        success: false,
        status: "error",
      });
      return;
    }
    const deletedMotorPolicyPayment = await motorPolicyPayment.findByIdAndDelete(id);
    if (!deletedMotorPolicyPayment) {
      res.status(404).json({
        message: "Motor Policy Payment not found",
        success: false,
        status: "error",
      });
      return;
    }
    res.status(200).json({
      message: "Motor Policy Payment deleted successfully",
      success: true,
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      status: "error",
    });
  }
};
