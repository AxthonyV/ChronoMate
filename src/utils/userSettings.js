const userSettings = new Map();

function getUserLanguage(userId) {
  return userSettings.get(userId)?.language || 'en';
}

function setUserLanguage(userId, language) {
  userSettings.set(userId, { ...userSettings.get(userId), language });
}

module.exports = {
  getUserLanguage,
  setUserLanguage
};