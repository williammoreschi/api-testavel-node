const db = (process.env.NODE_ENV === undefined) ? '' : `${process.env.NODE_ENV}_`;
export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${db}books.sqlite`,
    define: {
      underscored: true,
    },
  },
  jwtSecret: '123',
  jwtSession: { session: false },
};
