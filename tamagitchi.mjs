const emotions = new Map();
emotions.set("excited", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cb454fd059e43c4349e5563c2c13d7bcdb2c0950_image.png");
emotions.set("happy", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/2b4c7a05f3848557deeeab5ae582983cd74023d1_image.png");
emotions.set("neutral", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/fedbb9f1559f0dbb539cf8103e3ae3b0ebdb8258_image.png");
emotions.set("sad", "https://hc-cdn.hel1.your-objectstorage.com/s/v3/bd0de78ad0b0251b26bbbf6bdb75ab3d45c75118_image.png");
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