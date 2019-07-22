export const empty = (res: { status: (arg0: number) => { json: (arg0: { "message": any; "status": string }) => void } }, message: any) => {
    return res.status(203).json({ message, status: "failed"});
};
export const success = (res: { status: (arg0: number) => { json: (arg0: { "meta": any; "status": string }) => void } }, message: any) => {
    return res.status(200).json({meta: message, status: "success"});
};
export const created = (res: { status: (arg0: number) => { json: (arg0: { "meta": any; "status": string }) => void } }, message: any) => {
    return res.status(201).json({meta: message, status: "success"});
};
export const failed = (res: { status: (arg0: number) => { json: (arg0: { "message": any; "status": string }) => void } }, message: any) => {return res.status(401).json({message, status: "failed"});
};
export const invalid = (res: { status: (arg0: number) => { json: (arg0: { "errors": any; "status": string }) => void } }, errors: { array: () => void }) => {
    return res.status(422).json({errors: errors.array(), status: "failed"});
};
export const forbidden = (res: { status: (arg0: number) => { json: (arg0: { "message": any; "status": string }) => void } }, error: any) => {
    return res.status(403).json({message: error, status: "failed"});
};
export const serverError = (res: { status: (arg0: number) => { json: (arg0: { "message": any; "status": string }) => void } }, error: any) => {
    return res.status(500).json({message: error, status: "failed"});
};
