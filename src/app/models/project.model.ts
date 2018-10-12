export class Project {
  constructor(
    public captacaoAtual: number,
    public captacaoNecessaria: number,
    public description: string,
    public imgURL: string,
    public name: string,
    public prazoParaFinalizarCaptacao: string,
    public rentabilidadeFinal: number,
    public rentabilidadeGarantida: number,
    public rentabilidadeMensalMedia: number,
    public tempoDeRetorno: number,
    public valorDeCota: number) {}
}
