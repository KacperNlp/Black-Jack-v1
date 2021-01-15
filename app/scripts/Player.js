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

    cardsWithTheSameWeight(weight){
        return this.hand.cards.filter( card => card.weight === weight).length
    }

    getHandStrength(){
        if(this.cardsWithTheSameWeight('A').length === 2){
            return 21;
        }

        const cardsStrength = this.hand.cards.map((card, id, array) =>{

            if(['K', 'Q', 'J'].includes(card.weight)){
                return 10;
            }else if(card.weight === 'A' && array.length === 2){
                return 11;
            }else if(card.weight === 'A' && array.length > 2){
                return 1;
            }else{
                return parseInt(card.weight);
            }

        })

        return cardsStrength.reduce((sum, currentWieght)=>{
            return sum + currentWieght;
        });
    }
}