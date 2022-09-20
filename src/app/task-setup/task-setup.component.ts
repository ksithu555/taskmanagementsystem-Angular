import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskService } from '../_services/task.service';
import * as alertify from 'alertifyjs';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-task-setup',
  templateUrl: './task-setup.component.html',
  styleUrls: ['./task-setup.component.css']
})
export class TaskSetupComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService,
  ) { }
  dataSource: any;
  dataSourceComplete: any;
  dataSourceIncomplete: any;
  selectionIds = new Array<[ids: number]>;
  displayedColumns = [
    'title',
    'scheduledDate',
    'completionDate',
    'priority',
    'actions'
  ];
  displayedColumns2 = [
    'title',
    'scheduledDate',
    'priority',
    'completed',
    'actions'
  ]

  ngOnInit(): void {
    this.getTasksall();
    this.getTasksComplete();
    this.getTasksIncomplete();
  }

  logout() {
    localStorage.setItem('loginToken', '');
    this.ngOnInit();
  }

  getTasksall() {
    this.taskService.GetTasks().subscribe(x => {
      if (x) {
        this.dataSource = x.data;
      }
    })
  }

  getTasksComplete() {
    this.taskService.GetTasksComplete().subscribe(x => {
      if (x) {
        this.dataSourceComplete = x.data;
      }
    })
  }

  getTasksIncomplete() {
    this.taskService.GetTasksIncomplete().subscribe(x => {
      if (x) {
        this.dataSourceIncomplete = x.data;
      }
    })
  }

  createTask() {
    const dataId = '';
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '700px',
      data: dataId,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editTask(id: any) {
    const dataId = id;
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '700px',
      data: dataId,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  updateStatus(id: any) {
    const dataId = id;
    const dialogRef = this.dialog.open(UpdateStatusComponent, {
      width: '700px',
      data: dataId,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  deleteConfirm(row: any) {
    alertify.confirm(
      "Delete Task",
      "Are you sure to delete " + "<strong>" + row.title + "</strong>" + "?",
      () => {
        this.delete(row.id);
      },
      () => { }
    );
  }
  delete(id: any) {
    this.taskService.DeleteTask(id).subscribe((x) => {
      if (x.success) {
        this.ngOnInit();
        alertify.success('Delete Successfully!');
      } else {
        alertify.error('Error!');
      }
    });
  }
  checkChange(event: any, id: any) {
    if (event.checked) {
      this.selectionIds.push(id)
    }
    else if (!event.checked) {
      this.selectionIds.forEach((element, index) => {
        if (element == id) this.selectionIds.splice(index, 1);
      })
    }
  }

  completedTasks() {
    if(this.selectionIds.length > 0) {
      let params = new HttpParams();

      params = params.append('ids', JSON.stringify(this.selectionIds));

      this.taskService.BatchUpdate(params).subscribe(x => {
        this.ngOnInit();
      })
    }
    else {
      alertify.error("You must select at least one");
    }
    this.selectionIds = [];
  }

  deleteTasks () {
    if(this.selectionIds.length > 0) {
      let params = new HttpParams();

      params = params.append('ids', JSON.stringify(this.selectionIds));

      this.taskService.BatchDelete(params).subscribe(x => {
        this.ngOnInit();
      })
    }
    else {
      alertify.error("You must select at least one");
    }
    this.selectionIds = [];
  }
}
