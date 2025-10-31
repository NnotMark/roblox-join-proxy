
export default async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const r = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    const data = await r.json();

    if (!data || !data.created)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      Id: data.id,
      Name: data.name,
      DisplayName: data.displayName,
      JoinDate: data.created.split("T")[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
