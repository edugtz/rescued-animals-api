'use strict';

const AWS = require('aws-sdk');

class S3 {
    constructor() {
        // Provide credentials with the help of env variables
        const options = {
            params: {
                Bucket: process.env.S3_BUCKET
            },
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretKey: process.env.AWS_SECRET_ACCESS_KEY,
        };

        this.s3 = new AWS.S3(options);
    };

    /* This method uploads an image to the specified S3 bucket */
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

    /* This method deletes a file from the specified S3 bucket */
    deleteFile(key) {
        const params = {
            Key: key
        };

        return new Promise((resolve, reject) => {
            this.s3.deleteObject(params, function(err, data) {
                if (err) {
                    reject(err);
                }
                
                resolve(data);
            });
        });
    }
};

module.exports = new S3();
