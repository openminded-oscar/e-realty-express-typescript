import { Schema, model } from 'mongoose';
import { RealtyObjectPhoto } from "./common/realtyObjectPhoto";

// 1. Create an interface representing a document in MongoDB.
export interface IRealtyObject {
    roomsAmount: Number;
    floor: Number;
    totalFloors: Number;
    price: Number;
    totalArea: Number;
    livingArea: Number;
    description: String;
    hasGarage: Boolean;
    hasRepairing: Boolean;
    hasCellar: Boolean;
    hasLoft: Boolean;
    foundationYear: Number;
    otherInfo: String;
    confirmed: Boolean;
    realterAware: Boolean;

    // private BuildingType buildingType;
    // private DwellingType dwellingType;
    // private Set<OperationType> targetOperations;
    // private Address address;
    // private User owner;
    // private Realter realter;
    //
    photos: RealtyObjectPhoto[];
    // private ConfirmationDocPhoto confirmationDocPhoto;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IRealtyObject>({
    roomsAmount: Number,
    floor: Number,
    totalFloors: Number,
    price: Number,
    totalArea: Number,
    livingArea: Number,
    description: String,

    hasGarage: Boolean,
    hasRepairing: Boolean,
    hasCellar: Boolean,
    hasLoft: Boolean,
    foundationYear: Number,
    otherInfo: String,
    confirmed: Boolean,
    realterAware: Boolean,

    photos: Schema.Types.Mixed
});

// 3. Create a Model
export const RealtyObject = model<IRealtyObject>('RealtyObject', schema);
