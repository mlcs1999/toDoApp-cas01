import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewItemPage } from '../add-new-item/add-new-item.page';
import { UpdateItemPage } from '../update-item/update-item.page';

import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';


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

export class HomePage implements OnInit, OnDestroy {

  today: number = Date.now();
  // tasks: Array<Task> = [];
  tasks: any;

  //sub je Subscription objekat koji će se koristiti za pretplatu na Observable tokove podataka.
  sub: Subscription = new Subscription;

  constructor(public modalCtrl: ModalController, private dataService: DataService) {}

  //ngOnDestroy je životni ciklus (lifecycle hook) koji se poziva kada se komponenta uništi. 
  //Ovde se koristi za oslobađanje resursa pretplate na Observable tok podataka tako da se prekine pretplata i 
  //spreči curenje memorije (memory leak).
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // izvrsava se svaki put prilikom inicijalizacije komponente
  ngOnInit(): void {
    // collectionData vraca Observable tip koji emituje niz Task objekata iz kolekcije "tasks".
    console.log(this.dataService.getTasks());

    //Pretplaćuje se na Observable tok podataka koristeći subscribe metod, i kada se podaci stignu, dodeljuju se tasks. 
    //Ovde se takođe koristi console.log za prikazivanje podataka u konzoli u svrhu testiranja.
    this.getData();

  }

  getData() {
    this.sub = this.dataService.getTasks().subscribe((res) => {
      this.tasks = res;
      console.log(this.tasks);
      console.log(res);
    });
  }

  deleteTask(taskId: string) {
    this.dataService.deleteTask(taskId);
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
