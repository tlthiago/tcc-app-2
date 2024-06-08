import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { IContent } from 'src/models/content.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  constructor(
    public firestore: Firestore
  ) {}

  async getContent(type: string): Promise<IContent[]> {
    const collections = collection(this.firestore, 'content');
    const statement = query(
      collections, 
      where('tipo', "==", type),
      where('favorito', "==", true));
    const querySnapshot = await getDocs(statement);
    
    const contents: IContent[] = [];
    
    querySnapshot.forEach((doc) => {
      contents.push({
        id: doc.id,
        ...doc.data() as IContent
      });
    });

    return contents;
  }

  async removeFromFavorites(id: string): Promise<void> {
    const contentDocRef = doc(this.firestore, 'content', id);
    const docSnapshot = await getDoc(contentDocRef);

    if (docSnapshot.exists()) {
      await updateDoc(contentDocRef, { favorito: false });
    } else {
      throw new Error('Conteúdo não encontrado.');
    }
  }

}
