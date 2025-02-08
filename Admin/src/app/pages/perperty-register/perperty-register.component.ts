import { map } from 'rxjs/operators';
import { ImgUploadComponent } from './../../components/img-upload/img-upload.component';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, model } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common-service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { PropertyRegistrationService, ServiceMethods } from '../../services/property-registration.service';
// import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { faFileCirclePlus, faL, faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-perperty-register',
  templateUrl: './perperty-register.component.html',
  styleUrl: './perperty-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ImgUploadComponent]
})
export class PerpertyRegisterComponent implements AfterViewInit,OnInit {

  selectedDate: Date | null = null;


  constructor(
    public commonService: CommonService,
    public router: Router,
    public registrationService: PropertyRegistrationService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private cdRef: ChangeDetectorRef,
    public configService: ConfigService
  ){
  }
  files: File[] = [];
  filePreviews: any = [];
  ProjectConfigCard:any = [{configuration:'selectConfiguration',configId:1,selectedPlanUrl:null}]
  uploadedFileSeq: number = 1;
  // propertyImages: any = []
  // configPlanPreview: any = {}
  imgUploadWindowHeight:any = {
   mainWindow:'300px',
   previewindow: '80px',
   previewImgHeight: '120px',
   mainWindowWidth:90
  }
  imgUploadWindowHeightCopy:any = {
    mainWindow:'150px',
    previewindow: '80px',
    previewImgHeight: '100px',
   mainWindowWidth:40
  }
  // configPlanFileName:string = ''
deleteIcon:any = faTrashCan
crossIcon:any = faXmark
fileAddIcon:any = faFileCirclePlus
  showMandatoryLabel: boolean = false
  selected: any
  fullPreviewImageIndex: any = null
  seletedFileUrl: any = null
  // coverImg:string = ''
  // imgArr: any = []
  imgarrayoutput: string[] = []
  coverImgOutput:string = ''
  plusIcon:any = faPlus
  htmlContent: any = ""
  mandatoryLabelText: string = "This field is required"
  // isCurrentUpoadInprogress: boolean = false
  addAdditionalFieldName: string = ""
  showAddAdditionalFieldInput: boolean = false
  coverImage: string = ""
  initialImgData:any = {}
  ngAfterViewInit() {

  }


  public currentUser: any = {}
  public mode: string = "add"
  public propertyId = ""
  public propertyData: any = {}
  ngOnInit() {
    this.authService.currentUser.subscribe((userData) => {
      this.currentUser = userData ?  userData.user : null;
      console.log("this.currentUser--", this.currentUser)
    });
    
    console.log("this.router.url--", this.router.url)
    if(this.router.url.includes("editProperty")){
      this.mode = "edit"

      this.route.queryParams.subscribe(params => {
        console.log(params); // { param1: 'value1', param2: 'value2' }

        // const propertyId = params['propertyid'];
        this.propertyId = params['propertyid'];
        this.commonService.startBlockUI("Loading..")
        this.commonService.findProperties({"propertyId": this.propertyId}, 1).subscribe((response: any)=>{

          
          this.commonService.stopBlockUI()
          if(response.success && response.data.length){
            this.propertyData = response.data[0]
            this.formDataModel = response.data[0].propertyDetails
            
            if (response.data[0].formConfig) {
              this.formControl = response.data[0].formConfig
            }
            console.log("propertyData--", this.propertyData)
            console.log("formDataModel--", this.formDataModel)

            
            this.initialImgData.propertyImageData = {
             imgArr : this.formDataModel.propertyImages,
             coverImg : this.formDataModel.coverImage  
            }

            this.additionalFields = this.formDataModel.additionalFields
            this.cdRef.detectChanges(); // Force update
            this.loadInitialEditorForm()
          }
          else{
            Swal.fire({
              title: "Error",
              text: "Something has went wrong.",
              icon: "error"
            })
          }
        })
      });
    }

  }


  assignObjectData(mainObject: any, copyObject: any){
    Object.keys(mainObject).forEach((key: any)=>{
      copyObject[key] = mainObject[key]
    })
  }

