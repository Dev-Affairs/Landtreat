import { CommonService } from './common-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { NumberFormatPipe } from '../custom-pipes/number-format.pipe';
import slugify from 'slugify';

@Injectable({
  providedIn: 'root'
})
export class PropertyRegistrationService {

  constructor(
    public http: HttpClient,
    public numberFormatPipe: NumberFormatPipe,
    public commonService: CommonService
  ) { }

  onChnageProperty(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    formDataModelRef['subCategory'] = null
    if(fieldValue == "Building"){
      formControl.hidden.category = false
      formControl.mandatory.category = true
      formControl.hidden.LandArea = true
      formControl.mandatory.LandArea = false
    }
    else{
      formControl.hidden.category = true
      formControl.mandatory.category = false
      formControl.hidden.LandArea = false
      formControl.mandatory.LandArea = true
    }
  }

  onCangeCategory(field: any, fieldValue: any, formDataModelRef: any, formControl: any,projectCard:any){
    formDataModelRef['subCategory'] = null
    if(fieldValue === 'Flat'){
      formControl.hidden.Rooms = false
      formControl.mandatory.Rooms = true
      formControl.hidden.SuperBuildupArea = false
      formControl.disabled.landPricePerSqrft = true
      formControl.hidden.CarpetArea = false
      formControl.mandatory.CarpetArea = true
      formControl.mandatory.propertyPriceMin = false
      formControl.mandatory.propertyPriceMax = false
      formControl.hidden.propertyPriceMax = true
      formControl.hidden.propertyPriceMin = true
      formControl.hidden.properyPrice = false
      formControl.hidden.Configurations = true
      formControl.mandatory.Configurations = false
      formControl.hidden.PossessionStatus = true
      formControl.hidden.PossessionDate = true
    }
    else if (fieldValue === 'Apartment/Project') {
      formControl.hidden.SuperBuildupArea = true
      formControl.disabled.landPricePerSqrft = false
      formControl.hidden.Rooms = true
      formControl.mandatory.Rooms = false
      formControl.hidden.CarpetArea = true
      formControl.mandatory.CarpetArea = false
      formControl.hidden.properyPrice = true
      formControl.mandatory.properyPrice = false
      formControl.mandatory.propertyPriceMin = true
      formControl.mandatory.propertyPriceMax = true
      formControl.hidden.propertyPriceMax = false
      formControl.hidden.propertyPriceMin = false
      formControl.hidden.Configurations = false
      formControl.mandatory.Configurations = true
      formControl.hidden.PossessionStatus = false
    }
    else if (fieldValue === 'Duplex' || 'Triplex' || 'Independent house'){
      formControl.hidden.SuperBuildupArea = false
      formControl.hidden.CarpetArea = false
      formControl.mandatory.CarpetArea = true
      formControl.disabled.landPricePerSqrft = true
      formControl.mandatory.propertyPriceMin = false
      formControl.mandatory.propertyPriceMax = false
      formControl.hidden.propertyPriceMax = true
      formControl.hidden.propertyPriceMin = true
      formControl.hidden.properyPrice = false
      formControl.mandatory.properyPrice = true
      formControl.hidden.Configurations = true
      formControl.mandatory.Configurations = false
      formControl.hidden.PossessionStatus = true
      formControl.hidden.PossessionDate = true
    }
    
  }

  toggleDatePicker(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
   if (fieldValue === 'Under Construction') {
    formControl.hidden.PossessionDate = false
   } else {
    formControl.hidden.PossessionDate = true
   }

   console.log(formControl,"-------------------------------")
  }


