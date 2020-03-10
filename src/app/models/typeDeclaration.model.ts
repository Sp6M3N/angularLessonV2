import { Deserializable } from './deserializable.model';
import {Organismes} from './Organismes.model';

export class TypeDeclaration implements Deserializable {
  id: number;
  name: string;
  valide: boolean;
  fk_organisme: Organismes;

  //sert a convertir n'importe quelle objet en type declaration
  deserialize(input: any) {
    Object.assign(this, input);
    this.fk_organisme = new Organismes().deserialize(input.fk_organisme)
    return this;
  }
}