  addTagFieldValue: string = ""
  configurationsMultiselectData :any = [
{
  value:"1 Bhk",
  id:"1Bhk",
  selected:false
},
{
  value:"1.5 Bhk",
  id:"1.5Bhk",
  selected:false
},
{
  value:"2 Bhk",
  id:"2Bhk",
  selected:false
},
{
  value:"2.5 Bhk",
  id:"2.5Bhk",
  selected:false
},
{
  value:"3 Bhk",
  id:"3Bhk",
  selected:false
},
{
  value:"3.5 Bhk",
  id:"3.5Bhk",
  selected:false
},
{
  value:"4 Bhk",
  id:"4Bhk",
  selected:false
},
{
  value:"5 Bhk",
  id:"5Bhk",
  selected:false
}
  ]


  receiveImgData(data: { imgArr: any[], coverImg: string }, instance: string) {
    if (instance === 'propertyImgUpload') {
    this.formDataModel['propertyImages'] = data.imgArr
    this.formDataModel['coverImage'] = data.coverImg
    console.log(data.coverImg,"logging cover image --")
    } else if (instance === 'planImgUpload') {
      this.formDataModel['planImages'] = data.imgArr
      this.formDataModel['planCover'] = data.coverImg
    }
  }
  

  loadInitialEditorForm(){
    if (this.formDataModel.Configurations && this.formDataModel.Configurations.length) {
       this.configurationsMultiselectData.forEach((config:any) => {
        config.selected = this.formDataModel.Configurations.includes(config.value)
       });

    }



    for (let index = 0; index < this.registrationForm.length; index++) {
      const section = this.registrationForm[index];
      if(section.fields){
        for (let fieldIindex = 0; fieldIindex < section.fields.length; fieldIindex++) {
          const field = section.fields[fieldIindex];
          if(field.relationsWith && field.relationsWith.length){
            field.relationsWith.forEach((childField: any)=>{
              let childName = childField.childName
              let comboOptionsKey = childField.comboOptionsKey
              let comboData: any = this.dropdownValuesObject[comboOptionsKey]
              let childDropdownData = comboData[this.formDataModel[field.name]]
              if(childDropdownData && childDropdownData.length){
                this.dropdownValuesObject[childName] = childDropdownData
              }
            })
          }
        }
      }
    }
    if(this.formDataModel['property'] == "Building"){
      this.formControl.hidden.category = false
      this.formControl.mandatory.category = true
      // if(this.formDataModel['category'] == "Duplex"){
      //   this.formControl.hidden.subCategory = false
      //   this.formControl.mandatory.subCategory = true
      // }
      // else{
      //   this.formControl.hidden.subCategory = true
      //   this.formControl.mandatory.subCategory = false
      // }
    }
    else if(this.formDataModel['property'] == "Land/Plot"){
      this.formControl.hidden.category = true
      this.formControl.mandatory.category = false
    }
  }

 