  onAddPropertyTitle(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if(fieldValue){
      const specialCharsRegex = /[*+~.()'"!:@]/g;
      const sanitizedlink = fieldValue.replace(specialCharsRegex, "");
      formDataModelRef['slug'] = slugify(sanitizedlink, { lower: true });
    }
  }
  checkPincode(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    console.log(fieldValue)
    if(isNaN(fieldValue) || (fieldValue && fieldValue.length > 6)){
      Swal.fire({
        title: "Warning",
        text: "Pincode is not valid",
        icon: "warning"
      }).then(()=>{
        formDataModelRef[field.name] = ""
      });
    }
  }

  checkString(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if (isNaN(fieldValue)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter only number value in Price per sqft.",
        icon: "warning"
      }).then(()=>{
        formDataModelRef[field.name] = ""
      });
    }
  }

  convertToNum(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if (fieldValue) {
      formDataModelRef[field.name] = this.numberFormatPipe.reverse(fieldValue)
    }
  }

  convertToSqft(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
      formDataModelRef[field.name] = this.numberFormatPipe.transform(fieldValue)
  }

  checkLandArea(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if(isNaN(fieldValue)){
      Swal.fire({
        title: "Warning",
        text: "Please enter only number value in Land Area.",
        icon: "warning"
      }).then(()=>{
        formDataModelRef[field.name] = ""
      });
    }
    else{
      if(formDataModelRef['properyPrice']){
        formDataModelRef['landPricePerSqrft'] = this.numberFormatPipe.transform(formDataModelRef['properyPrice'] / fieldValue)
      }
    }
  }

  checkProperyPrice(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if(isNaN(fieldValue)){
      Swal.fire({
        title: "Warning",
        text: "Please enter only number value in Propery Price.",
        icon: "warning"
      }).then(()=>{
        formDataModelRef[field.name] = ""
      });
    }
    else{
      let priceLength = fieldValue.length
      if (priceLength > 3) {   
        let properyPriceInText = this.numberFormatPipe.transform(fieldValue)
        formDataModelRef['properyPriceInText'] = properyPriceInText
      }else{
        formDataModelRef['properyPriceInText'] = ""
      }
      console.log(formDataModelRef)
      if(formDataModelRef['LandArea'] != null){
        formDataModelRef['landPricePerSqrft'] = this.numberFormatPipe.transform(fieldValue / formDataModelRef['LandArea'])
      }else if (formDataModelRef['CarpetArea'] != '') {
        formDataModelRef['landPricePerSqrft'] = this.numberFormatPipe.transform(fieldValue / formDataModelRef['CarpetArea'])
      }
    }
  }

  checkPropertyPriceMin(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if (isNaN(fieldValue)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter only number value in Min price.",
        icon: "warning"
      }).then(() => {
        formDataModelRef[field.name] = ''
        formDataModelRef['properyPriceInText'] = ''
      })
    } else {
      let priceLength = fieldValue.length
      if (priceLength > 3) {   
        let properyPriceInText = this.numberFormatPipe.transform(fieldValue)
        formDataModelRef['properyPriceInText'] = properyPriceInText
      }else{
        formDataModelRef['properyPriceInText'] = ""
      }
    }
  }

  checkPropertyPriceMax(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    if (isNaN(fieldValue)) {
      Swal.fire({
        title: "Warning",
        text: "Please enter only number value in Min price.",
        icon: "warning"
      }).then(() => {
        formDataModelRef[field.name] = ''
        if (formDataModelRef['propertyPriceMin']) {
          formDataModelRef['properyPriceInText'] = `${this.numberFormatPipe.transform(formDataModelRef['propertyPriceMin'])}`
        }
      })
    } else {
      let priceLength = fieldValue.length
      if (priceLength > 3) {
        let properyPriceInText = this.numberFormatPipe.transform(fieldValue)
        formDataModelRef['properyPriceInText'] = `${this.numberFormatPipe.transform(formDataModelRef['propertyPriceMin'])} - ${properyPriceInText}`
      }else{
        formDataModelRef['properyPriceInText'] = `${this.numberFormatPipe.transform(formDataModelRef['propertyPriceMin'])}`
      }
    }
  }

  compareMinMaxPrices(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
      if (Number(formDataModelRef['propertyPriceMin']) > Number(formDataModelRef['propertyPriceMax']) && formDataModelRef[field.name] !== null) {
        Swal.fire({
          title: "Warning",
          text: "Maximum price should be greater than Minimum price",
          icon: "warning"
        }).then(()=> {
          formDataModelRef['properyPriceInText'] = `${this.numberFormatPipe.transform(formDataModelRef['propertyPriceMin'])}`
          formDataModelRef[field.name] = null
        })
      }
      console.log("inside compare max min prices",formDataModelRef['propertyPriceMin'],formDataModelRef['propertyPriceMax'])
  }
      

  onChangeFeatureYoutubeVideo(field: any, fieldValue: any, formDataModelRef: any, formControl: any){
    formDataModelRef['featureYoutubeVideoTitle'] = ""
    formDataModelRef['featureYoutubeVideoId'] = ""
    if(fieldValue){
      if(!fieldValue.includes("youtube.com") && !fieldValue.includes("youtu.be")){
        Swal.fire({
          title: "Warning",
          text: "Please only provide a youtube video link.",
          icon: "warning"
        }).then(()=>{
          formDataModelRef[field.name] = ""
        });
      }
      else{
        let youtubeVideoLink = fieldValue.split("&")[0]
        console.log("youtubeVideoLink--",youtubeVideoLink)
        console.log("this.getYouTubeVideoID(youtubeVideoLink)-=", this.getYouTubeVideoID(youtubeVideoLink))
        formDataModelRef[field.name] = youtubeVideoLink
        if(youtubeVideoLink && this.getYouTubeVideoID(youtubeVideoLink)){
          this.commonService.getYTVideoTitle(youtubeVideoLink, this.getYouTubeVideoID(youtubeVideoLink) || youtubeVideoLink).subscribe((res: any)=>{
            if(res.success){
              if(res.isValid){
                formDataModelRef['featureYoutubeVideoTitle'] = res.videoTitle
                formDataModelRef['featureYoutubeVideoId'] = this.getYouTubeVideoID(youtubeVideoLink) || ""
              }
              else{
                Swal.fire({
                  title: "Warning",
                  text: "Youtube video link is invalid.",
                  icon: "warning"
                })
              }
            }
          })
        }
        else{
          Swal.fire({
            title: "Warning",
            text: "Youtube video link not soupported.",
            icon: "warning"
          })
        }
      }
    }
  }

   getYouTubeVideoID(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

}


export interface ServiceMethods {
  [key: string]: (field: any, fieldValue: any, dataModel: any, formControl: any,projectCard:any) => void;
}
