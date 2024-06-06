interface IUser {
  uid: string;
  nome: string;
  tema: string;
  curso: string;
  universidade: string;
  genero: string;
  dataNascimento: Date;
}

function createIUser() {
  return {
    uid: '',
    nome: '',
    tema: '',
    curso: '',
    universidade: '',
    genero: '',
    dataNascimento: new Date()
  };
}

export { IUser, createIUser };