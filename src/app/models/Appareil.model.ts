import { Deserializable } from './deserializable.model';

export class Appareil implements Deserializable{
  id: number;
  name: string;
  status: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
