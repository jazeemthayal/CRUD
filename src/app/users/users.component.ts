import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef,BsModalService } from "ngx-bootstrap/modal";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public modalRef: BsModalRef;
    api='https://randomuser.me/api/?results=12';
    users:[any];
    user:[any];

  constructor(private hc:HttpClient, private modalService:BsModalService) {
    this.hc.get<any>(this.api).subscribe((data)=>{
      let users = data.results.map((user, index)=>{
        user.id=index+1;
        return user;
      });
      return this.users=users;
    })
   }

   public submitData(f:NgForm){ 
    let data = f.value;
    let obj = this.users.find(x=>x.id == data.id);
    let index = this.users.indexOf(obj);
    let pureData = {
      id:data.id,
      name:{title:data.title, first:data.first},
      email:data.email,
      phone:data.phone,
      location:{city:data.city, state:data.state, country:data.country}
    }
    if( index < 0 ) {
      pureData.id = this.users[ this.users.length - 1 ].id+1;
      this.users.push(pureData);  
      this.modalService.hide(1);
      document.body.classList.remove('modal-open');
      return; 
    }
    this.users[ index ] = pureData;
    this.modalService.hide(1);
    document.body.classList.remove('modal-open');
   }

  public openModalAdd(templateAdd:TemplateRef<any>){
    this.modalRef=this.modalService.show(templateAdd);
  }

   public openModal(template:TemplateRef<any>, user){
     this.modalRef=this.modalService.show(template);
     this.user = user;
   }

   public closeModal(template:TemplateRef<any>){
    this.modalService.hide(1);
    document.body.classList.remove('modal-open');
  }

   deleteUser(user){
        let index=this.users.indexOf(user);
        this.users.splice(index,1);
   }

  ngOnInit() {
    
  }

}
