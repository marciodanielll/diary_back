export type CreatedModel = {
  id: string;
  created: boolean;
};

import { ObjectId } from 'mongoose';

export type UpdatedModel = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedId: unknown | ObjectId;
  upsertedCount: number;
};
