export class SignUpForm{
    userId:number;
    name:string;
    email:string;
    password:string;

    constructor(){
        this.userId=0;
        this.name='';
        this.email='';
        this.password='';
    }
}

export interface BlogUI{
    blogId:0
    blogTitle:string;
    blogSubject:string;
    blogDescription:string;
    blogCreator:string;
    blogDate:Date;
    

    
}