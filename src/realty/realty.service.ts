import { RealtyObject } from "../models/realtyObject";

export const realtyObjectsService = {
    getObjectById: async (id: number) => {
        return RealtyObject.findById(id)
            .exec();
    },
    getAllObjectsForFilterItems: async () => {
        return RealtyObject.find()
            .exec();
    },
    getAllObjects: async () => {
        return RealtyObject.find()
            .exec();
    },
    add: async (object: any) => {
        return RealtyObject.create(object);
    },
    getRealtyBuildingTypes: () => {
        return ['BLOCK', 'BRICK', 'WOODEN'];
    },
    getRealtyOperationTypes: () => {
        return ['SELLING', 'RENT'];
    }
};
//
// public Page<RealtyObject> getAllObjectsForFilterItems(List<FilterItem> filterItems, Pageable pageable) {
//     RealtyObjectSpecificationBuilder builder = new RealtyObjectSpecificationBuilder();
//     for(FilterItem filterItem: filterItems){
//         builder.with(filterItem);
//     }
//     Specification<RealtyObject> spec = builder.build();
//
//     return realtyObjectRepository.findAll(spec, pageable);
// }
//
// public RealtyObject add(RealtyObject realtyObject) {
//     List<RealtyObjectPhoto> retrievedPhotos = realtyObject.getPhotos()
//         .stream()
//         .map(photoToMap -> {
//             RealtyObjectPhoto photo = realtyObjectPhotoRepository.findById(photoToMap.getId()).get();
//             photo.setType(photoToMap.getType());
//             return photo;
//         })
//         .collect(Collectors.toList());
//     realtyObject.setPhotos(retrievedPhotos);
//
//     return realtyObjectRepository.save(realtyObject);
// }
