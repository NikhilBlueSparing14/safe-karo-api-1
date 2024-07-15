import UserModel from '../../models/adminModels/userProfileSchema.js';

const getDateRange = (period) => {
  const now = new Date();
  let startDate;

  switch (period) {
    case 'weekly':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'monthly':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    case 'yearly':
      startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      break;
    default:
      startDate = new Date(0);
      break;
  }

  return { startDate, endDate: new Date() };
};

export const countPartnersByPeriod = async (req, res) => {
  try {
    const { period } = req.params;
    const { startDate, endDate } = getDateRange(period);

    const count = await UserModel.countDocuments({
      joiningDate: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json({
      message: `Partners joined ${period}`,
      period,
      count,
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 'error' });
  }
};
