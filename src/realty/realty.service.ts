import { RealtyObject } from "../models/realtyObject";
import { Pageable } from "../models/common/pageble";

export const realtyObjectsService = {
    getObjectById: async (id: number) => {
        return RealtyObject.findById(id)
            .exec();
    },

    getAllObjects: async (filter: any, pageable?: Pageable) => {
        if (pageable) {
            return RealtyObject.find(filter)
                .skip(pageable.page * pageable.size)
                .limit(pageable.size)
                .exec();
        } else {
            return RealtyObject.find()
                .exec();
        }
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
