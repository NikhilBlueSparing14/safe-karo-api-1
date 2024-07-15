import Partner from "../../models/policyModel/motorpolicySchema.js";
import moment from "moment";

export const getPartnersCount = async (req, res) => {
  try {
    const { period } = req.params;
    let matchStage;

    switch (period) {
      case "weekly":
        matchStage = {
          $match: {
            $or: [
              {
                joiningDate: {
                  $gte: moment().startOf("week").toDate(),
                  $lt: moment().endOf("week").toDate(),
                },
              },
              {
                joiningDate: moment().startOf("day").toDate(), // Check for partners who joined today
              },
            ],
          },
        };
        break;

      case "monthly":
        matchStage = {
          $match: {
            joiningDate: {
              $gte: moment().startOf("month").toDate(),
              $lt: moment().endOf("month").toDate(),
            },
          },
        };
        break;

      case "yearly":
        matchStage = {
          $match: {
            joiningDate: {
              $gte: moment().startOf("year").toDate(),
              $lt: moment().endOf("year").toDate(),
            },
          },
        };
        break;

      default:
        return res.status(400).json({ message: "Invalid period specified" });
    }

    const count = await Partner.aggregate([
      matchStage,
      {
        $group: {
          _id: "$role", // Group by the role field assuming it exists in motorPolicySchema
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedCounts = count.map((item) => ({
      role: item._id || "Unknown Role",
      count: item.count,
    }));

    res.status(200).json({
      message: `Partners joined ${period}`,
      counts: formattedCounts,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching partners count:", error);
    res.status(500).json({ message: "Error fetching partners count", error: error.message });
  }
};
