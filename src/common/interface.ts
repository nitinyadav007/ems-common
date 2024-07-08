import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export interface IJwtPayload {
  sub: ObjectId;
  type: any;
}

export interface ITCPPayload<T> {
  data: T;
  user: IJwtPayload;
}

export const mongooseDeleteOptions = {
  deletedBy: true,
  deletedByType: Types.ObjectId,
  deletedAt: true,
  overrideMethods: true,
  // use$neOperator: false,
};
