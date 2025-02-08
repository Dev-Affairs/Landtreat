import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPlus, faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../../services/common-service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-configurations',
  standalone: false,
  
  templateUrl: './contact-configurations.component.html',
  styleUrl: './contact-configurations.component.scss'
})
export class ContactConfigurationsComponent implements OnInit {

  constructor(
    public commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {

  }
  ngOnInit(): void {
    this.commonService.findConfig(1).subscribe((response: any) => {
      console.log("response--", response)
      if (response.success && response.data)
        this.appConfigurations = response.data.config || {};
    })
  }

  public appConfigurations: any = {

  }

  public faPlus = faPlus;
  public faStar = faStar;
  public faTrash = faTrash;
  public faEdit = faEdit;

  dynamicModalTemplate!: TemplateRef<any>;
  modalActions: any = {
    "testimonialModal": {
      "text": "Testimonial",
      "mode": "add",
      "activeState": false
    }
  }


  activeModal: any = {
    dataModel: {

    }
  }

  makeActiveModal(modalName: any, mode: string, template: TemplateRef<any>, data?: any) {
    this.dynamicModalTemplate = template
    this.activeModal = this.modalActions[modalName]
    
    this.activeModal['mode'] = mode
    data ? (this.activeModal['dataModel'] = data) : (this.activeModal['dataModel'] = {})
    this.activeModal['activeState'] = true
  }


  onUpdateAppConfigurations() {
    this.commonService.updateConfig(1, this.appConfigurations).subscribe((response: any) => {
      console.log("response--", response)
      if (response.success) {
        Swal.fire({
          title: "Updated",
          text: "Landing Configuration updated successfully",
          icon: "success"
        });
      }
    })
  }

  onAddTestimonial(dataModel: any){
    console.log("onAddTestimonial--", dataModel)
    if(this.appConfigurations.testimonials){
      this.appConfigurations.testimonials.push(dataModel)
    }
    else{
      this.appConfigurations.testimonials = [dataModel]
    }
    console.log("this.appConfigurations.testimonials--", this.appConfigurations.testimonials)
    this.activeModal.activeState = false
  }
  
  onUpdateTestimonial(dataModel: any){
    console.log("onAddTestimonial--", dataModel)
    this.appConfigurations.testimonials[this.activeModal.dataIndex] = dataModel
    this.activeModal.activeState = false
  }

  onEditTesimonial(testimonial: any,  template: TemplateRef<any>, dataIndex: number){
    this.makeActiveModal('testimonialModal', 'edit', template, JSON.parse(JSON.stringify(testimonial)))
    this.activeModal['dataIndex'] =  dataIndex
  }

  onDeleteTesimonial(index:number){
    this.appConfigurations.testimonials.splice(index, 1)
  }

  onTestimonialUserFileinput(event: any): void {
    console.log("is it working")
    try {
      let files = Array.from(event.target.files);
      let file: any = files[0]

        setTimeout(() => {
          if (file) {
            // Replace with your API endpoint
            const formData = new FormData();
            formData.append('file', file);
            console.time("upload time")
            this.commonService.uploadImage(formData).subscribe((response: any) => {
              console.log("respnse from upload --", response)
              if (response.success) {
                let url = response.result.secure_url
                this.activeModal['dataModel'].image =  url
              }
            });
          }
        }, 150);

    } catch (error) {
      console.log("error-", error)
    }
  }

  onUpdateHeroImage(event: any): void {
    console.log("is it working")
    try {
      let files = Array.from(event.target.files);
      let file: any = files[0]

        setTimeout(() => {
          if (file) {
            // Replace with your API endpoint
            const formData = new FormData();
            formData.append('file', file);
            console.time("upload time")
            this.commonService.uploadImage(formData).subscribe((response: any) => {
              console.log("respnse from upload --", response)
              if (response.success) {
                let url = response.result.secure_url
                this.appConfigurations.hero.image =  url
              }
            });
          }
        }, 150);

    } catch (error) {
      console.log("error-", error)
    }
  }
}
