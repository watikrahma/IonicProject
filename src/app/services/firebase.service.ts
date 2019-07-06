import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubcription: any;

  constructor(
    public afs: AngularFirestore, //angular fire store
    public afAuth: AngularFireAuth
  ) { }

  // method untuk melihat semua data
  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) { //jike terdeteksi user ada
          this.snapshotChangesSubcription = this.afs.collection('people').doc(currentUser.uid).collection('tasks').snapshotChanges();
          resolve(this.snapshotChangesSubcription);
        }
      })
    })
  }

  // method untuk melihat task tertentu
  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubcription = this.afs.doc<any>('people/' + currentUser.uid + '/task/' + taskId).valueChanges().subscribe(snapshots => {
            resolve(snapshots);
          }, err => {
            reject(err);
          })
        }
      })
    });
  }

  // unsubscribe perintah
  unsubscribeOnLogOut(){
    this.snapshotChangesSubcription.unsubscribe();
  }
}
