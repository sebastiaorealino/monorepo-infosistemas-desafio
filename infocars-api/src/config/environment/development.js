// Develop specific configuration
// ===================================

export default {
  httpPort: 3000,
  // Not using
  httpsPort: 3500, 
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: 'mongodb://localhost:27017/infocars', 
  },
  // secretKey for JWT
  secretKey: 'INF051573M45_5Zu5Ak_DEV',
  paginateOptions: {
    limit: 15,
  },
};
