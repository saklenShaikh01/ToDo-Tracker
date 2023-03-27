import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-search-todo',
  templateUrl: './search-todo.component.html',
  styleUrls: ['./search-todo.component.css']
})
export class SearchTodoComponent {
  @Output()
  pro = new EventEmitter();
  searchText: string = "";

constructor(private ser:TodoService){ }
  ngOnInit(): void {
   
  }
search() {
    this.pro.emit(this.searchText)
    console.log(this.searchText)
  }
}
