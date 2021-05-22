const roles = ['user', 'admin', 'owner'];

const roleRights = new Map();
roleRights.set(roles[0], ['createBooking']);
roleRights.set(roles[1], ['getUsers', 'createBooking', 'manageAmenities', 'manageCategories', 'manageUsers', 'manageRooms', 'manageLocations', 'manageBookings', 'uploadImages']);
roleRights.set(roles[2], ['getRoom', 'manageRooms']);

module.exports = {
  roles,
  roleRights,
};
