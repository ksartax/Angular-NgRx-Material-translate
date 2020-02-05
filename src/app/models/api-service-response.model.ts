declare namespace ApiServiceResponseModel {
    interface Root {
        success: boolean;
    }

    export interface Objects<Type> extends Root {
        response: Type[];
        errors: any[];
    }
}