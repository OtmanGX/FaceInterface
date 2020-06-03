
export class HttpParams extends Map {
    public filterParams: Array<any>;
    params: Array<any>;
    // constructor() {
    //     super();
    //     this.filterParams = new Array();
    // }
    getParams() {
        // return this.toObject(Array.from(this), this.filterParams);
        return this.toObject(Array.from(this));
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
