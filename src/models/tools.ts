import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITool {
  _id?: string;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

interface ToolModel extends Omit<ITool, '_id'>, Document {}

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Tool: Model<ToolModel> = mongoose.model('Tool', schema);
