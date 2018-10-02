export class User {
  public id: number;
  constructor(public displayName: string = '',
              public email: string = '',
              public password: string = '',
              public profilePicture: string = '',
              public ddi: string = '',
              public phone: string = '',
              public birthDay: string = '',
              public issuingBody: string = '',
              public rg: string = '',
              public cpf: string = '',
              public country: string = '',
              public uf: string = '',
              public cep: string = '',
              public city: string = '',
              public address: string = '',
              public number: string = '',
              public complement: string = '',
              public profession: string = '',
              public civilStatus: string = '' ) { }
}
