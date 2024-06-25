   export class FiliereFormation {
  constructor(
    public filieres_id:number,
    public nom: string,
    public descriptif: string,
    public duree: number,
    public cout: string,
    public langue_enseignement: string,
    public diplome_delivre: string,
    public faculte:number,
    public imageurl:string,
    public images_pc:string,
    public images_tablettes:string,
    public images_telephone:string,
    public centre_interet:string
  ) {}
}
