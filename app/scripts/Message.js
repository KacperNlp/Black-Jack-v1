import {bindToHtml} from './BindToHtml.js'

const MESSAGE_CONTAINER_ID = 'message';

class Message{
    constructor(messageContainer){
        this.messageContainer = messageContainer;
    }

    gameWinner(message){
        this.showMessage();
        this.#messageInputAnimation(`#${MESSAGE_CONTAINER_ID}`);
        this.messageContainer.textContent = message;
    }

    showMessage(){
        this.messageContainer.classList.remove('hidden');
    }

    hideMessage(){
        this.messageContainer.classList.add('hidden');
    }

    #messageInputAnimation(id){
        
        const timeline = gsap.timeline();

        timeline
              .set(id, {opaicty:0, y:100})
              .to(id, .5, {opacity:1, y:0});

    }
}

export const message = new Message(
    bindToHtml.bindById(MESSAGE_CONTAINER_ID)
)