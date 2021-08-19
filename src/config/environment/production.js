// Production specific configuration
// ===================================

export default {
  httpPort: process.env.PORT || 80,
  httpsPort: process.env.PORT || 443,
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: 'mongodb+srv://apiaccess:yCJkpAoY8Lh3wAQu@brotherbookcluster.dqsgo.mongodb.net/bb_prod?retryWrites=true&w=majority',
  },
  // secretKey for JWT
  secretKey: 'BR00Th3RB00K_5Zu5Ak_PROD',
  paginateOptions: {
    limit: 15,
  },
};
