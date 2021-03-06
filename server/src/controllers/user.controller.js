const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const createOwner = catchAsync(async (req, res) => {
  const owner = await userService.createOwner(req.body);
  res.status(httpStatus.CREATED).send(owner);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserBookings = catchAsync(async (req, res) => {
  if(req.user._id != req.params.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user');
  }
  const result = await userService.getUserBookings(req.params.userId);
  res.send(result);
});

module.exports = {
  createUser,
  createOwner,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserBookings
};
