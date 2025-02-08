import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common-service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  standalone: false,
  
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  constructor(
    public commonService: CommonService,
        public postService: PostService,
        public authService: AuthService,
        private route: ActivatedRoute, private router: Router
        
  ) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  posts: any[] = [];

  fetchPosts() {
    // Fetch posts from the server
    this.commonService.fetchPosts({isTrash: false}).subscribe((postResponsive: any) => {
      // Handle the fetched posts
      console.log(postResponsive);
      if(postResponsive && postResponsive.success) {
        this.posts = postResponsive.data;
      }
      else{
        this.posts = []
      }
    });
  }


  onEditPost(post: any) {
    // Handle post click
    console.log(post);
    this.router.navigate(['/addPost'], {
      queryParams: { postId: post.postId}
    });

  }

  onDeletePostClick(post: any){
    this.commonService.deletePost(post.postId).subscribe((res: any)=>{
      this.commonService.stopBlockUI()
      console.log("res from publish --", res)
      if(res.success){
        Swal.fire({
          icon: "success",
          title: "Post Removed successful",
          showConfirmButton: true
        }).then(()=>{
          if(res.success){
            this.fetchPosts()
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
