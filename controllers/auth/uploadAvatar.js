const fs = require('fs/promises');

const { User } = require('../../models');

const Jimp = require('jimp');

const path = require('path');

const { handleImageByJimp } = require('../../help');

const uploadAvatar = async (req, res) => {
  const { path: oldPath, originalname } = req.file;
  const { _id, email } = req.user;

  const newName = `${email.split('@')[0]}_${originalname}`;

  Jimp.read(oldPath, handleImageByJimp(newName));

  await fs.unlink(oldPath);

  const avatarURL = path.join('avatar', newName);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL },
    {
      new: true,
    }
  );

  res.json({ avatarURL: result.avatarURL });
};

module.exports = uploadAvatar;
