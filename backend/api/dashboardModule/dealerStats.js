const { Car, Review } = require("../models");

exports.getDealerDashboardStats = async (req, res) => {
  try {
    const dealerId = req.user.userId;

    // Count total listings
    const totalListings = await Car.count({
      where: { userId: dealerId }
    });

    // Count available listings
    const availableListings = await Car.count({
      where: { userId: dealerId, status: "active" }
    });

    // Count sold listings
    const soldListings = await Car.count({
      where: { userId: dealerId, status: "sold" }
    });

    // Count dealer reviews
    const reviewCount = await Review.count({
      where: { dealerId }
    });

    return res.json({
      dealerId,
      totalListings,
      availableListings,
      soldListings,
      reviewCount
    });
  } catch (error) {
    console.error("Dealer stats error:", error);
    res.status(500).json({ error: "Failed to fetch dealer dashboard stats" });
  }
};
