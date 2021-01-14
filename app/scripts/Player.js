import {Hand} from './Hand.js'

export class Player{
    constructor(name){
        this.name = name;
        this.hand = new Hand();
    }
    #score = 0;

    get score(){
        return this.#score;
    }

    set score(score){
        this.#score += score;
    }
}