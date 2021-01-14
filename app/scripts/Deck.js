import {Card, TypesOfCards, CardsWeights} from './Card.js'

export class Deck{
    constructor(){
        this.cards = [];
        this.#generateCards()
    }

    #generateCards(){
        
        TypesOfCards.forEach(type =>{
            CardsWeights.forEach(weight => {
                this.cards.push(new Card(weight, type))
            })
        })

    }

    shuffle(){

        for(let i = this.cards.length - 1; i > 0; i--){

            const randomCardId = Math.floor(Math.random() * i);
            const currentCard = this.cards[i];

            //swap cards
            this.cards[i] = this.cards[randomCardId];
            this.cards[randomCardId] = currentCard;

        }

    }

    pickOne(){
        return this.cards.pop();
    }
}