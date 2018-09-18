export class User {
  public id: number;
  constructor(public name: string = '',
              public email: string = '',
              public password: string = '') { }
}
