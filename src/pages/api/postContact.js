import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, mobile, message } = req.body;
      if (!name || !email || !mobile || !message) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
      let data = await fs.promises.readdir('contactdata');
      await fs.promises.writeFile(`contactdata/${data.length + 1}.json`, JSON.stringify(req.body));
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
