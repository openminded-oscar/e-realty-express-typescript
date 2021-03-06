import { Router } from 'express';
import { Pageable } from "../models/common/pageble";
import { realtyObjectsService } from "./realty.service";
import { IRealtyObject } from "../models/realtyObject";

import { FilterItem } from "../models/common/filterItem";

export const apiRouter = Router();

apiRouter.get("/details/:objectId", async (req, res, next) => {
        const objectId: number = Number(req.params.objectId);
        const realtyObject = await realtyObjectsService.getObjectById(objectId);

        res.send(realtyObject);
    }
);

apiRouter.post("/", async (req, res, next) => {
        const filters: FilterItem[] = req.body;

        let allObjects: IRealtyObject[];
        if (req.query) {
            const pageable: Pageable = {page: Number(req.query.page), size: Number(req.query.size)};
            allObjects = await realtyObjectsService.getAllObjects(filters, pageable);
        } else {
            allObjects = await realtyObjectsService.getAllObjects(filters);
        }

        res.send(allObjects);
    }
);

apiRouter.post("/save", async (req, res, next) => {
    const realtyObject: IRealtyObject = req.body;
    const addedObject: IRealtyObject = await realtyObjectsService.add(realtyObject);

    res.send(addedObject);
});

apiRouter.get("/building-types", (req, res, next) => {
    const buildingTypes: string[] = realtyObjectsService.getRealtyBuildingTypes();

    res.send(buildingTypes);
});

apiRouter.get("/supported-operations", (req, res, next) => {
    const operationTypes: string[] = realtyObjectsService.getRealtyOperationTypes();

    res.send(operationTypes);
});
