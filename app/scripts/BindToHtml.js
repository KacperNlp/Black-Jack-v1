class BindToHtml{
    bindById(id){
        return document.getElementById(id);
    }
}

export const bindToHtml = new BindToHtml();