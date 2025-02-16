
let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(num){
    calculation+=`${num}`; 
    localStorage.setItem('calculation',calculation);
    showResult(calculation);
    return calculation;
}

function showResult(calculation){
    let paraElement = document.querySelector('.js-result');
    paraElement.innerHTML = calculation;
}
