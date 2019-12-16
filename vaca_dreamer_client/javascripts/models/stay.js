class Stay {
    constructor(object) {
        this.name = object.name;
        this.address = object.address;
        this.city = object.city;
        this.state = object.state;
        this.country = object.country;
        this.familyFriendly = object.family_friendly;
    }

    render() {
        let heading = `<p class="card-text font-weight-bold">Stay:</p>`;
        const name = `<p class="card-text">Name: ${this.name}</p>`;
        const address = `<p class="card-text">Address: ${this.address}</p>`;
        const city = `<p class="card-text">City: ${this.city}</p>`;
        const state = `<p class="card-text">State: ${this.state}</p>`;
        const country = `<p class="card-text">Country: ${this.country}</p>`;
        const familyFriendly = `<p class="card-text">Family Friendly?: ${this.familyFriendly}</p>`;

        return heading + name + address + city + state + country + familyFriendly
    }
}