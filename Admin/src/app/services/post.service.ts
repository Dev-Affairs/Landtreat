import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import slugify from 'slugify';
import { CommonService } from './common-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    
      constructor(
        public http: HttpClient,
        public commonService: CommonService
      ) { }
    
      getSlug(fieldValue: any){
        const specialCharsRegex = /[*+~.()'"!:@]/g;
        const sanitizedlink = fieldValue.replace(specialCharsRegex, "");
        return slugify(sanitizedlink, { lower: true });
      }
}