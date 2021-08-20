import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongoosePaginate from 'mongoose-paginate';
import { Roles } from '../utils/constants';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.DEFAULT,
  },
}, { timestamps: true });

userSchema.plugin(mongoosePaginate);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

function generateHashPassword(user, next) {
  const userMod = user;
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      userMod.password = hash;
      return next();
    });
  });
}

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return generateHashPassword(user, next);
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
  const user = this.getUpdate();
  return generateHashPassword(user, next);
});


export default mongoose.model('User', userSchema);
