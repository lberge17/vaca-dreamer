class Activity {
    constructor(title, description, address, city, cost, family_friendly) {
        this.title = title;
        this.description = description;
        this.address = address;
        this.city = city;
        this.cost = cost;
        this.family_friendly = family_friendly;
    }

    render() {
        return `rendering the new activity`
    }
}