import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../task';
/***In order to use relative path wee need to add moduleId : module.id**/
@Component({
    moduleId : module.id,
	selector : 'tasks',
	templateUrl : './task.component.html'
})
export class TaskComponent {
   tasks:Task[];
   title:string;
	constructor(private taskService:TaskService){
   		this.taskService.getTasks().subscribe(tasks=>{
   		   			this.tasks=tasks;
   		   			console.log(tasks);
   		});
  }
      addTask(event){
        event.preventDefault();
        var newTask={
          title:this.title,
          isDone:true
        };

        this.taskService.addTask(newTask)
           .subscribe(task=>{
           this.tasks.push(task);
           this.title='';
           })
         //this.tasks.push(newTask);
      }


}