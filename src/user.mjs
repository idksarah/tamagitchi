export class User { 
    constructor(regEvents, socialEvents, followers){
        this.regEvents  = regEvents;
        this.socialEvents = socialEvents;
        this.followers = this.followers;
    }
    static currUser = new User(0,0,0);
}