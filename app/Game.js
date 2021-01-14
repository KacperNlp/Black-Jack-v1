import  {Deck} from './scripts/Deck.js'
import { Player } from './scripts/Player.js';
import {bindToHtml} from './scripts/BindToHtml.js'

const playerCardsContainerId = 'player-cards';
const dealerCardsContainerId = 'AI-cards';

class Game{
    constructor({player, playerCards, dealerCards}){
        //AI and user
        this.player = player;
        this.dealer = new Player('Dealer');
        
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;

        this.deck = new Deck();

        this.#init();
    }

    #init(){
        this.deck.shuffle();
        this.#run();
    }

    #run(){
        this.#dealCards();
    }

    #dealCards(){
        for( let i = 0; i < 2; i++){

            const playerCard = this.deck.pickOne();

            this.player.hand.addCard(playerCard);
            this.playerCards.appendChild(playerCard.render());

            
            const dealerCard = this.deck.pickOne();

            this.dealer.hand.addCard(dealerCard);
            this.dealerCards.appendChild(dealerCard.render());

        }
    }
}

const player = new Player('User');

const game = new Game({
    player,
    playerCards: bindToHtml.bindById(playerCardsContainerId),
    dealerCards: bindToHtml.bindById(dealerCardsContainerId),
});