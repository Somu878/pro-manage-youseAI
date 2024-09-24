import { ZodError } from "zod";

function handleError(error: any) {
    if(error instanceof ZodError){
        return error.issues[0].message;
    }
    else{
        return error.message;
    }
}

export { handleError };