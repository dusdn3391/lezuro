const AWS = require('aws-sdk');
const express = require('express');
const app = express();

AWS.config.update({
  accessKeyId: 'AKIA6CLHNBRWTBFJHAX4',
  secretAccessKey: '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',
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3();

app.get('/generate-presigned-url', (req, res) => {
    console.log("여기 타나요?");
  const fileName = req.query.fileName;
  const fileType = req.query.fileType;

  const s3Params = {
    Bucket: 'lezuro-bk',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ url });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
