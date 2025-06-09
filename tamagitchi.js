import { Emotions } from "./emotions.mjs";

const emotions = new Map();
emotions.set("excited", "filepath");
emotions.set("happy", "filepath");
emotions.set("neutral", "filepath");
emotions.set("sad", "filepath");
export class tamagitchi {
    constructor(emotion){
        this.emotion = emotion;
    }
    static pet = new tamagitchi("sad");
}