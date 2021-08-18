import { RealtyObject } from "../models/realtyObject";
import { Pageable } from "../models/common/pageble";
import aqp from "api-query-params";
import { FilterItem } from "../models/common/filterItem";

function convertOperationAndArgument(operation: string, value: string) {
    let converted = '';

    switch (operation.toLowerCase()) {
        case "ge":
            converted = ">=" + value;
            break;
        case "le":
            converted = "<=" + value;
            break;
        case "eq":
            converted = "=" + value;
            break;
        case "like":
            converted = "=" + "/" + value + "/";
            break;
        case "operationtypecontains":
            converted = "=" + value;
            break;
    }

    return converted;
}

function isSupported(field: string) {
    return ['price', 'description'].indexOf(field.toLowerCase()) >= 0;
}

function convertFiltersToQueryString(filters: FilterItem[]) {
    let query = '';
    for (const filter of filters) {
        if (isSupported(filter.field)) {
            query += filter.field + convertOperationAndArgument(filter.operation, filter.value) + '&';
        }
    }
    query = query.substr(0, query.length - 1);

    return query;
}

export const realtyObjectsService = {
    getObjectById: async (id: number) => {
        return RealtyObject.findById(id)
            .exec();
    },

    getAllObjects: async (filters: FilterItem[], pageable?: Pageable) => {
        const queryString: string = convertFiltersToQueryString(filters);
        const {filter} = aqp(queryString);

        if (pageable) {
            return RealtyObject.find(filter)
                .skip(pageable.page * pageable.size)
                .limit(pageable.size)
                .exec();
        } else {
            return RealtyObject.find(filter)
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
