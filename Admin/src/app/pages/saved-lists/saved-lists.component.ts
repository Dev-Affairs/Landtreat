import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saved-lists',
  standalone: false,
  
  templateUrl: './saved-lists.component.html',
  styleUrl: './saved-lists.component.scss'
})
export class SavedListsComponent implements OnInit{


  constructor(
    public commonService: CommonService,
        public router: Router
  ){

  }
  ngOnInit(): void {
    this.fetchSavedItems()
  }

  isFilterActive: boolean = false
  isFilterQueryApplyed: boolean = false
  public dataSet: any = [
  ]

  onAddNewSavedItem(){
    
  }

  public filterModel: any = {

  }

  public filterConfig: any= [
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
    }
  ]

  fetchSavedItems(query? : any){
    let featchQuery = query || {}
    featchQuery['isTrash'] = false
    this.commonService.fetchSavedItem(featchQuery).subscribe((res: any)=>{
      console.log("saved items>>", res)
      if(res.success && res.data && res.data.length){
        this.dataSet = res.data
      }
      else{
        this.dataSet = []
      }
    })
  }

  onEditItem(item: any){
    this.router.navigate(['/savedItem'], { queryParams: {
      "id" : item.SavedItemId
    }});
  }

  onDeleteSavedForm(item: any){
      let updateData = {
        "$set": {
          "isTrash": true
        }
      }
      this.commonService.updateSavedItem(updateData, item.SavedItemId).subscribe((res: any)=>{
        this.commonService.stopBlockUI()
        console.log("res from publish --", res)
        if(res.success){
          Swal.fire({
            icon: "success",
            title: "Saved Item Removed successfully",
            showConfirmButton: true
          }).then(()=>{
            if(res.success){
              this.fetchSavedItems()
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


    onClickApplyFilter(){
      this.isFilterActive = true
    }

    onClickSubmitFilter(){
      console.log("this filterModel", this.filterModel)
      let query: any = {}
      Object.keys(this.filterModel).forEach((key: any)=>{
        if(this.filterModel[key] && this.filterModel[key].length){
          this.isFilterQueryApplyed = true
          query['SavedItemDetails.'+ key] = {
            "$regex": this.filterModel[key]
          }
        }
      })

      if(this.isFilterQueryApplyed){
        this.fetchSavedItems(query)
      }
      this.isFilterActive = false
    }

    onClickResetFilter(){
      this.isFilterQueryApplyed = false
      this.isFilterActive = false
      this.fetchSavedItems()
    }
}
