export const successMessage = (data: string) => {
    return {data, status: "success"};
};
export const failed = (response: any) => {
    return {response, status: "failed"};
};

export const successData = (data: object[] | object) => {
    return {data, status: "success"};
};
