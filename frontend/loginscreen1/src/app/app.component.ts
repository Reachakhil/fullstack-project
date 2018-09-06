import { Component } from '@angular/core';
import { CrudService} from './crud.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name:String;
  age:Number;
  gender:String;
  adress:String;
  createdAt:Date;
  age1:Number;
  list=[];
  succes1=false;
constructor(private service : CrudService){}

  title = 'loginscreen3';

  public onAdd(){
    console.log('add button');

    const data ={name :this.name,age:this.age ,gender:this.gender,adress:this.adress};
    this.service.addData(data).subscribe((response:any)=>{

      console.log("Response",response);
      if(response.success){
        alert(response.message);
        this.name=null;
        this.age=null;
        this.gender=null;
        this.adress=null;
      }else{
        alert(response.error);
      }
    });
  }

  public onRead(){
    console.log('Read button');
    this.service.readData(this.name).subscribe((response:any)=>{
  console.log("Response=>",response);
  if(response.success){
   this.age=response.customer.age;
    this.gender=response.customer.gender;
    this.adress=response.customer.adress;
    alert(response.message);
  }else{
    alert(response);
    this.name=null;
  }
    },(err) =>{
      alert(err.message);
      this.name=null;
    })
  }

  onclear(){
this.name=null;
this.age=null;
this.gender=null;
this.adress=null;

  }

  onReadall(){
    console.log("read all daata");
    this.service.readdataall().subscribe((response:any)=>{
      console.log("response",response);
      if(response.sucess){
        this.succes1=true;
        this.list=response.customer;
      }

    })
  }
    OnDelete(){
      console.log("delete button");
      this.service.onDelete(this.name).subscribe((response:any)=>{
        if(response.success){
         
          alert(this.name+" " +"is deleted");
          this.name=null;
        }
      })
    }
   public  onUpdate(){
      console.log('update button');
      const data ={
        "age":this.age,
        "gender":this.gender,
        "adress":this.adress
      }
      this.service.updatedata(this.name, data).subscribe((response:any)=>{
        console.log("Response=>",response);
        if(response.success){
          alert(response.message)
        }else{
          alert(response.message)
        }
      })
    }


  }
