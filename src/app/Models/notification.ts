export class Notification {
    constructor(
    public id_notification: number,
    public titre: string,
    public contenu: string,
    public statut: string,
    public nationalite: string,
    public image_pc: string,
    public image_desktop: string,
    public image_tablette: string
    ) {}
  }