import  {Deck} from './scripts/Deck.js'
import { Player } from './scripts/Player.js';
import {bindToHtml} from './scripts/BindToHtml.js'
import {Table} from './scripts/Table.js'

const playerCardsContainerId = 'player-cards';
const dealerCardsContainerId = 'AI-cards';

class Game{
    constructor({player, tabel}){
        //AI and user
        this.player = player;
        this.dealer = new Player('Dealer');
        
        this.tabel = tabel;

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
            this.tabel.showPlayerCard(playerCard.render());

            
            const dealerCard = this.deck.pickOne();

            this.dealer.hand.addCard(dealerCard);
            this.tabel.showDealerCard(dealerCard.render());

        }
    }
}

const tabel = new Table(bindToHtml.bindById(playerCardsContainerId), bindToHtml.bindById(dealerCardsContainerId))
const player = new Player('User');

const game = new Game({
    player,
    tabel
});