  onClickCancel(){
    Swal.fire({
      title: "Are you sure?",
      text: "Your progress will be lost if you don't want to loose your progress you can save it in draft",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Don't save",
      confirmButtonText: "Save to draft",
      reverseButtons: true // Swaps the positions of the confirm and cancel buttons
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("do not discard")
        Swal.fire({
          title: "Saved to draft!",
          text: "Congratulations your property has been saved to draft. You can check it in your Menu/My listings",
          icon: "success"
        });
        this.router.navigate(['/'])
      }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.router.navigate(['/'])
      }
    });
  }

  onClickDiscard(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    Swal.fire({
      title: "Do you want to leave this page ?",
      text: "Your changes will not be saved until you click on update.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText:"Leave this page",
      confirmButtonText: "Stay on this page",
      reverseButtons: true // Swaps the positions of the confirm and cancel buttons
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("do not discard")
      }else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.location.back()
        console.log("testing button")
      }
    });
  }

  public additionalFields: any = [

  ]
  public formDataModel: any = {

  }

  public formControl: any = {
    "mandatory": {
      "property": true,
      "propertyType": true,
      "propertyPurpose": true,
      "dealerType": true,
      "propertyTitle": true,
      "propertyDescription": true,
      "city": true,
      "locality": true,
      "pincode": true,
      "properyPrice": true
    },
    "disabled": {
      "properyPriceInText": true,
      "landPricePerSqrft": true,
      "featureYoutubeVideoTitle": true,
    },
    "hidden": {
      "category": true,
      "Rooms":true,
      "CarpetArea":true,
      "SuperBuildupArea":true,
      "propertyPriceMin":true,
      "propertyPriceMax":true,
      "Configurations":true,
      "PossessionStatus":false,
      "PossessionDate":true
    }
  }

  public dropdownValuesObject: any = {
    "propertyTypeCombo": {
      "Building": [
        "Residential",
        "Commercial"
      ],
      "Land/Plot": [
        "Residential",
        "Commercial",
        "Agricultural",
      ]
    },
    "property":[
      "Land/Plot",
      "Building"
    ],

    "propertyPurpose": [
      "Sales"
    ],
    "dealerType": [
      "Owner",
      "Agent",
      "Builder"
    ],

    "city": [
      "Bhubaneswar",
      "Cuttack",
      "Puri"
    ],
    "cityLocalityCombo": {
      "Bhubaneswar": [
        "Acharya Vihar",
        "Aiginia",
        "Aiims",
        "airport",
        "Amanakuda Mouza",
        "Anda Bajpur",
        "Ashok Nagar",
        "Atala",
        "Badadhan pur",
        "Balianta",
        "Balakati",
        "Banqual",
        "Baramunda",
        "Begunia",
        "Bhanpur",
        "Bhimatangi",
        "Bhingarpur",
        "BHUBANESWAR PURI BYPASS",
        "Bomikhal",
        "bommasandra",
        "Botonda",
        "Chaitanya Prasad",
        "Chandaka",
        "Chandrasekharpur",
        "Chatabara",
        "Chatabara by pass road",
        "Chatrapur",
        "Cuttack to bhubaneswar",
        "Damana",
        "Daruthanga",
        "Dharitri vihar",
        "dhauli",
        "Dumduma",
        "Fire Station",
        "Fire Station Chhak",
        "Forest park",
        "Gadakana",
        "Gahira chhak",
        "Gangapada",
        "Ganjam",
        "GARAGE CHAKA",
        "Ghangapatana",
        "Godiapokhari",
        "Gohira chhaka",
        "Gothapatana",
        "Gothapatna",
        "Gudiapokhri",
        "gurudi jhatia",
        "hansapal",
        "Hansapala",
        "Hansapalo",
        "Hanspal",
        "Haripur",
        "info Valley",
        "Infocity",
        "Infovally",
        "Jagamara",
        "Janla",
        "Janla Infosys two",
        "Jasuapur",
        "Jatani gate",
        "Jatni",
        "JATNI MAIN GATE",
        "jay",
        "Jaydev Vihar",
        "Jharpada",
        "kaimatia",
        "Kalarahanga",
        "Kalinga Vihar",
        "kalpana squree",
        "kantabada",
        "Kapila Prasad",
        "Kashipur",
        "Kateni Square",
        "Kesura",
        "Khandagiri",
        "Khordha",
        "Khordha bologardha",
        "KHORDHA NH",
        "Khurda",
        "Koel Nagar Rourkela",
        "Kordha",
        "Kujimahal",
        "kuranga sasan",
        "laxmisagar",
        "Lingaraj",
        "Lingipur",
        "madanpur",
        "Mahalaxmipur, Khuntuni",
        "Malipada",
        "Mancheswar",
        "Mancheswar Railway Station, near Rajdhani Engineering College",
        "Master Canteen",
        "Nakhara",
        "Nandankanan",
        "Nandan vihar",
        "Nayapali",
        "New Railway Station",
        "niladri Vihar",
        "Nuagaon",
        "Old Town",
        "Padasahi",
        "Pagala",
        "pahal",
        "Pahala",
        "palashuni",
        "palasuni",
        "Palasuni,near reliencefress ",
        "Panchagaon",
        "Panchgaon",
        "Patharagadia",
        "Patia",
        "Patia, Raghunathpur",
        "Patia,kalarahanga",
        "Patia,Padasahi",
        "Patrapada",
        "PHULANAKHARA",
        "Pitapali",
        "Pittapali",
        "Podapada",
        "pokhariput",
        "PURI CUTTACK NH",
        "Raghunathpur",
        "Ranga Bazar",
        "rangabazar",
        "Rasulgarh",
        "Ravi Takies",
        "Rokot",
        "Rudrapur",
        "Saheed Nagar",
        "sahid Nagar",
        "sailashree vihar",
        "Samantarapur",
        "Sameigadia",
        "Satyabhamapur",
        "Satyanagar",
        "Shahid nagar",
        "Sijua maujaa",
        "Sishupalgarh",
        "Sum Hospital",
        "Sundarpada",
        "Sundarpur",
        "Tamando",
        "Tankapani",
        "tankapani road",
        "Tomando",
        "Uttara Chack",
        "Vani Vihar",
        "vimatangi",
        "vss nagar"
    ],
      "Cuttack": [
        "Andhei Sahi",
        "Arundeyo Calony",
        "athgarh",
        "Bamphakuda",
        "banki",
        "Baranga",
        "Baula",
        "Bayalishi mouza",
        "Belagachhia",
        "Bhanapur",
        "cda",
        "Chhatia",
        "Choudwar",
        "Dhurusia,Athagad",
        "Emam nagar",
        "Gatiroutpatna",
        "Gopalpur",
        "Grand Rivera",
        "gurudijhatia",
        "Jagatpur",
        "Jaripada",
        "Kafla",
        "kandarpur",
        "Kanheipur",
        "Khuntuni",
        "Kuspangi",
        "Mahanadivihar",
        "Megha",
        "Mouza",
        "NayaBazar",
        "Near Rahama",
        "Nirgundi",
        "NTPC KANIHA",
        "Nuapatana",
        "Olatpur",
        "OMP",
        "Paikarapur, Tapenda",
        "Peyton Sahi",
        "Phulnakhara",
        "Pira Bazar",
        "Prafesorpara",
        "Pratap Nagari",
        "Press Chhak",
        "Professorpara",
        "Salepur",
        "Sharam nagar",
        "Shelter Chhak",
        "Tangi",
        "Trisulia",
        "Trysulya",
        "Urali"
    ],
    "Puri": [
        "Algum Sakhigopal",
        "Alugum, sakhigopal",
        "Baliapanda, Sipasrubali",
        "Balighai chouk",
        "Balighat",
        "Balipatana,saripur",
        "Jaunli Pokhari",
        "Kashi Jaganatha",
        "Lokanath",
        "malatipatpur",
        "matitota",
        "Nimapara",
        "Omkareshwar Temple",
        "Ranapur",
        "Sakhigopal",
        "Sankarpur",
        "Talabania"
    ]
    },
    "propertyTypeCategoryCombo":{
      "Residential":[
        "Flat",
        "Apartment/Project",
        "Duplex",
        "Triplex",
        "Independent house"
      ],
      "Commercial":[
        "Office Spaces",
        "Shops",
        "Godowns"
      ]
    },
    "Rooms": [
      "1 bhk",
      "1.5 bhk",
      "2 bhk",
      "2.5 bhk",
      "3 bhk",
      "3.5 bhk",
      "4 bhk",
      "4.5 bhk",
      "5 bhk",
      "5bhk+"
    ],
    "PossessionStatus":[
 "Under Construction",
 "Ready to move"
    ],
    "reraApproved": [
      "Yes",
      "No"
    ]
  }
  public registrationForm: any = [
    {
      "sectionName": "generalInfo",
      "label": "General Info",
      "fields": [
        {
          "name": "property",
          "label": "Property",
          "type": "dropdown",
          "relationsWith": [
            {
              "childName": "propertyType",
              "comboOptionsKey": "propertyTypeCombo"
            }
          ],
          "event": {
            "change": "onChnageProperty"
          }
        },
        {
          "name": "propertyType",
          "label": "Property Type",
          "type": "dropdown",
          "relationsWith": [
            {
              "childName": "category",
              "comboOptionsKey": "propertyTypeCategoryCombo"
            }
          ],
        },
        {
          "name": "category",
          "label": "Category",
          "type": "dropdown",
          "event": {
            "change": "onCangeCategory"
          }
        },
      
        {
          "name": "propertyPurpose",
          "label": "Property Purpose",
          "type": "dropdown"
        },
        {
          "name": "dealerType",
          "label": "Dealer Type",
          "type": "dropdown"
        },
        {
          "name": "propertyTitle",
          "label": "Property Title",
          "type": "textfield",
          "event": {
            "blur": "onAddPropertyTitle"
          }
        },
        {
          "name": "propertyDescription",
          "label": "Property Description",
          "type": "textarea"
        }
      ]
    },
    {
      "sectionName": "locationInfo",
      "label": "Location Info",
      "fields": [
        {
          "name": "city",
          "label": "City",
          "type": "dropdown",
          "relationsWith": [
            {
              "childName": "locality",
              "comboOptionsKey": "cityLocalityCombo"
            }
          ]
        },
        {
          "name": "locality",
          "label": "Locality",
          "type": "dropdown"
        },
        {
          "name": "pincode",
          "label": "Pincode",
          "type": "textfield",
          "event": {
            "keyup": "checkPincode"
          }
        },
        {
          "name": "address",
          "label": "Address",
          "type": "textarea"
        },
        {
          "name": "nearByAreas",
          "label": "Near By Area's",
          "type": "textarea"
        },
        {
          "name": "reraApproved",
          "label": "Rera Approved",
          "type": "dropdown"
        }
      ]
    },
    {
      "sectionName": "detailInfo",
      "label": "Detail Info",
      "fields": [
        {
          "name":"LandArea",
          "label":"Land Area (Sq. Ft.)",
          "type":"textfield",
          "event": {
            "keyup": "checkLandArea"
          }
        },
        {
          "name":"SuperBuildupArea",
          "label":"Super buildup Area (Sq. Ft.)",
          "type":"textfield",
          "event": {
            "keyup": "checkLandArea"
          }
        },
        {
          "name": "CarpetArea",
          "label": "Carpet Area (Sq. ft.)",
          "type": "textfield",
          "event": {
            "keyup": "checkLandArea"
          }
        },
        {
          "name": "Rooms",
          "label": "Rooms",
          "type": "dropdown"
        },
        {
          "name": "PossessionStatus",
          "label": "Possession Status",
          "type": "dropdown",
          "event":{
            "change": "toggleDatePicker"
          }
        },
        // {
        //   "name": "PossessionDate",
        //   "label": "Please select a possession date",
        //   "type": "datepicker"
        // },
        {
          "name":"Configurations",
          "label":"Configurations",
          "type":"projectConfig"
        },
        {
          "name": "properyPrice",
          "label": "Enter Price (₹)",
          "type": "textfield",
          "event": {
            "keyup": "checkProperyPrice"
          }
        },
        {
          "name":"propertyPriceMin",
          "label": "Min price",
          "type":"textfield",
          "event":{
            "keyup":"checkPropertyPriceMin"
          }
        },
        {
          "name":"propertyPriceMax",
          "label": "Max price",
          "type":"textfield",
          "event":{
            "keyup":"checkPropertyPriceMax",
            "blur":"compareMinMaxPrices"
          }
        },
        {
          "name": "properyPriceInText",
          "label": "Price In Rupees",
          "type": "textfield",
        },
        {
          "name": "landPricePerSqrft",
          "label": "Price Per Sq. ft.",
          "type": "textfield",
          "event":{
            "blur":"convertToSqft",
            "focus":"convertToNum",
            "keyup":"checkString"
          }
        },
        {
          "name": "featureYoutubeVideo",
          "label": "Feature Video",
          "type": "textfield",
          "placeholder": "Please provide a youtube video link",
          "event": {
            "change": "onChangeFeatureYoutubeVideo"
          }
        },
        {
          "name": "featureYoutubeVideoTitle",
          "label": "Feature Video Title",
          "type": "textfield",
        }
      ]
    }
  ]

  onChangeConfigurationSelection(){
   let selectedConfigArr = this.configurationsMultiselectData.filter((config:any) => config.selected).map((config:any) => config.value)
   this.formDataModel.Configurations = selectedConfigArr
  }
  

  onTryPublish(){
 
    for (let sectionIndex = 0; sectionIndex < this.registrationForm.length; sectionIndex++) {
      const section = this.registrationForm[sectionIndex];
      if(section.fields){
        for (let fieldIndex = 0; fieldIndex < section.fields.length; fieldIndex++) {
          const field = section.fields[fieldIndex];
     
          if(this.formControl.mandatory[field.name] && (!this.formDataModel[field.name] || this.formDataModel[field.name] instanceof String  && !this.formDataModel[field.name].trim().length )){
            console.log(field.name,this.formDataModel,"logging formdataModel")
            Swal.fire({
              title: "Warning",
              text: "Please fill all mandatory fields.",
              icon: "warning"
            })
            let element = document.getElementById("registration-form-section")
            if(element) element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            this.showMandatoryLabel = true
            return
          }
        }
      }
    }
    if(this.formDataModel.propertyImages && !this.formDataModel.propertyImages.length){
      Swal.fire({
        title: "Warning",
        text: "Please select atleast one picture.",
        icon: "warning"
      })
      let element = document.getElementById("add-img-window")
      if(element) element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
      return
    }

    console.log(this.formDataModel,"logging form data medel ------------------------------------")

    this.publishFormData()
  }

  onDateChange(date: Date){
   // Correct `DateTimeFormatOptions`
const options: Intl.DateTimeFormatOptions = {
  day: '2-digit', // Use '2-digit' for two-digit days
  month: 'short', // Use 'short' for abbreviated month names (e.g., Dec)
  year: 'numeric', // Use 'numeric' for the full year (e.g., 2024)
};

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

this.formDataModel['possessionDate'] = formattedDate
  }


  publishFormData(){

    console.log(this.formControl,"logging form control while publishing .....")
    this.formDataModel['additionalFields'] = this.additionalFields
    this.commonService.startBlockUI("Starting ...")
    let saveFormModel = {
      "propertyDetails": this.formDataModel,
      "publishedBy": this.currentUser ? `${this.currentUser.firstName} ${this.currentUser.lastName}`  : 'admin',
      "publishedOn": new Date(),
      "publisherEmailId": this.currentUser.email,
      "formConfig":this.formControl
    }

    this.commonService.addProperty(saveFormModel, this.currentUser.id).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("res from publish --", res)
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Property registration successful",
          showConfirmButton: true
        }).then(()=>{
          if(res.success){
            if(res.data.slug){
              window.open(`${this.configService.get("Main_Site_Url")}/property/${res.data.slug}` , "_self")
              // this.router.navigate(['/property'], { queryParams: {
              //   "propertyid" : res.data.propertyId
              // }});
            }
            else{
              window.open(`${this.configService.get("Main_Site_Url")}` , "_self")
            }
          }
          else{
            Swal.fire({
              title: "Error",
              text: "Something has went wrong.",
              icon: "error"
            })
          }
        });
      }
      else{
        Swal.fire({
          title: "Error",
          text: "Something has went wrong.",
          icon: "error"
        })
      }
    })
  }

  onTryUpdate(){
  
    for (let sectionIndex = 0; sectionIndex < this.registrationForm.length; sectionIndex++) {
      const section = this.registrationForm[sectionIndex];
      if(section.fields){
        for (let fieldIndex = 0; fieldIndex < section.fields.length; fieldIndex++) {
          const field = section.fields[fieldIndex];
          if(this.formControl.mandatory[field.name] && (!this.formDataModel[field.name] ||  this.formDataModel[field.name] instanceof String && !this.formDataModel[field.name].trim().length)){
            Swal.fire({
              title: "Warning",
              text: "Please fill all mandatory fields.",
              icon: "warning"
            })
            let element = document.getElementById("registration-form-section")
            if(element)
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            this.showMandatoryLabel = true
            return
          }
        }
      }
    }
  
    this.updateFormData()
  }

  recieveImgArr(event:any){
   console.log(event,"recieving images array in property register --")
  }

  updateFormData(){
let patchFormConfig
    if (!this.propertyData.formConfig) {
           patchFormConfig = this.formControl
    }else{
      patchFormConfig = null
    }

    // this.formDataModel['propertyImages'] = this.propertyImages
    // this.formDataModel['coverImage'] = this.coverImage

    this.formDataModel['additionalFields'] = this.additionalFields
    this.commonService.startBlockUI("Starting ...")
    this.commonService.updateProperty(this.propertyData.slug ,this.propertyId, this.formDataModel,patchFormConfig).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("res from publish --", res)
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Property Updated Succesfully",
          showConfirmButton: true
        }).then(()=>{
          if(this.propertyData.slug){
            window.open(`${this.configService.get("Main_Site_Url")}/property/${this.propertyData.slug}` , "_self")
            // this.router.navigate(['/property'], { queryParams: {
            //   "propertyid" : this.propertyId
            // }});
          }
          else{
            window.open(`${this.configService.get("Main_Site_Url")}` , "_self")
            // this.router.navigate(['/']);
          }
        });
      }
      else{
        Swal.fire({
          title: "Error",
          text: "Something has went wrong.",
          icon: "error"
        })
      }
    })
  }

  onRelationalValueSelected(field: any, fieldValue: string){
    // this.formControl.hidden.category = true
    console.log("field.relationsWith && field.relationsWith.length-", field.relationsWith && field.relationsWith.length,this.formControl)
    if(field.relationsWith && field.relationsWith.length){
      field.relationsWith.forEach((childField: any)=>{
        let childName = childField.childName
        console.log("childName--", childName)
        let comboOptionsKey = childField.comboOptionsKey
        let comboData: any = this.dropdownValuesObject[comboOptionsKey]
        let childDropdownData = comboData[fieldValue]
        console.log("childDropdownData--", childDropdownData)
        delete this.formDataModel[childName]
        if(childDropdownData && childDropdownData.length){
          this.dropdownValuesObject[childName] = childDropdownData
        }
      })
    }
  }


  onCickRemoveSelectedValue(field: any){
    let relationsWith = field.relationsWith || []
    this.formDataModel[field.name] = null
    relationsWith.forEach((element: any)=>{
      this.formDataModel[element.childName] = null
    })
  }


  handleFormEvent(field: any, type:string) {
    let fieldValue = this.formDataModel[field.name]
    if (field && field.event && field.event[type]) {
      // Dynamically call the service method
      const methodName = field.event[type];
      console.log(methodName,fieldValue,"inside handle form event --")
      
      const serviceMethods = this.registrationService as unknown as ServiceMethods;
      if (typeof serviceMethods[methodName] === 'function') {
        let test = "123"
        serviceMethods[methodName](field, fieldValue, this.formDataModel, this.formControl,this.ProjectConfigCard);
      } else {
        console.error(`Method ${methodName} not found on PropertyRegistrationService`);
      }
    }
  }

  addAdditionalField(){
    this.additionalFields.push({
      "label": this.addAdditionalFieldName,
      "value": ""
    })
    this.addAdditionalFieldName = ""
    this.showAddAdditionalFieldInput = false
  }

  removeAdditionalField(index: number){
    this.additionalFields.splice(index, 1)
  }

  onSetAsCoverClick(fileUrl:any){
    this.coverImage = fileUrl
  }

  onAddTag(){
    console.log("add tag clicked", this.addTagFieldValue)
    if(this.formDataModel['postTags'] && this.formDataModel['postTags'].length){
      this.formDataModel['postTags'].push(this.addTagFieldValue)
    }
    else{
      this.formDataModel['postTags'] = [this.addTagFieldValue]
    }
    this.addTagFieldValue = ""
  }

  onClickRemoveTag(index: number){
    this.formDataModel['postTags'].splice(index, 1)
  }
}
