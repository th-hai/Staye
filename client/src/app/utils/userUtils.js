export function getFullName(user) {
  if (!user) {
    return undefined;
  }
  if (!user.userProfile || !user.userProfile.firstName) {
    return user.username;
  }

  const { firstName = '', lastName = '' } = user.userProfile;
  return `${firstName} ${lastName}`;
}

export function getWelcomeMessage(user) {
  if (!user) {
    return undefined;
  }
  if (!user.userProfile || !user.userProfile.firstName) {
    return `Hi, ${user.username}`;
  }
  const { firstName = '' } = user.userProfile;
  return `Hi, ${firstName}`;
}
