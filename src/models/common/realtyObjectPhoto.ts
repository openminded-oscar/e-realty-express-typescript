export interface Photo {
    id: number;
    filename: string;
}

export interface RealtyObjectPhoto extends Photo{
    type: string;
}
