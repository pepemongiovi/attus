export class InvestmentInfo {
  constructor (
    public project: string,
    public value: number,
    public income: number,
    public status: string,
    public quotas: number,
    public quotaValue: number) {}
}
