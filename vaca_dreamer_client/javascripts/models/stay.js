class Stay {
    constructor(name, address, city, state, country, family_friendly) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.family_friendly = family_friendly;
    }

    render() {
        return `rendering new stay`
    }
}