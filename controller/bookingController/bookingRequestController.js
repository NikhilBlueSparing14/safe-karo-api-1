import upload from "../../middlewares/uploadMiddleware.js";
import BookingRequestModel from "../../models/bookingModel/bookingRequestSchema.js";
import fs from "fs";
import path from "path";

// Function to check if the policy number already exists
const checkPolicyNumberExist = async (policyNumber) => {
  const booking = await BookingRequestModel.findOne({ policyNumber });
  return !!booking;
};

// Create Booking Request.
export const createBookingRequest = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const {
      partnerId,
      partnerName,
      relationshipManagerId,
      relationshipManagerName,
      policyNumber,
      category,
      caseType,
      policyType,
      productType,
      subCategory,
      companyName,
      createdBy,
      isActive,
      bookingCreatedBy,
      bookingAcceptedBy,
    } = req.body;

    // Check if policy number already exists
    const policyExists = await checkPolicyNumberExist(policyNumber);
    if (policyExists) {
      return res.status(200).json({
        message: `Policy number ${policyNumber} already exists`,
        status: "success",
      });
    }

    try {
      const fileDetails = Object.keys(req.files).reduce((acc, key) => {
        acc[key] = req.files[key][0].filename;
        return acc;
      }, {});

      // Create new booking if policy number doesn't exist
      const newBooking = new BookingRequestModel({
        partnerId,
        partnerName,
        relationshipManagerId,
        relationshipManagerName,
        policyNumber,
        category,
        caseType,
        policyType,
        productType,
        subCategory,
        companyName,
        ...fileDetails,
        bookingCreatedBy,
        bookingAcceptedBy,
        bookingStatus: "requested",
        createdBy,
        isActive: isActive !== undefined ? isActive : true,
      });

      await newBooking.save();
      res.status(200).json({
        message: "Booking Request generated successfully",
        data: newBooking,
        status: "success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating booking",
        error: error.message,
      });
    }
  });
};

// Check PolicyNumber exist.
export const validatePolicyNumber = async (req, res) => {
  try {
    const { policyNumber } = req.query;
    const policyExists = await BookingRequestModel.exists({ policyNumber });
    if (policyExists) {
      return res.status(200).json({
        message: `Policy number already exists`,
        exist: true,
        status: "success",
      });
    } else {
      return res.status(200).json({
        message: `Policy number does not exist`,
        exist: false,
        status: "success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error checking policy number",
      error: error.message,
    });
  }
};

// Get all bookings
export const getAllBookingRequests = async (req, res) => {
  try {
    const bookings = await BookingRequestModel.find();
    res.status(200).json({
      message: "Bookings retrieved successfully.",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({
      message: "Error retrieving bookings",
      error: error.message,
    });
  }
};

// Get motorpolicy by bookingId
export const getBookingRequestsByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const policies = await BookingRequestModel.findById({ _id: bookingId });

    if (!policies) {
      return res.status(404).json({
        message: `No BookingRequest found for this bookingId ${bookingId}`,
        status: "success",
      });
    }

    res.status(200).json({
      message: "Motor Policies retrieved successfully.",
      data: policies,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving motor policies",
      error: error.message,
    });
  }
};

// Get booking requests by bookingCreatedBy
export const getBookingRequestsByCreatedBy = async (req, res) => {
  try {
    const { bookingCreatedBy } = req.params;
    const bookings = await BookingRequestModel.find({ bookingCreatedBy });

    if (bookings.length === 0) {
      return res.status(404).json({
        message: `No bookings found for bookingCreatedBy: ${bookingCreatedBy}`,
        status: "success",
      });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully.",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving bookings",
      error: error.message,
    });
  }
};

// Get booking requests by bookingAcceptedBy
export const getBookingRequestsByAcceptedBy = async (req, res) => {
  try {
    const { bookingAcceptedBy } = req.params;
    const bookings = await BookingRequestModel.find({ bookingAcceptedBy });

    if (bookings.length === 0) {
      return res.status(404).json({
        message: `No bookings found for bookingAcceptedBy: ${bookingAcceptedBy}`,
        status: "success",
      });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully.",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving bookings",
      error: error.message,
    });
  }
};

// Get booking requests by partnerId
export const getBookingRequestsByPartnerId = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const bookings = await BookingRequestModel.find({ partnerId });

    if (bookings.length === 0) {
      return res.status(404).json({
        message: `No bookings found for partnerId: ${partnerId}`,
        status: "success",
      });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully.",
      data: bookings,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving bookings",
      error: error.message,
    });
  }
};

// Accept booking request
export const acceptBookingRequest = async (req, res) => {
  try {
    const existingBooking = await BookingRequestModel.findById(req.params.id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("req.body", req.body);
    const updatedBooking = await BookingRequestModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Booking Accepted successfully",
      data: updatedBooking,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Accepting booking",
      error: error.message,
    });
  }
};

// Update a booking by ID
export const updateBookingRequest = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const existingBooking = await BookingRequestModel.findById(req.params.id);
      if (!existingBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const fileDetails = Object.keys(req.files).reduce((acc, key) => {
        acc[key] = req.files[key][0].filename;
        return acc;
      }, {});

      Object.keys(fileDetails).forEach((field) => {
        if (existingBooking[field]) {
          const oldFilePath = path.join("uploads", existingBooking[field]);
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error(`Error deleting old file: ${oldFilePath}`, err);
            }
          });
        }
      });

      const updateData = {
        ...req.body,
        ...fileDetails,
      };

      const updatedBooking = await BookingRequestModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.status(200).json({
        message: "Booking updated successfully",
        data: updatedBooking,
        status: "success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating booking",
        error: error.message,
      });
    }
  });
};

export const uploadFilesAndData = (req, res) => {
  upload.fields([
    { name: 'rcFront', maxCount: 1 },
    { name: 'rcBack', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files selected!" });
    }

    const { rcBack, fullName, partnerId, rcFront, email } = req.body;
    if (!fullName || !email || !partnerId) {
      return res.status(400).json({ message: "Name and email are required!" });
    }

    const fileDetails = Object.keys(req.files).reduce((acc, key) => {
      acc[key] = req.files[key][0].filename;
      return acc;
    }, {});

    res.status(200).json({
      message: "Files and data uploaded successfully!",
      data: {
        fullName,
        email,
        files: fileDetails,
      },
    });
  });
};