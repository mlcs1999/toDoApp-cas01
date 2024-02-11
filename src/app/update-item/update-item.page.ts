import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService, Task } from '../service/data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  @Input() task!: Task;
  number: number = 0;

  constructor(public modalCtrl: ModalController, private dataService: DataService) { }

  ngOnInit() {
    console.log(this.task); // You can access data here
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async updateTask() {

    await this.dataService.updateTask({
      name: this.task.name,
        date: this.task.date,
        category: this.task.category,
    });
  }



}