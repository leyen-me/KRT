export class BaseService {
    public tableName: string = ''

    public constructor({ tableName }) {
        this.tableName = tableName
    }
}