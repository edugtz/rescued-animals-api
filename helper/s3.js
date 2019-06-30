const AWS = require('aws-sdk');

class S3 {
    constructor() {
        
        const options = {
            params: {
                Bucket: process.env.S3_BUCKET
            },
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretKey: process.env.AWS_SECRET_ACCESS_KEY,
        };

        this.s3 = new AWS.S3(options);
    };

    uploadFile(file) {
        const params = {
            Key: file.originalname,
            Body: file.buffer,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        };

        return new Promise((resolve, reject) => {
            this.s3.upload(params, function(err, data) {
                if (err) {
                    reject(err);
                }
                
                resolve(data);
            });
        });
    };
};

module.exports = new S3();
