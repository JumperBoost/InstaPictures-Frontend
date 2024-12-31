export class City {
    constructor(readonly country: string, readonly name: string, readonly postal_code: string,
                readonly department: string, readonly region: string) {}

    get get_str(): string {
        return [this.name, this.postal_code, this.department, this.region, this.country].join(", ");
    }
}