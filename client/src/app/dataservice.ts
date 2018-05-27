import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    srcApiUrl; removeCrawlSrcPath; locationApiUrl;
    constructor(private http: Http) {
        
    }
    
    getData(count) {
        return this.http
            .get('http://127.0.0.1:3000/api/getwords/' + count)
            .map((response: Response) => {
                return response.json();
            });
    }
}
