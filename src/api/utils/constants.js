export default {
  TOKEN_EXPIRATION_TIME: '1 hour',
};

export const Roles = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  DEFAULT: 'USER',
});


export const QueryType = Object.freeze({
  MY: 'my',
  BORROWED: 'borrowed',
  LENT: 'lent',
});
