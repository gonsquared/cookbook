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
      return Date.now().toString() + '_' + part.originalFilename;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'File upload error' });
    }

    const file = files.image?.[0] as FormidableFile;
    const fileName = path.basename(file.filepath);

    return res.status(200).json({ filename: fileName });
  });
}
