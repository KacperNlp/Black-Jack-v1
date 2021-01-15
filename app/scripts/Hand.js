export class Hand{
    constructor(){
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    
    cardsWithTheSameWeight(weight){
        return this.cards.filter( card => card.weight === weight).length
    }

    getHandStrength(){
        if(this.cardsWithTheSameWeight('A') === 2){
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