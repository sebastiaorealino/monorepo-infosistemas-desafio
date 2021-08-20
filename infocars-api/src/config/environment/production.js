// Production specific configuration
// ===================================

export default {
  httpPort: process.env.PORT || 80,
  httpsPort: process.env.PORT || 443,
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: '', //Add prod mongo server
  },
  // secretKey for JWT
  secretKey: 'INF051573M45_5Zu5Ak_PROD',
  paginateOptions: {
    limit: 15,
  },
};
