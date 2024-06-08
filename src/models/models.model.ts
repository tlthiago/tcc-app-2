
interface IModels {
  id: string;
  titulo: string;
  descricao: string;
  dataPublicacao: string;
  formato: string;
}

function createIModel() {
  return {
    titulo: '',
    descricao: '',
    dataPublicacao: '',
    formato: ''
  };
}

export { IModels, createIModel };