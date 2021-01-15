import  {Deck} from './scripts/Deck.js'
import { Player } from './scripts/Player.js';
import {bindToHtml} from './scripts/BindToHtml.js'
import {Table} from './scripts/Table.js'
import {message} from './scripts/Message.js'

const playerCardsContainerId = 'player-cards';
const dealerCardsContainerId = 'AI-cards';

//buttons
const takeCardButtonId = 'take-card';
const stayButtonId = 'stay';

//player and AI point containers 
const playerPointsContainerId = 'player-points';
const dealerPointsContainerId = 'AI-points';

class Game{
    constructor({player, tabel, takeCardButton, stayButton, playerPointsContainer, dealerPointsContainer}){
        //AI and user
        this.player = player;
        this.dealer = new Player('Dealer');

        //AI and player points containers
        this.playerPointsContainer = playerPointsContainer;
        this.dealerPointsContainer = dealerPointsContainer;

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
        //buttons handle
        this.takeCardButton.addEventListener('click', this.#takeCard);
        this.stayButton.addEventListener('click', this.#dealerPlay);

        this.#dealCards();
        this.#appendPointsToHtml();
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

    #appendPointsToHtml(){

        this.dealer.calculatePoints();
        this.player.calculatePoints();

        this.playerPointsContainer.innerHTML = this.player.score;
        this.dealerPointsContainer.innerHTML = this.dealer.score;
    }

    //buttons functions

    #takeCard = () =>{
        const card = this.deck.pickOne();

        this.player.hand.addCard(card);
        this.tabel.showPlayerCard(card);

        this.#appendPointsToHtml();
    }

    #dealerPlay = () =>{

        while(this.dealer.score <= this.player.score && this.dealer.score < 21 && this.player.score < 21){

            const card = this.deck.pickOne();

            this.dealer.hand.addCard(card);
            this.tabel.showDealerCard(card);

            this.#appendPointsToHtml();

        }

        this.#endOfGame();

    }

    #endOfGame(){

        this.takeCardButton.removeEventListener('click', this.#takeCard);
        this.stayButton.removeEventListener('click', this.#dealerPlay);

        this.takeCardButton.classList.add('hidden-button');
        this.stayButton.classList.add('hidden-button');

        if(this.player.score <= 21 && this.player.score === this.dealer.score){

            message.gameWinner('Draw');
            return;

        }else if(this.player.score > 21 || this.dealer.score > this.player.score && this.dealer.score <= 21){

            message.gameWinner('Dealer won!');
            return;

        }else if(this.dealer.score > 21 || this.player.score > this.dealer.score && this.player.score <= 21){

            message.gameWinner('Player won!');
            return;

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
    playerPointsContainer : bindToHtml.bindById(playerPointsContainerId),
    dealerPointsContainer : bindToHtml.bindById(dealerPointsContainerId),
});