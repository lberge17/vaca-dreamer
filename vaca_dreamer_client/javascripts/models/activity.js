class Activity {
    constructor(object) {
        this.title = object.title;
        this.description = object.description;
        this.address = object.address;
        this.city = object.city;
        this.cost = object.cost;
        this.familyFriendly = object.family_friendly;
    }

    render() {
        let heading = `<p class="card-text font-weight-bold">Activity:</p>`;
        const title = `<p class="card-text">Title: ${this.title}</p>`;
        const description = `<p class="card-text">Description: ${this.description}</p>`;
        const address = `<p class="card-text">Address: ${this.address}</p>`;
        const city = `<p class="card-text">City: ${this.city}</p>`;
        const cost = `<p class="card-text">Cost: ${this.cost}</p>`;
        const familyFriendly = `<p class="card-text">Family Friendly?: ${this.familyFriendly}</p>`;

        return heading + title + description + address + city + cost + familyFriendly;
    }
}