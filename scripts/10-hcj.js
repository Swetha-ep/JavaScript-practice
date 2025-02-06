const btnElement = document.querySelector('.js-button');
console.log(btnElement);
console.log(btnElement.classList.contains('js-button'));

function isOn(btnClass){
    let gameElement = document.querySelector(`.${btnClass}`);
    if(gameElement.classList.contains('is-toggled')){
        gameElement.classList.remove('is-toggled');
    } else{
        gameElement.classList.add('is-toggled');
    }
};