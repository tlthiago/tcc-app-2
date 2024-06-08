interface IUser {
  uid: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  genero: string;
  tema: string;
  curso: string;
  universidade: string;
}

interface IAuthenticatedUserData {
  uid: string;
  email: string;
}

function createIUser() {
  return {
    uid: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    genero: '',
    tema: '',
    curso: '',
    universidade: ''
  };
}

export { IUser, createIUser, IAuthenticatedUserData };