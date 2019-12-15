class Vacation {
    constructor(title, username) {
        this.title = title;
        this.username = username;
    }

    render () {
        return `<p>Title: ${this.title}</p>`
    }
}