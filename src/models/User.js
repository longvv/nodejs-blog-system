class User {
    username;
    email
    #password
    posts
    comments
    name
    fullmame

    constructor(username, email, password, name, fullmame) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.fullmame = fullmame;
    }

    destroy() {
        comments = nil;
        posts = nil;
    }
}