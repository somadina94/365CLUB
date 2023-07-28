const User = require('../models/userModel');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const multer = require('multer');
const multerS3 = require('multer-s3');
const B2 = require('backblaze-b2');

exports.upload = multer({ storage: multer.memoryStorage() });

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

exports.uploadVerificationPhotos = catchAsync(async (req, res, next) => {
  const { files } = req;
  const user = await User.findById(req.user._id);

  const promises = Object.entries(files).flatMap(([fieldName, fileArray]) =>
    fileArray.map(async (file) => {
      await b2.authorize(); // authorize with backblaze

      const uploadUrl = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
      });

      const uploadFileResponse = await b2.uploadFile({
        uploadUrl: uploadUrl.data.uploadUrl,
        uploadAuthToken: uploadUrl.data.authorizationToken,
        filename: `${file.originalname}-${Date.now().toString()}-${
          req.user._id
        }.jpg`,
        mime: file.mimetype, // or 'b2/x-auto' for auto-detect
        data: file.buffer, // multer provides the file data in-memory; no need to fs.readFile
      });

      // Create download URL
      const downloadUrl = `https://${process.env.B2_BUCKET_NAME}.s3.${process.env.B2_BUCKET_REGION}.backblazeb2.com/${uploadFileResponse.data.fileName}`;

      const photoName = uploadFileResponse.data.fileName.split('-')[0];
      console.log(photoName);
      if (fieldName === photoName) {
        user[fieldName] = downloadUrl;
      }
    })
  );

  await Promise.all(promises);
  user.IdVerified = 'processing';
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message:
      'Data uploaded successfully, we will get back to your as soon as possible.',
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'New user created successfully.',
    data: { user },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: 'user' });

  if (!users) {
    return next(new AppError('No users were found.', 404));
  }

  res.status(200).json({
    status: 'success',
    count: users.length,
    data: {
      users,
    },
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('orders');

  if (!user) {
    return next(new AppError('No user found with that ID.'));
  }

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User account updated successfully.',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

exports.blockUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User blocked successfully.',
  });
});

exports.unblockUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active: true },
    { new: true }
  );

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User unblocked successfully.',
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
