
export const CardsWeights = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
]

export const TypesOfCards = ['hearts', 'spades', 'diamonds', 'clubs'];

export class Card{

    typesOfSigns = {
        hearts: '&hearts;',
        spades: '&spades;',
        diamonds: '&diams;',
        clubs: '&clubs;',
    }

    constructor(weight, type){
        this.weight = weight;
        this.type = type;
    }

    render(){

        const card = document.createElement('div');

        card.setAttribute('class', `card ${this.type}`)
        card.innerHTML = `${this.weight} ${this.typesOfSigns[this.type]}`

        return card;

    }
}