import { Injectable } from '@angular/core';
import { BlogUI } from '../pages/models/model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
    allBlogs:BlogUI[]=[]
    allBlogData:any[]=[]
  constructor() { }
  
  getAllBlogs():any[]{
      
        
         const allBlogData=localStorage.getItem('blogs')
         if(!allBlogData){
          return []
         }
           const parsedAllBlogData=JSON.parse(allBlogData)
           const allBlogs:any[]=[]
           for(const userId in parsedAllBlogData){
             if(Array.isArray(parsedAllBlogData[userId])){
              allBlogs.push(...parsedAllBlogData[userId])
             }
           }
         return allBlogs

  }

  
  getAllBlogsByUserId(userId:number):any[]{
    const allBlogData=localStorage.getItem('blogs')
    if(!allBlogData){
      return []
    }
    const parsedAllBlogData=JSON.parse(allBlogData)
    return parsedAllBlogData[userId]

  }
}
