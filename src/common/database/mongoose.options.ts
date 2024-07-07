import { Schema } from 'mongoose';

export function applyMongooseGlobalPlugins(schema: Schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
  schema.set('toObject', {
    virtuals: true,
  });
}
