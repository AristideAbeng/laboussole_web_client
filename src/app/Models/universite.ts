export class Universite {
  constructor(
    public universite_id: number,
    public nom: string,
    public ville: string,
    public descriptif: string,
    public email: string,
    public telephone: string,
    public site_web: string,
    public logo:string,
    public pays:string,
    public imageurl: string,
    public images_pc:string,
    public images_tablettes:string,
    public images_telephone:string
  ) {}
}
