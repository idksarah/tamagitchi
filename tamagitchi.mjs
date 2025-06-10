const emotions = new Map();
emotions.set("excited", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/7d352400490c50770430f069bf846b1b0d4abbce_excited.gif");
emotions.set("happy", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/52a51244037834d41778e57a5599cb98420597ad_happy.gif");
emotions.set("neutral", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/84c5779df6447a2f74ba16641f7bffe63616ef6d_neutral.gif");
emotions.set("sad", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/0205ed49bbf9d97b25b0e1133752f37100932990_sad.gif");
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