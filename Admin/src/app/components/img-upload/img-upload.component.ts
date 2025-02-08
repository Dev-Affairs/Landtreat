import { map } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild, input, EventEmitter } from '@angular/core';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../../services/common-service';
// import { MatButton } from '@angular/material/button';
import gsap from 'gsap';
import Swal from 'sweetalert2';
import { combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.scss',
  imports: [CommonModule, FormsModule]

})
export class ImgUploadComponent implements OnInit, AfterViewInit {
  seletedFileUrl: any = null
  isCurrentUpoadInprogress: boolean = false
  hideImagePriviewSection: boolean = false
  deleteIcon: any = faTrashCan
  files: File[] = [];
  uploadedFileSeq: number = 1;
  selectedFile: any
  propertyImages: any = []
  fullPreviewImageIndex: any = null
  imgPreviewFrameHeight: string = ''
  previewImageHeight: string = ''
  previewImageWidth: string = ''
  coverImgHeight: string = ''
  mainWindowWidth: any = 0
  crossIcon: any = faXmark

  @Input() initialImgData: any = {}
  @Input() imgUploadWindowHeight!: any


  @Output() imgDataOutput = new EventEmitter<{ imgArr: any[], coverImg: string }>();
  @ViewChild('horizontalScroll', { static: false }) horizontalScroll: ElementRef<HTMLDivElement> | any;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  // Local variables for internal state
  localImgArr: any[] = [];
  localCoverImage: string = ''
  filePreviews: any[] = [];
  selectedFileUrl: string | null = null;


  emitImgData() {
    this.imgDataOutput.emit({
      imgArr: [...this.localImgArr],
      coverImg: this.localCoverImage || '',
    });
  }

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    let units = this.imgUploadWindowHeight.previewindow

    let mainWindowHeight = parseFloat(units)
    this.previewImageWidth = this.imgUploadWindowHeight.previewImgHeight
    let unitString = units.match(/[a-zA-Z]+/g)?.join('') || '';

