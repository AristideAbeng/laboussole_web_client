export class Faculte {
  constructor(
    public faculte_id: number,
    public nom: string,
    public descriptif: string,
    public condition_admission: string,
    public email: string,
    public telephone: string,
    public universite: number,
    public logo:string,
    public imageurl: string,
    public images_pc:string,
    public images_tablettes:string,
    public images_telephone:string,
  ) {}
}
