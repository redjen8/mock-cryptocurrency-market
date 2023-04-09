export class CryptoLiveInfo {
    constructor(t?: any) {
        this.code = t.code;
        this.currentPrice = t.currentPrice;
        this.createdAt = new Date(parseInt(t.createdAt));
    }

    code!: string;
    currentPrice!: number;
    createdAt!: Date;
}