    this.coverImgHeight = this.imgUploadWindowHeight.mainWindow
    this.imgPreviewFrameHeight = `${mainWindowHeight}${unitString}`
    this.previewImageHeight = `${mainWindowHeight - 10}${unitString}`
    this.mainWindowWidth = `${this.imgUploadWindowHeight.mainWindowWidth}%`
  }

  // deleteBtnHover(button:MatButton){
  // console.log("mouse enter --")
  // console.log(button._elementRef.nativeElement)
  // let deleteIconElement = button._elementRef.nativeElement.querySelector('.deleteIcon')
  // let crossIconElement = button._elementRef.nativeElement.querySelector('.crossIcon')
  // gsap.timeline({}).to(crossIconElement,{
  //   top:"65px"
  // }).to(deleteIconElement,{
  //   opacity:1
  // },"-=0.5")
  // }

  // deleteBtnLeave(button:MatButton){
  //   let deleteIconElement = button._elementRef.nativeElement.querySelector('.deleteIcon')
  //   let crossIconElement = button._elementRef.nativeElement.querySelector('.crossIcon')

  //   gsap.timeline({}).to(deleteIconElement,{
  //     opacity:0
  //   }).to(crossIconElement,{
  //     top:"50%",
  //     left:"50%",
  //     transform:"translateY(-50%)translateX(-50%)"
  //   },"-=0.5")
  // }

  hoverImgPreview(imgPreviewEle: HTMLElement) {
    let deleteBtn = imgPreviewEle.getElementsByTagName('button')[0]

    console.log(deleteBtn)
    gsap.to(deleteBtn, {
      transform: "scale(0.9)",
      opacity: 1,
      duration: 0.4
    })

  }

  leaveImgPreview(imgPreviewEle: HTMLElement) {
    let deleteBtn = imgPreviewEle.getElementsByTagName('button')[0]

    console.log(deleteBtn)
    gsap.to(deleteBtn, {
      transform: "scale(0.3)",
      opacity: 0,
      duration: 0.4
    })
  }

  test2() {
    console.log("mouse leave --")
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.localCoverImage = this.initialImgData.coverImg
      this.selectedFileUrl = this.localCoverImage
      this.localImgArr = [...this.initialImgData.imgArr]

      console.log(this.localImgArr, "logging local image array ----")

      this.filePreviews = this.localImgArr.map((e: any) => {
        return {
          name: "",
          isUploadCompleted: true,
          fileUrl: e
        }
      })

      this.emitImgData()
    }, 500);
    this.addScrollEventListener()

  }

  addScrollEventListener() {
    if (this.horizontalScroll) {
      this.horizontalScroll.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
        if (event.deltaY != 0) {
          event.preventDefault();
          this.horizontalScroll.nativeElement.scrollLeft += (event.deltaY + event.deltaX);
        }
      });
    }
  }

  extractCoverImg() {

  }


  onSetAsCoverClick(fileUrl: any) {
    // this.coverImg = fileUrl
    this.localCoverImage = fileUrl
    // this.coverImgOutput.emit(this.localCoverImage)
    // this.imgDataOutput.emit()
    this.emitImgData()
  }

  onClickOpenFile(fileContent: any) {
    console.log(this.filePreviews)
    window.open(fileContent, "_blank")
  }

  onClickAddImg() {
    this.fileInput.nativeElement.click();
  }

  onDeleteImg(file: any) {
    Swal.fire({
      title: "Are you sure?",
      text: `Your image ${file.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `${file.name} has been deleted.`,
          icon: "success"
        }).then(() => {

          this.filePreviews = this.filePreviews.filter((File) => File.fileUrl != file.fileUrl)
          this.localImgArr = this.localImgArr.filter((fileUrl) => fileUrl != file.fileUrl)

          if (this.localCoverImage === file.fileUrl) {
            this.localCoverImage = this.filePreviews.length ? this.filePreviews[0].fileUrl : null
          }
          console.log(file)


          this.selectedFileUrl = this.filePreviews.length ? this.filePreviews[this.filePreviews.length - 1].fileUrl : null
          console.log(this.filePreviews, this.localImgArr, this.localCoverImage, "logging files preview here ---- ")


          // this.imgArrOutput.emit([...this.localImgArr])
          // this.coverImgOutput.emit(this.localCoverImage || '')
          this.emitImgData()

        });
      }
    });
  }

  onClickPriviewImg(index: any, file: any) {
    if (file.fileUrl) this.selectedFileUrl = file.fileUrl
  }

  onChangeFileinput(event: any): void {
    console.log("is it working")
    try {
      this.files = Array.from(event.target.files);
      let file = this.files[0]
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const fileContent = e.target.result;

        this.filePreviews.push({
          name: file.name,
          content: fileContent,
          type: file.type,
          fileSeq: this.uploadedFileSeq,
          isUploadCompleted: false
        });

        setTimeout(() => {
          this.selectedFile = file
          this.onUpload(this.uploadedFileSeq)
          this.uploadedFileSeq += 1

          console.log(this.selectedFile, "sfdcvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
        }, 150);


      };

      // Check the file type to decide how to read it
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);  // For images
      } else {

      }

    } catch (error) {
      console.log("error-", error)
    }
  }

  onUpload(fileSeq: number) {
    // console.log(this.imgArr,"inside on upload ----")
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      console.time("upload time")
      this.isCurrentUpoadInprogress = true
      this.commonService.uploadImage(formData).subscribe((response: any) => {
        console.log("respnse from upload --", response)
        this.isCurrentUpoadInprogress = false
        if (response.success) {
          let url = response.result.secure_url
          // this.imgArr.push(url)
          this.localImgArr.push(url)
          this.selectedFileUrl = url
          if (!this.localCoverImage) {
            this.localCoverImage = url
          }
          this.filePreviews.forEach((fileInfo: any, index: number) => {
            if (fileInfo.fileSeq == fileSeq) {
              this.filePreviews[index].isUploadCompleted = true
              this.filePreviews[index].fileUrl = url
            }
          });
          if (this.filePreviews.length > 0) {
            this.fullPreviewImageIndex = this.filePreviews.length - 1
          }
          this.hideImagePriviewSection = false

          // this.imgArrOutput.emit([...this.localImgArr])
          // this.coverImgOutput.emit(this.localCoverImage)
          this.emitImgData()
        }
      }, error => {
        console.timeEnd("upload time")
        console.error('Error during file upload:', error);
        console.error('Full response:', error.response);
      });
    } catch (error) {
      console.log('Error-', error)
    }
  }

}
