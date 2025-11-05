import mongoose, { Document, Schema } from 'mongoose'

export interface IService extends Document {
  userId: mongoose.Types.ObjectId
  repoUrl: string
  buildCmd: string
  startCmd: string
  status: 'Queued' | 'Building' | 'Live' | 'Failed'
  error?: string
  createdAt: Date
}

const ServiceSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  buildCmd: {
    type: String,
    required: true,
  },
  startCmd: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Queued', 'Building', 'Live', 'Failed'],
    default: 'Queued',
  },
  error: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)