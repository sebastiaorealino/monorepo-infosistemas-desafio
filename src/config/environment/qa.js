// QA specific configuration
// ===================================

export default {
  httpPort: 2000,
  // Not using
  httpsPort: 2500,
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: '', // Add mongo server for qa environment
  },
  // secretKey for JWT
  secretKey: 'INF051573M45_5V4XZ76_QA',
  paginateOptions: {
    limit: 15,
  },
};
