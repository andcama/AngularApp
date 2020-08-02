import { Elemento } from './../models/elemento';
import { Observable } from 'rxjs/internal/Observable';
import { Component, OnInit } from '@angular/core';
import { ToDoServiceService } from '../services/ToDo/ToDo-service.service';

@Component({
  selector: 'app-dolist',
  templateUrl: './DoList.component.html',
  styleUrls: ['./DoList.component.css']
})
export class DoListComponent implements OnInit {

  public items$: Observable<Elemento[]>;

  constructor(private ToDoService: ToDoServiceService) {
    this.items$ = this.ToDoService.items$;
  }

  ngOnInit(): void {
    this.ToDoService.cargarElementos();
  }

  public toggleItemStatus(itemId: string): void {
    this.ToDoService.toggleItemStatus(itemId);
  }

  public deleteItem(itemId: string): void {
    this.ToDoService.eliminarElemento(itemId);
  }
}
