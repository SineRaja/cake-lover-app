import mongoose, { Document, Schema } from 'mongoose';

export interface ICake {
  name: string;
  comment: string;
  imageUrl: string;
  yumFactor: number;
}

export interface ICakeDocument extends ICake, Document {
  createdAt: Date;
  updatedAt: Date;
}

const cakeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true,
      index: true
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: [5, 'Comment must be at least 5 characters long'],
      maxlength: [200, 'Comment must not exceed 200 characters']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    },
    yumFactor: {
      type: Number,
      required: [true, 'Yum factor is required'],
      min: [1, 'Yum factor must be at least 1'],
      max: [5, 'Yum factor must not exceed 5'],
      validate: {
        validator: Number.isInteger,
        message: 'Yum factor must be an integer'
      }
    }
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

// Pre-save middleware to normalize cake name (case insensitive uniqueness)
cakeSchema.pre('save', async function(next) {
  const cake = this as ICakeDocument;
  
  // Check if a cake with the same name (case insensitive) already exists
  const existingCake = await mongoose.model<ICakeDocument>('Cake').findOne({
    name: { $regex: new RegExp(`^${cake.name}$`, 'i') },
    _id: { $ne: cake._id }
  });
  
  if (existingCake) {
    const error = new Error('A cake with this name already exists');
    return next(error);
  }
  
  next();
});

const Cake = mongoose.model<ICakeDocument>('Cake', cakeSchema);

export default Cake;