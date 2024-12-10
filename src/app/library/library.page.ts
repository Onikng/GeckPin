import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostManageUseCase } from '../use-cases/Post-manage.use-case';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})

export class LibraryPage implements OnInit {

  posts: any[] = []; 

  constructor(private router:Router, private postManageUseCase: PostManageUseCase) {
    
   }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postManageUseCase.getPosts().subscribe(posts => {
      this.posts = posts; 
      console.log('Post obtenidos:', posts); 
    });
  }

  Onbtnreturn(){
    this.router.navigate(['/home'])
    }

    async deletePosts(postId: string) {
      try {
        const response = await this.postManageUseCase.deletePosts(postId);
        if (response.success) {
   
          this.posts = this.posts.filter(post => post.id !== postId);
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error al eliminar el post:', error);
      }
    }
  
    onEditButtonPressed(postId: string) {
      this.router.navigate([`/post-edit/${postId}`]); // Pasa el ID en la URL
    }

    OnHomeClick(){
      this.router.navigate(['/home'])
  }
  
  OnAddFileClick(){
      this.router.navigate(['/addfile'])
  }
  
  OnProfileClick(){
      this.router.navigate(['/profile'])
  }

}
