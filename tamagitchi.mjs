const emotions = new Map();
emotions.set("excited", "./emotions/excited.gif");
emotions.set("happy", "./emotions/happy.gif");
emotions.set("neutral", "./emotions/neutral.gif");
emotions.set("sad", "./emotions/sad.gif");
export class tamagitchi {
    constructor(emotion, url){
        this.emotion = emotion;
        this.url = url;
    }
    static pet = new tamagitchi("sad", emotions.get("sad"));
}
export function getEmotionUrl(emotion){
    return emotions.get(emotion);
}