import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IRealtyObject {
    roomsAmount: Number;
    floor: Number;
    totalFloors: Number;
    price: Number;
    totalArea: Number;
    livingArea: Number;
    description: String;
    // private Boolean hasGarage;
    // private Boolean hasRepairing;
    // private Boolean hasCellar;
    // private Boolean hasLoft;
    // private Integer foundationYear;
    // private String otherInfo;
    // private BuildingType buildingType;
    // private DwellingType dwellingType;
    // private Set<OperationType> targetOperations;
    // private Boolean confirmed = false;
    // private Boolean realterAware = false;
    //
    // private Address address;
    // private User owner;
    // private Realter realter;
    //
    // private List<RealtyObjectPhoto> photos;
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
    description: String
});

// 3. Create a Model
export const RealtyObject = model<IRealtyObject>('RealtyObject', schema);
