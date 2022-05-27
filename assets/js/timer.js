//Dichiarazione variabili html
countDown = document.querySelector('#timer');
h = document.querySelector('#hour');
m = document.querySelector('#minute');
s = document.querySelector('#second');
startTimer = document.querySelector('#startTimer');
createTimer = document.querySelector('#createTimer');
setTimer=document.querySelector('#setTimer');
errorTimer=document.querySelector('.hideError');
firstChoice = document.querySelector(".firstChoice");
startTomato=document.querySelector('#startTomato');
button=document.querySelector('#button');//section che comprende i pulsanti
//di puasa e stop
pauseTimer=document.querySelector('#pause');
stopTimer=document.querySelector('#stop');

//Variabili collegamenti navbar
navNewTimer=document.querySelector('#navNewTimer');
navRecentTimer=document.querySelector('#navRecentTimer');

//Creazione variabile per le istanze dell'oggetto Timer
var contenitoreTimer = [];
var i = 0;

/*All'inizio nascondo il messaggio di errore.
Verrà mostrato quando l'utente inserisce un timer vuoto*/

errorTimer.classList.add('hide');


/*
Nascondere quando parte l'applicativo il count-down
il main con id Timer
*/
countDown.classList.add('hideCountDown');

//Creazione classe Timer
class Timer {
    //Dichiarazione variabili della classe
    hour = 0;
    minute = 0;
    second = 0;
    count;
    statusTimer = false;

    //Invocazione del metodo costruttore
    constructor(hour = 0, minute = 0, second = 0) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    //Dichiarazione metodi della classe

    //Metodi set

    /**
     * @param {hour}
     * Metodo per settare le ore del timer
     */
    setHour(hour) {
        this.hour = hour;
    }

    /**
     * @param {minute}
     * Metodo per settare i minuti del timer
     */
    setMinute(minute) {
        this.minute = minute;
    }

    /**
     * @param {seconds}
     * Metodo per settare i secondi del timer
     */
    setSecond(second) {
        this.second = second;
    }

    //Metodi get

    /**
     * @param {hour}
     * Metodo per ottenere le ore del timer
     */
    getHour() { return this.hour; }

    /**
     * @param {minute}
     * Metodo per ottenere i minuti del timer
     */
    getMinute() { return this.minute; }

    /**
     * @param {seconds}
     * Metodo per ottenere i secondi del timer
     */
    getSecond() { return this.second; }

    /**
     * Metodo per sapere se il timer e' partito o no
     * @returns {count}
     */
    getStatusTimer(){return this.count;}

    //Metodo per far partire il timer
    start() {
        this.statusTimer = true;
        this._iniziaContare();
    }

    //Metodo che si preoccupa di far partire effettivamente il timer
    _iniziaContare() {
        if (this.statusTimer) {
            this.count = setInterval(() => {
                this._mostraTimer();
                if (this.second > 0) {
                    this.second--;
                }else{
                    if(this.second==0){
                        this.second = 59;
                    }
                    if (this.minute > 0 && this.second == 59) {
                        this.minute--;
                    } else if (this.minute == 0 && this.second == 59 && this.hour > 0) {
                        this.minute = 59;
                    }
                    if (this.hour > 0 && this.minute == 59) {
                        this.hour--;
                    }
                    if (this.hour == 0 && this.minute == 0 && this.second == 0) {
                        this.stopAndPause();
                    }
                }
            }, 1000)
        }
    }

    //Metodo per far fermare il timer
    stopAndPause() {
        this.statusTimer = false;
        this._fermaContare();
    }

    //Metodo che si preoccupa di far bloccare effettivamente il timer
    _fermaContare() {
        clearInterval(this.count);
        this.count=null;
    }

    //Metodo che si preoccupa di mettere in pausa il timer

    //Metodo che si preoccupa di mostrare quanto manca al timer
    _mostraTimer() {
        h.innerText = this.hour;
        m.innerText = this.minute;
        s.innerText = this.second;
    }

}

/*function slide() {
    if(firstChoice.className == "slideup" ){
        firstChoice.classList.add( "slidedown" );
        firstChoice.classList.remove( "slideup" );
    }else{
        firstChoice.classList.add( "slideup" );
        firstChoice.classList.remove( "slidedown" );
    }
}*/

function partiTimer(tipoTimer){
    setTimeout(() => {    
        countDown.classList.remove('hideCountDown');
        countDown.classList.add('showCountDown');
        button.classList.remove('hide');
        button.classList.add('show');
        },1000);
        contenitoreTimer.push(new Timer());
        if(tipoTimer){//viene impostata la tecnica del pomodoro
            contenitoreTimer[i].setHour(0);
            contenitoreTimer[i].setMinute(25);
            contenitoreTimer[i].setSecond(0);
        }
        else{//altrimenti viene chiesto all'utente
            //mediante input di inserire un timer
            if(hour==''){
                contenitoreTimer[i].setHour(0);
            }
            else{
                contenitoreTimer[i].setHour(hour);
            }
                if(minute==''){
                contenitoreTimer[i].setMinute(0);
            }else{
                contenitoreTimer[i].setMinute(minute);
            }
            if(second==''){
                contenitoreTimer[i].setSecond(0);
            }else{
                contenitoreTimer[i].setSecond(second);
            }
        }
        contenitoreTimer[i].start();
        i++;
}

startTomato.addEventListener('click',()=>{
    //slide();
    firstChoice.classList.add('hide');
    partiTimer(true);
    
    
})

startTimer.addEventListener('click', () => {
    hour=document.querySelector('#setHour').value;
    minute=document.querySelector('#setMinute').value;
    second=document.querySelector('#setSecond').value;

    if(hour=='' && minute=='' && second==''){
        errorTimer.classList.remove('hide');
        errorTimer.classList.add('show');

    }
    else{
        errorTimer.classList.remove('show');
        errorTimer.classList.add('hide');  
        startTimer.classList.add('hide');
        setTimer.classList.add('hide');
        partiTimer(false);
    }
})

createTimer.addEventListener('click',()=>{
    firstChoice.classList.add('hide');
    setTimer.classList.remove('hide');
    
})

pauseTimer.addEventListener('click',()=>{
    if(contenitoreTimer[i-1].getStatusTimer()!=null){
        pauseTimer.innerText='RESTART';
        contenitoreTimer[i-1].stopAndPause();
    }
    else{
        pauseTimer.innerText='PAUSE';
        contenitoreTimer[i-1].start();
    }

})

stopTimer.addEventListener('click',()=>{
    contenitoreTimer[i-1].stopAndPause();
    countDown.classList.add('hideCountDown');
    countDown.classList.remove('showCountDown');
    button.classList.add('hide');
    button.classList.remove('show');
    firstChoice.classList.remove('hide');
})

navRecentTimer.addEventListener('click',()=>{
    
})