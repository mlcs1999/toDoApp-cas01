import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';

type Task = {
  name?: string,
  date?: Date,
  category?: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  today: number = Date.now();
  tasks: Array<Task> = [];

  constructor(public modalCtrl: ModalController) {}

  // izvrsava se svaki put prilikom inicijalizacije komponente
  ngOnInit(): void {
    this.tasks = [
      {
        name: "Uraditi MPOS domaci",
        date: new Date(),
        category: 'Low'
      },
      {
        name: "Uraditi EEP domaci",
        date: new Date(),
        category: 'High'
      },
    ];
  }

  async goToAddPage() {
    const modal = await this.modalCtrl.create({
      component: AddNewItemPage
    });
    return await modal.present();
  }

  async goToUpdatePage(task: Task) {
    const modal = await this.modalCtrl.create({
      component: UpdateItemPage,
      componentProps: task
    });
    return await modal.present();
  }


}
