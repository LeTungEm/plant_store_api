'use strict'

const { join } = require('path');
const mime = require('mime-types');
const fs = require('fs');

module.exports = {
    getFile: (req, res) => {
        let fileName = req.params.fileName;
        let folderName = req.params.folderName;
        const uploadPath = join(__dirname, '../../', 'uploads');
        const imagePath = join(uploadPath, folderName, fileName);
        const defaultImage = join(uploadPath, 'default.jpg');
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Tệp tin không tồn tại
                res.sendFile(defaultImage);
            } else {
                const mimeType = mime.lookup(imagePath);

                if (mimeType && mimeType.startsWith('image/')) {
                    // Nếu là tệp tin ảnh, gửi nó về phía người dùng
                    res.sendFile(imagePath);
                } else {
                    // Nếu không phải tệp tin ảnh
                    res.sendFile(defaultImage);
                }
            }
        });
    }
};