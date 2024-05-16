import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as MongooseSchema } from 'mongoose'

@Schema()
export class BaseSchema {
  @Prop({ required: true, type: MongooseSchema.Types.Date, default: Date.now })
  createdAt: Date

  @Prop({ required: true, type: MongooseSchema.Types.Date, default: Date.now })
  updatedAt: Date
}
