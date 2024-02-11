import { Injectable } from '@angular/core';
import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';


//  atributi inferfejsa se moraju poklapati sa poljima u dokumentu Firebase baze podataka
export interface Task {
  id?: number,
  name: string,
  date: string,
  category: string
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private firestore: Firestore) { }

  getTasks() {
    const tasksRef = collection(this.firestore, 'tasks');
    //funkcija collectionData() - dohvatanje podataka iz te kolekcije
    //i objekat sa opcijama. U ovom slučaju, koristimo opciju idField kako bismo naznačili da se polje za identifikator dokumenta 
    //naziva "id". To znači da će svaki Task objekat koji se vrati iz kolekcije imati polje "id" koje će sadržati ID dokumenta.
    return collectionData(tasksRef, {idField: 'id'})
  }

  //1. DELETE preko celog objekta
  // deleteTask(task: Task) {
  //   const taskRef = doc(this.firestore, `tasks/${task.id}`);
  //   return deleteDoc(taskRef);
  // }
  
  //2. Delete preko id-ja
  deleteTask(id: string) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskRef);
  }

  addTask(task: Task) {
    const tasksRef = collection(this.firestore, 'tasks');
    return addDoc(tasksRef, task);
  }

  updateTask(task: Task) {
    const taskRef = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskRef, {
      name: task.name,
      date: task.date,
      category: task.category
    });
  }


}
