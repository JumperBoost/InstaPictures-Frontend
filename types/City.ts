export class City {
    public readonly country: string;
    public readonly name: string;
    public readonly postal_code: string;
    public readonly department: string;
    public readonly region: string

    public constructor(country: string, name: string, postal_code: string, department: string, region: string) {
        this.country = country;
        this.name = name;
        this.postal_code = postal_code;
        this.department = department;
        this.region = region;
    }

    public get_str(): string {
        return [this.name, this.postal_code, this.department, this.region, this.country].join(", ");
    }
}