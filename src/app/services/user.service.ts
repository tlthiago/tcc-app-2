import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, doc, collectionGroup } from '@angular/fire/firestore';
import { IUser } from 'src/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '@angular/fire/auth';
import { getDocs, query, updateDoc, where } from 'firebase/firestore';

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

  public async createUser(newUser: IUser): Promise<IUser> {
    try {
      const userRef = await addDoc(collection(this.firestore, 'users'), {
        uid: newUser.uid,
        nome: newUser.nome,
        sobrenome: newUser.sobrenome,
        dataNascimento: newUser.dataNascimento,
        genero: newUser.genero,
        tema: newUser.tema,
        curso: newUser.curso,
        universidade: newUser.universidade
      });

      console.log("O usuário foi salvo com sucesso, id: ", userRef.id);

      console.log("Salvar --> novoUsuario", newUser);

      this.users.push(newUser);
      return this.users[ this.users.length-1 ];
    } catch (e) {
      return null;
    }
  }

  async getUser(uid: string): Promise<IUser> {
    const collections = collection(this.firestore, 'users');
    const statement = query(collections, where('uid', "==", uid));
    const querySnapshot = await getDocs(statement);

    let userData: IUser;
    
    querySnapshot.forEach((doc) => {
      userData = doc.data() as IUser;

      return;
    });

    return userData;
  }

  async updateUser(uid: string, userData: IUser): Promise<IUser> {
    const collections = collection(this.firestore, 'users');
    const statement = query(collections, where('uid', "==", uid));
    const querySnapshot = await getDocs(statement);

    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, { ...userData });
      return userData;
    } else {
      throw new Error('Usuário não encontrado.');
    }
  }

}
