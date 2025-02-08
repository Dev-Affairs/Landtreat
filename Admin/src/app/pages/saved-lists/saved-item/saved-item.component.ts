import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common-service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-saved-item',
  standalone: false,
  
  templateUrl: './saved-item.component.html',
  styleUrl: './saved-item.component.scss'
})
export class SavedItemComponent implements OnInit{

  constructor(
    public commonService: CommonService,
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ){

  }

  currentUser: any
  SavedItemId: any
  isEditMode: boolean =  false
  ngOnInit(): void {
    this.authService.currentUser.subscribe((userData) => {
      this.currentUser = userData ?  userData.user : null;
      console.log("this.currentUser--", this.currentUser)
    });

    this.route.queryParams.subscribe((params) => {
      // Check if the query param 'category' is provided
      if (params['id']) {
        this.SavedItemId = params['id'];
        this.isEditMode = true;
        this.findItemByID();
      } else {
        this.isEditMode = false;
      }
    });
  }

  public formHeaderText: any = "Add New Item"

  public dataModel: any = {

  }
  public formConfig: any= [
    {
      "name": "title",
      "text": "Title",
      "type": "textfield"
    },
    {
      "name": "description",
      "text": "Description",
      "type": "textarea"
    },
    {
      "name": "city",
      "text": "City",
      "type": "textfield"
    },
    {
      "name": "locality",
      "text": "Locality",
      "type": "textfield"
    },
    {
      "name": "type",
      "text": "Type",
      "type": "textfield"
    },
    {
      "name": "catagory",
      "text": "Catagory",
      "type": "textfield"
    },
    {
      "name": "address",
      "text": "Address",
      "type": "textarea"
    },
    {
      "name": "landArea",
      "text": "Land Area (Sq. Ft.)",
      "type": "textfield"
    },
    {
      "name": "price",
      "text": "Price",
      "type": "textfield"
    },
    {
      "name": "links",
      "text": "Links",
      "type": "textarea"
    },
  ]

  onSaveItemForm(){

    console.log("form >>", this.dataModel)

    this.dataModel['publishedBy'] = this.currentUser.firstName + " "  + this.currentUser.lastName
    this.dataModel['publisherEmailId'] = this.currentUser.email
    this.commonService.addSavedItem(this.dataModel).subscribe((res: any)=>{
          this.commonService.stopBlockUI()
          console.log("res from publish --", res)
          if(res.success){
            Swal.fire({
              icon: "success",
              title: "Saved Item Added successfully",
              showConfirmButton: true
            }).then(()=>{
              if(res.success){
                this.router.navigate(['/savedLists']);
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

  findItemByID(){
    this.commonService.fetchSavedItem({SavedItemId: this.SavedItemId}, 1).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("fetch itme --", res)
      if(res.success  && res.data  && res.data.length){
        this.dataModel = res.data[0].SavedItemDetails
      }
    })
  }

  onUpdateSavedForm(){
    let updateData = {
      "$set": {
        "SavedItemDetails": this.dataModel
      }
    }
    this.commonService.updateSavedItem(updateData, this.SavedItemId).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("res from publish --", res)
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Saved Item Updated successfully",
          showConfirmButton: true
        }).then(()=>{
          if(res.success){
            this.router.navigate(['/savedLists']);
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

}
