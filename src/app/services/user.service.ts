import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, docSnapshots, doc, setDoc, getDoc, deleteDoc, FirestoreModule  } from '@angular/fire/firestore'; 
import { IUser, createIUser } from 'src/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, UserInfo, UserProfile, getIdToken } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: IUser[] = [];
  
  constructor(
    public firestore: Firestore,
    private auth: Auth
  ) {}

  public async getAuthenticatedUserData() {
    const authUserData = await this.auth.currentUser;

    if (authUserData) {
      return {
        uid: authUserData.uid,
        email: authUserData.email
      }
    } else {
      return null;
    }
  }

  get(uid: string): Observable<IUser> {
    const userRef = doc(this.firestore, 'users', uid);
    return docSnapshots(userRef)
    .pipe(
      map(user => {
        const uid = user.id;
        const data = user.data();
        return { uid, ...data  } as IUser;
        })
    );
  }

  public async add(newUser: IUser): Promise<IUser> {
    const userRef = await addDoc(collection(this.firestore, 'users'), {
      uid: newUser.uid,
      nome: newUser.nome,
      tema: newUser.tema,
      curso: newUser.curso,
      universidade: newUser.universidade,
      genero: newUser.genero,
      dataNascimento: newUser.dataNascimento
    });

    console.log("O usuário foi salvo com sucesso, id: ", userRef.id);

    console.log("Salvar --> novoUsuario", newUser);

    this.users.push(newUser);
    return this.users[ this.users.length-1 ];
  }

}
