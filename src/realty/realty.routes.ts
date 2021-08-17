import { Router } from 'express';
// import { FilterItem } from "../models/filterItem";
import { realtyObjectsService } from "./realty.service";
import { IRealtyObject } from "../models/realtyObject";

export const apiRouter = Router();

apiRouter.get("/realty-objects/:objectId", async (req, res, next) => {
        const objectId: number = Number(req.params.objectId);
        const realtyObject = await realtyObjectsService.getObjectById(objectId);

        res.send(realtyObject);
    }
);

// apiRouter.post("/realty-objects", (req, res, next) => {
//     const filterItems: FilterItem[] = req.body;
//     // const pageable;
//
//     let allObjects: Page<RealtyObject>;
//     if (filterItems != null) {
//         allObjects = realtyObjectsService.getAllObjectsForFilterItems(filterItems, pageable);
//     } else {
//         allObjects = realtyObjectsService.getAllObjects(pageable);
//     }
//
//     res.send(allObjects);
// );

apiRouter.post("/realty-object/save", (req, res, next) => {
    const realtyObject: IRealtyObject = req.body;
    const addedObject: IRealtyObject = realtyObjectsService.add(realtyObject);

    res.send(addedObject);
});

apiRouter.get("/realty-objects/building-types", (req, res, next) => {
    const buildingTypes: string[] = realtyObjectsService.getRealtyBuildingTypes();

    res.send(buildingTypes);
});

apiRouter.get("/realty-objects/supported-operations", (req, res, next) => {
    const operationTypes: string[] = realtyObjectsService.getRealtyOperationTypes();

    res.send(operationTypes);
});
