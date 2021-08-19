// Develop specific configuration
// ===================================

export default {
  httpPort: 3000,
  // Not using
  httpsPort: 3500, 
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: 'mongodb://localhost:27017/chippix', 
  },
  // secretKey for JWT
  secretKey: 'BR00Th3RB00K_5Zu5Ak',
  paginateOptions: {
    limit: 15,
  },
};
