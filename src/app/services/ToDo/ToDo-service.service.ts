import { Elemento } from './../../models/elemento';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

  private ToDoListSubject: BehaviorSubject<Elemento[]>;
  private dataSource = {
    items: [],
    error: ''
  };
  private httpHeaders: HttpHeaders

  constructor(public httpClient: HttpClient) {
    this.ToDoListSubject = new BehaviorSubject<Elemento[]>([]);
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
  }

  public get items$(): Observable<Elemento[]> {
    return this.ToDoListSubject.asObservable();
  }

  public cargarElementos(): void {
    this.httpClient.get<Elemento[]>(environment.API_URL)
    .subscribe(items => {
      this.dataSource.items = items;
      this.ToDoListSubject.next([...this.dataSource.items]);
    }, error => console.log(`ERROR: ${error}`));
  }

  public agregarElemento(itemName: string): void {
    this.httpClient.post<Elemento[]>(
      environment.API_URL,
      JSON.stringify({
      name: itemName,
      ready: false
    }),
    { headers: this.httpHeaders })
    .subscribe(responseItem => {
      this.dataSource.items.push(responseItem);
      this.ToDoListSubject.next([...this.dataSource.items]);
    }, error => console.log(`ERROR: ${error}`));
  }

  public toggleItemStatus(id: string): void {
    this.httpClient.patch<Elemento>(
      environment.API_URL,
      JSON.stringify({ id }),
      { headers: this.httpHeaders })
      .subscribe(responseItem => {
        this.dataSource.items = this.dataSource.items.map(item => {
          if (item.id === responseItem.id) {
            item.ready = responseItem.ready;
          }
          return item;
        });
        this.ToDoListSubject.next([...this.dataSource.items]);
      }, error => console.log(`ERROR: ${error}`));
  }

  public eliminarElemento(id: string): void {
    this.httpClient.delete<Elemento>(
      `${environment.API_URL}/${id}`,
      { headers: this.httpHeaders })
      .subscribe(responseItem => {
        this.dataSource.items = this.dataSource.items.filter(item => item.id !== responseItem.id);
        this.ToDoListSubject.next([...this.dataSource.items]);
      }, error => console.log(`ERROR: ${error}`));
  }
}
