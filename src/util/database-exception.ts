import { HttpException, HttpStatus, Logger } from "@nestjs/common";

export class DatabaseException extends HttpException{
    private readonly logger: Logger
    constructor(error: any) {
        super({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error,
            message: 'Database Error',
        }, HttpStatus.INTERNAL_SERVER_ERROR)
        this.logger = new Logger(DatabaseException.name)
        this.logger.log(error)
    }
}