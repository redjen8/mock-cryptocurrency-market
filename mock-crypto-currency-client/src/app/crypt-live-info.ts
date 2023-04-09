export class CryptoLiveInfo {
    constructor(code: string, currentPrice: Number, createdAt: Number) {
        this.code = code;
        this.currentPrice = currentPrice;
        this.createdAt = createdAt;
    }

    code: string;
    currentPrice: Number;
    createdAt: Number;   
}