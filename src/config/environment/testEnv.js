// Production specific configuration
// ===================================

export default {
  // MongoDB connection options - local
  mongo: {
    uri: 'mongodb://localhost:27017/bb_test',
  },
  // secretKey for JWT
  secretKey: 'SECRET_KEY_FOR_TESTS',
  // Base url for docs
  defaultDocsRoutingPath: '/v1',
  paginateOptions: {
    limit: 15,
  },
};
