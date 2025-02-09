import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonService } from '../../services/common-service';
import { PostService } from '../../services/post.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
// import { Editor, NgxEditorModule } from "ngx-editor";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-rich-text-editor',
  standalone: false,
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss'
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  // public editor: Editor = new Editor();
  quillModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'header': [1, 2, 3, 4, 5, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['clean']  
      ],
      handlers: {
        image: this.imageHandler.bind(this), // Custom image handler
      },
    },
  };
  quillInstance: any; // Store the Quill instance
  constructor (
    public commonService: CommonService,
    public postService: PostService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ){

  }

  public formDataModel : any = {
    postDetails: {
      content : ""
    }
  }

  contentControl = new FormControl('');
  editorContent: string = '<p>Initial content</p>';

  public currentUser: any = {}

  postId: string = ""
  isEditMode: boolean = false

  ngOnInit(): void {
    // this.editor = new Editor();
    this.authService.currentUser.subscribe((userData) => {
      this.currentUser = userData ?  userData.user : null;
      console.log("this.currentUser--", this.currentUser)
    });

    this.route.queryParams.subscribe((params) => {
      // Check if the query param 'category' is provided
      if (params['postId']) {
        this.postId = params['postId'];
        this.isEditMode = true;
        this.fetchPostDetails();
      } else {
        this.isEditMode = false;
      }

      console.log("this.postId--", this.postId)
    });
    
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    // this.editor.destroy();
  }

  onEditorCreated(quill: any) {
    this.quillInstance = quill;
  }

  submitForm(){
    // console.log(this.content);
  }
  isCurrentUpoadInprogress: boolean = false
  imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
  
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (file) {
        // Replace with your API endpoint
        const formData = new FormData();
        formData.append('file', file);
        console.time("upload time")
        this.isCurrentUpoadInprogress = true
        this.commonService.uploadImage(formData).subscribe((response: any) => {
          console.log("respnse from upload --", response)
          this.isCurrentUpoadInprogress = false
          if (response.success) {
            let url = response.result.secure_url
            const quill =  this.quillInstance;
            const range = quill.getSelection() || { index: 0 };
            // Use the uploaded image URL from the server response
            quill.insertEmbed(range.index, 'image', url);
            const [image] = quill.root.querySelectorAll(`img[src="${url}"]`);
            if (image) {
              // Add custom styles here
              image.style.display = 'block';
              image.style.width = '100%';
              image.style.borderRadius = '8px';
              image.style.margin = '50px auto';
            }
          }
        });
      }
    });

    input.click();
  }

  onPostTitleChange(event: any){
    let title = this.formDataModel.postDetails.title 
    this.formDataModel.slug = this.postService.getSlug(title)
  }

  onContentChanged(event: any): void {
    console.log("onContentChanged--", event)
    this.formDataModel.postDetails["content"] = event.html.replace(/&nbsp;/g, ' ');
    console.log("this.formDataModel.postDetails['content']--", this.formDataModel.postDetails["content"])

  }

  formatHtmlContent(content: string){
    return content.replace(/&nbsp;/g, ' ');
  }

  onPublishPost(){
    console.log("onPublishPost", this.formDataModel)
        this.commonService.startBlockUI("Starting ...")
        console.log("''this.formDataModel.postDetails.content---", this.formDataModel.postDetails.content)
        let formattedContent: any = this.formatHtmlContent(this.formDataModel.postDetails.content);
        // console.log("formattedContent--", formattedContent.changingThisBreaksApplicationSecurity)
        this.formDataModel.postDetails["content"] = formattedContent
        this.formDataModel.postDetails["postStatus"] = "published"
        this.formDataModel["postTags"] = ["Landtreat", "Real Estate", "Property"]
        this.formDataModel["publishedOn"] = new Date()
        this.formDataModel["updatedOn"] = new Date()
        this.formDataModel["publishedBy"] = this.currentUser ? `${this.currentUser.firstName} ${this.currentUser.lastName}`  : 'admin'
        this.formDataModel["publisherEmailId"] = this.currentUser.email
        this.formDataModel["categories"] = this.currentUser.email
        this.formDataModel["isPublished"] = true
        this.formDataModel["isTrash"] = false
        this.commonService.addPost(this.formDataModel, this.currentUser.id).subscribe((res: any)=>{
          this.commonService.stopBlockUI()
          console.log("res from publish --", res)
          if(res.success){
            Swal.fire({
              icon: "success",
              title: "Post Published successful",
              showConfirmButton: true
            }).then(()=>{
              if(res.success){
                if(res.data.propertyId){
                  // this.router.navigate(['/property'], { queryParams: {
                  //   "propertyid" : res.data.propertyId
                  // }});
                }
                else{
                  // this.router.navigate(['/']);
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

  onUpdatePost(){
    this.commonService.startBlockUI("Starting ...")
    let formattedContent: any = this.formatHtmlContent(this.formDataModel.postDetails.content);
    // console.log("formattedContent--", formattedContent.changingThisBreaksApplicationSecurity)
    this.formDataModel.postDetails["content"] = formattedContent
    this.commonService.updatePost(this.formDataModel.slug, this.postId,  this.formDataModel.postDetails).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("res from publish --", res)
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Post Updated successful",
          showConfirmButton: true
        }).then(()=>{
          if(res.success){
            if(res.data.propertyId){
              // this.router.navigate(['/property'], { queryParams: {
              //   "propertyid" : res.data.propertyId
              // }});
            }
            else{
              // this.router.navigate(['/']);
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

  onSaveDraft(){

  }

  onFeatureFileinput(event: any): void {
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
            this.isCurrentUpoadInprogress = true
            this.commonService.uploadImage(formData).subscribe((response: any) => {
              console.log("respnse from upload --", response)
              this.isCurrentUpoadInprogress = false
              if (response.success) {
                let url = response.result.secure_url
                this.formDataModel.postDetails.featuredImage = url
              }
            });
          }
        }, 150);

    } catch (error) {
      console.log("error-", error)
    }
  }

  fetchPostDetails(){
    this.commonService.fetchPosts({postId: this.postId}, 1).subscribe((postResponsive: any) => {
      // Handle the fetched posts
      console.log(postResponsive);
      if(postResponsive && postResponsive.success && postResponsive.data && postResponsive.data.length) {
        this.formDataModel = postResponsive.data[0];
        console.log("this.formDataModel--", this.formDataModel)
        // this.editorContent = this.formDataModel.postDetails.content
      }
    });
  }
}
