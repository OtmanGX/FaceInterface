
export class HttpParams {
    public filterParams: Array<any>;
    map: Map<any, any>;
    params: Array<any>;
    constructor() {
        this.filterParams = new Array();
        this.map = new Map();
    }
    getParams() {
        return this.toObject(Array.from(this.map), this.filterParams);
        // return this.toObject(Array.from(this));
    }

    set(key , value) {
        return this.map.set(key, value);
    }
    get(key) {
        return this.map.get(key);
    }
    delete(key) {
        return this.map.delete(key);
    }
    toObject(...arrays) {
        const res = {};
        for (const array of arrays) {
            array.reduce((_, [key, value]) => {
                res[key] = value;
                return res;
            }, {});
        }
        return res;
    }
}
