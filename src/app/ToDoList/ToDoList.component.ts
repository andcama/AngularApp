import { Component, OnInit } from '@angular/core';
import { ToDoServiceService } from '../services/ToDo/ToDo-service.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './ToDoList.component.html',
  styleUrls: ['./ToDoList.component.css']
})
export class ToDoListComponent implements OnInit {

  public nuevoelemento:string;

  constructor(private toDoListService:ToDoServiceService) {
    this.nuevoelemento = '';
   }

  ngOnInit():void {
  }

  public agregarNuevoElemento():void{
    this.toDoListService.agregarElemento(this.nuevoelemento);
    this.nuevoelemento='';
  }

}
