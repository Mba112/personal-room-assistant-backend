module.exports = async (req, res) => {
  const { guest, room, serviceType, notes } = req.body;
  if (!guest || !room || !serviceType) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  console.log(`Service Request - Guest: ${guest}, Room: ${room}, Type: ${serviceType}, Notes: ${notes || 'None'}`);
  res.json({ message: `Your request for ${serviceType} has been received.` });
};