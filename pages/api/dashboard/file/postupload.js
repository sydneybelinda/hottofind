var fs = require("fs");
import formidable from "formidable";
export default async (req, res) => {
  // for the pipe to work, we need to disable "bodyParser" (see below)

  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const uploadedFile = files.file.path;
    const fileName = files.file.name;

    fs.rename(uploadedFile, `public/uploadedimages/${fileName}`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(`public/uploadedimages/${fileName}`);
    });
  });
};
export const config = {
  api: {
    bodyParser: false
  }
};
