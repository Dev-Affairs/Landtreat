import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subject, startWith } from 'rxjs';
// import { AppBlockUIComponent } from '../components/app-block-ui/app-block-ui.component';
import Swal from 'sweetalert2';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    public http: HttpClient,
    public configService: ConfigService
  ) { }
  private blockUISubject = new Subject<boolean>();
  private userProfileMenuState2 = new Subject<boolean>()
  public searchBarDataSubject: Subject<void> = new Subject<void>();
  public searchBarCloseStateSubject: Subject<void> = new Subject<void>();
  public searchBarData: any = {}
  public userProfileMenuState: boolean = false

  userProfileMenuState2$ = this.userProfileMenuState2.asObservable()

  getBlockUIState(){
    return this.blockUISubject.asObservable()
  }

  updateUserProfileMenuState(value:boolean){
this.userProfileMenuState2.next(value)
  }

  startBlockUI(text: string){
    this.blockUISubject.next(true)
  }

  stopBlockUI(){
    this.blockUISubject.next(false)
  }

  getSearchBarstatus(){
    return this.searchBarCloseStateSubject.asObservable()
  }

  setSearchBarData(searchDataSet: any){
    this.searchBarData = JSON.parse(JSON.stringify(searchDataSet))
    console.log('Emitting searchBarData:', this.searchBarData);
    this.searchBarDataSubject.next(this.searchBarData)

  }

  getSearchBarData(){
    return this.searchBarDataSubject.asObservable()
  }

  uploadImage(formData: any){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/cn_upload', formData)
  }

  addProperty(formData: any, UID: string){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/add-property', {
      formData: formData,
      UID: UID
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  addPost(formData: any, UID: string){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/add-post', {
      formData: formData,
      UID: UID
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  approveProperty(propertyId: string){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/approve-property', {
      propertyId: propertyId
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  provertyToBookmarkAction(bookmarkFormData:any, action?:string){
   return this.http.post(this.configService.get("API_BASE_URL")+'api/property-watchlist',{
    bookmarkFormData: bookmarkFormData,
    action: action || "add"
   } )
  }
  updateProperty(slug: string, propertyId: string, formData: any,patchFormConfig:any){
    let updateData = {
      "$set": {
        "propertyDetails": formData
      }
    }


    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-property', {
      "propertyId": propertyId,
      "slug": slug,
      updateData,
      patchFormConfig
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateFeatureProperties(propertyIdList: any){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-feature-properties', {
      propertyIdList: propertyIdList
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  fetchFeatureProperties(){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/get-feature-properties', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  getYTVideoTitle(videoUrl: string, videoId: string){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/getYT-video-title', {
      "videoUrl": videoUrl,
      "videoId": videoId
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getCoverImg(){
    
  }

  findProperties(query?: any, limit?: number){
    let reqData: any = {}
    if(query) reqData['query'] = query;
    if(limit) reqData['limit'] = limit;
    console.log('reqData--', reqData)
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/find-properties', reqData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getUserBookmarks(query?: any){
    let reqData: any = {}
    if(query) reqData['query'] = query;
    console.log('reqData--', reqData)
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/getUserBookmarks', reqData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  fetchNotification(query?: any, limit?: number){
    let reqData: any = {}
    if(query) reqData['query'] = query;
    if(limit) reqData['limit'] = limit;
    console.log('reqData--', reqData)
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/getNotifications', reqData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getNotificationCount(query?: any, limit?: number){
    let reqData: any = {}
    if(query) reqData['query'] = query;
    console.log('reqData--', reqData)
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/getNotificationCount', reqData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  reloadWindow(){
    window.location.reload();
  }

  copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
      Swal.fire({
        title: "Copied",
        text: "The link has been copied!",
        icon: "success"
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  fetchPosts(query?: any, limit?: number){
    let reqData: any = {}
    if(query) reqData['query'] = query;
    if(limit) reqData['limit'] = limit;
    console.log('reqData--', reqData)
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/find-post', reqData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updatePost(slug: string, postId: string, formData: any){
    let updateData = {
      "$set": {
        "postDetails": formData
      }
    }

    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-post', {
      "postId": postId,
      "slug": slug,
      updateData
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deletePost(postId: string){
    let updateData = {
      "$set": {
        "isTrash": true
      }
    }

    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-post', {
      "postId": postId,
      updateData
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateConfig(id: number, formData: any){
    let updateData = {
      "$set": {
        "config": formData
      }
    }

    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-app-config', {
      id,
      updateData
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  findConfig(id: number){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/find-app-config', {
      id
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  
  addSavedItem(formData: any){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/add-saved-item', {
      formData: formData
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  fetchSavedItem(query?: any, limit?:number){
    let postParam:any = {}
    if(query) postParam.query = query;
    if(limit) postParam.limit = limit;
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/fetch-saved-item', postParam, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  updateSavedItem(updateData: any, itemID: string){
    return this.http.post(this.configService.get("API_BASE_URL") + 'api/update-saved-item', {
      updateData: updateData,
      itemID: itemID
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
