const roles = ['user', 'admin', 'owner'];

const adminRights = [
  'getUsers',
  'createBooking',
  'manageAmenities',
  'manageCategories',
  'manageUsers',
  'manageRooms',
  'manageLocations',
  'manageBookings',
  'uploadImages'
]

const ownerRights = [
  'getOwnerRooms',
  'manageOwnerRooms'
]

const userRights = [
  'createBooking',
  'manageUserBookings',
  'cancelBooking'
]

const roleRights = new Map();
roleRights.set(roles[0], userRights);
roleRights.set(roles[1], adminRights);
roleRights.set(roles[2], ownerRights);

module.exports = {
  roles,
  roleRights,
};
