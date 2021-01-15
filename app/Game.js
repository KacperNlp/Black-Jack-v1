import  {Deck} from './scripts/Deck.js'
import { Player } from './scripts/Player.js';
import {bindToHtml} from './scripts/BindToHtml.js'
import {Table} from './scripts/Table.js'

const playerCardsContainerId = 'player-cards';
const dealerCardsContainerId = 'AI-cards';

//buttons
const takeCardButtonId = 'take-card';
const stayButtonId = 'stay';

class Game{
    constructor({player, tabel, takeCardButton, stayButton}){
        //AI and user
        this.player = player;
        this.dealer = new Player('Dealer');

        //buttons
        this.takeCardButton = takeCardButton;
        this.stayButton = stayButton;
        
        this.tabel = tabel;

        this.deck = new Deck();

        this.#init();
    }

    #init(){
        this.deck.shuffle();
        this.#run();
    }

    #run(){
        this.takeCardButton.addEventListener('click', this.#takeCard);
        this.#dealCards();
    }

    #takeCard = () =>{
        const card = this.deck.pickOne();

        this.player.hand.addCard(card);
        this.tabel.showPlayerCard(card);
    }

    #dealCards(){
        for( let i = 0; i < 2; i++){

            const playerCard = this.deck.pickOne();

            this.player.hand.addCard(playerCard);
            this.tabel.showPlayerCard(playerCard);

            
            const dealerCard = this.deck.pickOne();

            this.dealer.hand.addCard(dealerCard);
            this.tabel.showDealerCard(dealerCard);

        }
    }
}

const tabel = new Table(bindToHtml.bindById(playerCardsContainerId), bindToHtml.bindById(dealerCardsContainerId))
const player = new Player('User');

const game = new Game({
    player,
    tabel,
    takeCardButton: bindToHtml.bindById(takeCardButtonId),
    stayButton: bindToHtml.bindById(stayButtonId),
});