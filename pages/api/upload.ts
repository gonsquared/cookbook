import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public/images');
  ensureDirExists(uploadDir);

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (_name, ext, part) => {
      return String(part.originalFilename);
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload error' });
    }
  
    const file = Array.isArray(files.image) ? files.image[0] : undefined;
    const fallbackFilename = Array.isArray(fields.existingImage)
      ? fields.existingImage[0]
      : undefined;
  
    const fileName = file?.filepath
      ? path.basename(file.filepath)
      : fallbackFilename;
  
    if (!fileName) {
      return res.status(400).json({ message: 'Image is required' });
    }
  
    return res.status(200).json({ filename: fileName, id: fields.id?.[0] });
  });
}
