module.exports = async (req, res) => {
  const { guest, room, restaurant, time } = req.body;
  if (!guest || !room || !restaurant || !time) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Placeholder logic: simulate OpenTable booking
  const confirmation = `Reservation confirmed at ${restaurant} for ${guest} (Room ${room}) at ${time}.`;

  res.json({ confirmation });
};