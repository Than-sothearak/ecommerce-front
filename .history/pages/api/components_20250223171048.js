import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read JSON file
    const filePath = path.join(process.cwd(), 'data', 'pc_parts.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const components = JSON.parse(jsonData);

    console.log("Loaded Data:", components); // Debugging log

    res.status(200).json(components);
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).json({ message: "Failed to load data" });
  }
}
