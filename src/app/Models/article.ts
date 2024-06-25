export class Article {
    constructor(
        public id_actualite: number,
        public titre: string,
        public date: string,
        public nom: string,
        public contenu: string,
        public domaine: string,
        public image_pc: string,
        public image_desktop: string,
        public image_tablette:string
    ) {}
  }