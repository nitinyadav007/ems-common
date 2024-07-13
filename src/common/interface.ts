import { Types } from 'mongoose';

export const mongooseDeleteOptions = {
  deletedBy: true,
  deletedByType: Types.ObjectId,
  deletedAt: true,
  overrideMethods: true,
  // use$neOperator: false,
};
