//Dichiarazione variabili html
contenitoreMain = document.querySelector('#timer');
h = document.querySelector('#hour');
m = document.querySelector('#minute');
s = document.querySelector('#second');
newTimerContainer = document.querySelector('#initialize');
startTimer = document.querySelector('#newTimer');
errorTimer=document.querySelector('#errorTimer');
errorTimer.style.visibility="hidden";

//Creazione variabile per le istanze dell'oggetto Timer
contenitoreTimer = [];
i = 0;

/*
Nascondere quando parte l'applicativo il count-down
il main con id Timer
*/
contenitoreMain.style.display = 'none';

//Creazione classe Timer
class Timer {
    //Dichiarazione variabili della classe
    hour = 0;
    minute = 0;
    second = 0;
    count;
    startTimer = false;

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

    //Metodo per far partire il timer
    start() {
        this.startTimer = true;
        this._iniziaContare();
    }

    //Metodo che si preoccupa di far partire effettivamente il timer
    _iniziaContare() {
        if (this.startTimer) {
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
                        this.stop();
                    }
                }
            }, 1000)
        }
    }

    //Metodo per far fermare il timer
    stop() {
        this.startTimer = false;
        this._fermaContare();
    }

    //Metodo che si preoccupa di far bloccare effettivamente il timer
    _fermaContare() {
        clearInterval(this.count);
    }

    //Metodo che si preoccupa di mostrare quanto manca al timer
    _mostraTimer() {
        h.innerText = this.hour;
        m.innerText = this.minute;
        s.innerText = this.second;
    }
}

startTimer.addEventListener('click', () => {
    hour=document.querySelector('#setHour').value;
    minute=document.querySelector('#setMinute').value;
    second=document.querySelector('#setSecond').value;

    if(hour=='' && minute=='' && second==''){
        errorTimer.style.visibility="visible";

    }
    else{
        errorTimer.style.visibility="hidden";
        contenitoreMain.style.display = 'block';
        startTimer.style.display = 'none';
        contenitoreTimer.push(new Timer());
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
        contenitoreTimer[i].start();
        i++;
    }
})