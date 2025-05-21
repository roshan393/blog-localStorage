import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogUI } from '../models/model';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-blogs',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css'
})
export class MyBlogsComponent {

  myBlogs:BlogUI[]=[]
 
  isBlogFormOpen: boolean = false;

  router=inject(Router)
  masterService=inject(MasterService)

  ngOnInit(){
    this.initializeForm()
    this.getMyBlogs()
  }

  blogForm:FormGroup= new FormGroup({});

  initializeForm(){
    this.blogForm= new FormGroup({
      blogId: new FormControl(new Date().getTime()+1),
      blogTitle: new FormControl(''),
      blogSubject: new FormControl(''),
      blogCreator: new FormControl(''),
      blogDescription: new FormControl(''),
      blogDate: new FormControl([new Date()])
    })
  }

  createBlog(){
    const user=localStorage.getItem('user')
    if(user){
      const userObj=JSON.parse(user)
       const userId=userObj.userId
       this.blogForm.controls['blogCreator'].setValue(userObj.name)
       const blogObj:BlogUI= this.blogForm.value;
       
       const allBlogs=JSON.parse(localStorage.getItem('blogs') || '{}')
        if(!allBlogs[userId]){
          allBlogs[userId] = [];
        }
        allBlogs[userId].push(blogObj);

        localStorage.setItem('blogs', JSON.stringify(allBlogs));
        this.getMyBlogs()
        this.isBlogFormOpen=false
      }
      
    }

  getMyBlogs(){
    const userObj=localStorage.getItem('user')
    if(userObj != null){

      const userData=JSON.parse(userObj)
      const userId=userData.userId
      this.myBlogs=[]
      if(Array.isArray(this.masterService.getAllBlogsByUserId(userId)))
      {
        this.masterService.getAllBlogsByUserId(userId).forEach((item:BlogUI)=>{this.myBlogs.push(item)})
      }
    }
     
    
  }

  editBlog(blogObj:BlogUI){
     this.isBlogFormOpen=true
     this.blogForm.patchValue(blogObj)

     }

    onUpdateBlog(blogObj:BlogUI){ 
      // we need specific user id
      
      const allBlogsData=localStorage.getItem('blogs') || '{}'
      const userObjData=localStorage.getItem('user')
      
       if(allBlogsData && userObjData){
        

        const allBlogs=JSON.parse(allBlogsData)
        const userObj=JSON.parse(userObjData)
        const userId=userObj.userId
        const userBlogs=allBlogs[userId] //array of user blogs accessed

        if(Array.isArray(userBlogs)){
          const blogIndex=userBlogs.findIndex((item:BlogUI)=>item.blogId===blogObj.blogId) //get blog index of which we want to edit or update

          if(blogIndex !== -1){
            userBlogs[blogIndex]=blogObj //only update that particular blog
            allBlogs[userId]=userBlogs   //update user blogs
            localStorage.setItem('blogs', JSON.stringify(allBlogs)); //  Save updated blogs
            this.getMyBlogs();                         // Refresh UI
            this.isBlogFormOpen = false; 
          }
        }
      
      
       }
    
    }

    onDeleteBlog(blogId:number){
      const blogsObj=JSON.parse(localStorage.getItem('blogs') || '{}')
      const userObj=JSON.parse(localStorage.getItem('user') || '{}')
      if(blogsObj !== null && userObj !== null){
        const userId=userObj.userId
        this.getMyBlogs()
       const myAllBlogs=this.myBlogs
       const updatedBlogs=myAllBlogs.filter((item:BlogUI)=>{
        return item.blogId !== blogId //filter out the blog which we want to delete
       })
       blogsObj[userId]=updatedBlogs
       localStorage.setItem('blogs',JSON.stringify(blogsObj))
       this.getMyBlogs()
      }
      
    }
    
    
  }




  

