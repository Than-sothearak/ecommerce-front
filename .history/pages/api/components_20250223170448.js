import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Read the JSON file
  const filePath = path.join(process.cwd(), 'data', 'pc_parts.json');
  const jsonData = fs.readFileSync(filePath);
  const components = JSON.parse(jsonData);

  res.status(200).json(components);
}
