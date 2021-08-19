// QA specific configuration
// ===================================

export default {
  httpPort: 2000,
  // Not using
  httpsPort: 2500,
  // MongoDB connection options
  mongo: {
    // Mongo Server
    uri: 'mongodb+srv://apiaccess:yCJkpAoY8Lh3wAQu@brotherbookcluster.dqsgo.mongodb.net/bb_qa?retryWrites=true&w=majority',
  },
  // secretKey for JWT
  secretKey: 'BR00Th3RB00K_5Zu5Ak_QA',
  paginateOptions: {
    limit: 15,
  },
};
