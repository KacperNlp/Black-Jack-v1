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



    cardsWithTheSameWeight(weight){
        return this.cards.filter( card => card.weight === weight).length
    }

    getHandStrength(){
        if(this.cardsWithTheSameWeight('A').length === 2){
            return 21;
        }

        const cardsStrength = this.cards.map((card, id, array) =>{

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