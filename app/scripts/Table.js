export class Table{
    constructor(playerCards, dealerCards){
        this.playerCards = playerCards;
        this.dealerCards = dealerCards;
    }

    showPlayerCard(card){
        this.playerCards.appendChild(card.render());
    }

    
    showDealerCard(card){
        this.dealerCards.appendChild(card.render());
    }
}