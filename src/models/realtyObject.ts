import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IRealtyObject {

}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IRealtyObject>({

});

// 3. Create a Model
export const RealtyObject = model<IRealtyObject>('RealtyObject', schema);
