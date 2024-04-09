export default class ApiResponse {
    constructor( res   , statusCode, message , data ) {


        res.status(statusCode).json({
            statusCode,
            message,
            data
        });
        
    }
}