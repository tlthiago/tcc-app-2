import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IModels } from 'src/models/models.model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private models: IModels[] = [];

  constructor(
    public firestore: Firestore
  ) {}

  public getModels(): Observable<IModels[]> {
    const mCollection = collection(this.firestore, 'models');
      return collectionData(mCollection, { idField: 'id' })
      .pipe(
        map(models => models as IModels[])
      );
  }

  public async createModels(newModel: IModels): Promise<IModels> {
    try {
      const modelRef = await addDoc(collection(this.firestore, 'models'), {
        titulo: newModel.titulo,
        descricao: newModel.descricao,
        dataPublicacao: new Date().toLocaleDateString(),
        formato: newModel.formato
      });

      console.log("O usuário foi salvo com sucesso, id: ", modelRef.id);

      console.log("Salvar --> novoUsuario", newModel);

      this.models.push(newModel);
      return this.models[ this.models.length-1 ];
    } catch (e) {
      return null;
    }
  }

}
