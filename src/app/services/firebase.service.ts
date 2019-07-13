import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'path';
import { from } from 'rxjs';
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
  unsubscribeOnLogOut() {
    this.snapshotChangesSubcription.unsubscribe();
  }

  //membuat task baru
  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people').doc(currentUser.uid)
        .collection('tasks').add({
          title: value.title,
          description: value.description,
          image: value.image
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  //untuk menghandle image
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();

    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("/image/jpeg");
      callback(dataURL);
    }
  }

  //meng upload image ke firebase
  uploadImage(imageUri, randomID) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image')
        .child(randomID);
      this.encodeImageUri(imageUri, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            snapshot.ref.getDownloadURL()
              .then(res => resolve(res))
          }, err => {
            reject(err);
          })
      })
    })
  }
  //mengubah task
  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people')
        .doc(currentUser.uid)
        .collection('task')
        .doc(taskKey).set(value)
        .then(res => resolve(res),
          err => reject(err))
    })
  }
  //menghapus task
  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('people')
        .doc(currentUser.uid)
        .collection('task')
        .doc(taskKey).delete()
        .then(res => resolve(res),
          err => reject(err))
    })
  }
}
