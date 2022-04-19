const path = require('path');
const multer  = require('multer');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3  = require('multer-s3');

const tempDir = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, tempDir)
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if(error) cb(error);

                file.key = `${hash.toString('hex')}${Date.now()}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'eduardo-uploads',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            crypto.randomBytes(16, (error, hash) => {
                if(error) cb(error);

                const fileName = `${hash.toString('hex')}${Date.now()}-${file.originalname}`;

                cb(null, fileName);
            });
        }
    })
}

module.exports = {
    dest: tempDir,
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024 // 2 Megas
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo inválido.'))
        }
    }
};