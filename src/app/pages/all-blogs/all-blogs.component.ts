import { Component, inject } from '@angular/core';
import { BlogUI } from '../models/model';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-all-blogs',
  imports: [DatePipe],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent {
  
  userObj=JSON.parse(localStorage.getItem('user') || '{}')
  masterService=inject(MasterService)

  allBlogs:BlogUI[]=[]
  
  ngOnInit(){
  this.getAllBlogs()

  }
 
   getAllBlogs(){
    this.masterService.getAllBlogs().forEach((item:BlogUI)=>{
      this.allBlogs.push(item)
    })
   }
   
  
}
