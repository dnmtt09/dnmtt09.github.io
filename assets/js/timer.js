//Dichiarazione variabili html.
countDown = document.querySelector('#timer');
h = document.querySelector('#hour');
m = document.querySelector('#minute');
s = document.querySelector('#second');
startTimer = document.querySelector('#startTimer');
createTimer = document.querySelector('#createTimer');
setTimer = document.querySelector('#setTimer');
errorTimer = document.querySelector('.hideError');
firstChoice = document.querySelector(".firstChoice");
startTomato = document.querySelector('#startTomato');
button = document.querySelector('#button');

/*
    Section che comprende i pulsanti
    di pausa, stop, cancella e ricomincia.
*/

pauseTimer = document.querySelector('#pause');
stopTimer = document.querySelector('#stop');
cancelTimer = document.querySelector('#cancel');
restartTimer = document.querySelector("#restart");

/*
    Variabile creata per
    ritornare alla home quando sono nel timer pomodoro.
*/
homeTimer = document.querySelector("#home");

/*
    Da subito nascondo il pulsante restartTimer
    Verrà mostrato quando metto in pausa il timer.
*/
restartTimer.classList.add("hide");
homeTimer.classList.add("hide");

/*
    Variabile html che che compare quando l'utente 
    seleziona la modalità pomodoro (quando ci sono i 25 minuti)
    viene inserita la parola "WORK", mentre (quando ci sono i 5 minuti)
    viene inserita la parola "PAUSE".
*/
tomatoParagraph = document.querySelector("#tomatoParagraph");

document.body.classList.add("tomatoRedWallpaper");

//Creazione variabile per le istanze dell'oggetto Timer.
var contenitoreTimer;
var i = 0;

/*
    Variabile globale che uso per sapere
    se sto usando la tecnica del pomodoro (25 minuti di lavoro e 
    5 minuti di pause o un timer scelto dall'utente).
    True pomodoro, false timer utente
*/
var tipoTimerSelezionato;

/*
    All'inizio nascondo il messaggio di errore.
    Verrà mostrato quando l'utente inserisce un timer vuoto.
*/
errorTimer.classList.add('hide');


/*
    Nascondere quando parte l'applicativo il count-down
    il main con id Timer.
*/
countDown.classList.add('hideCountDown');

//Creazione classe Timer.
class Timer {
    //Dichiarazione variabili della classe.

    /*
        Variabili create per memorizzare il tempo
        che manca al timer. Vengono usate anche per inserire
        lo stato iniziale del timer.
    */
    #hour;
    #minute;
    #second;

    /*
        Questo array viene creato
        per salvare il timer impostato dall'utente.
        Viene utilizzato quando l'utente clicca il pulsante
        ricomincia, così prende il timer impostato precedentemente
        dall'utente da qui.
    */
    #setUserTimer = [];

    /*
        Variabile creata per sapere se il timer è partito o no,
        usata come raccoglitore nel setInterval del conto alla rovescia
        del timer.
    */
    #count;

    /*
        Variabile creata per sapere
        se devo attivare i 5 minuti di pausa,
        oppure ritornare ai 25 minuti.
        Se la variabile è impostata a false (di default)
        il pomodoro viene impostato sui 25 minuti
        altrimenti se è true il timer viene impostato sui 5 minuti.
    */
    #tomatoType = false;

    //Invocazione del metodo costruttore.
    constructor(hour = 0, minute = 0, second = 0) {
        this.#hour = hour;
        this.#minute = minute;
        this.#second = second;

        this.#setUserTimer[0] = hour;
        this.#setUserTimer[1] = minute;
        this.#setUserTimer[2] = second;
    }

    //Dichiarazione metodi della classe.

    //Metodi set

    /**
     * @param {Number} hour 
     * Metodo per settare le ore del timer.
     */
    setHour(hour) {
        this.#hour = hour;
        this.#setUserTimer[0] = hour;
    }

    /**
     * @param {Number} minute
     * Metodo per settare i minuti del timer.
     */
    setMinute(minute) {
        this.#minute = minute;
        this.#setUserTimer[1] = minute;
    }

    /**
     * @param {Number} second
     * Metodo per settare i secondi del timer.
     */
    setSecond(second) {
        this.#second = second;
        this.#setUserTimer[2] = second;
    }

    //Metodi get

    /**
     * @returns {Number}
     * Metodo per ottenere le ore del timer.
     */
    getHour() { return this.#setUserTimer[0]; }

    /**
     * @returns {Number}
     * Metodo per ottenere i minuti del timer.
     */
    getMinute() { return this.#setUserTimer[1]; }

    /**
     * @returns {Number}
     * Metodo per ottenere i secondi del timer.
     */
    getSecond() { return this.#setUserTimer[2]; }

    /**
     * Metodo per sapere se il timer e' partito o no.
     * @returns {Number}
     */
    getStatusTimer() { return this.#count; }

    /**
        * @param {Boolean} tipoTimer 
        * Metodo che può essere invocato dall'esterno
        * e serve per far partire il timer.
        * Mostra il timer e se il timer è scaduto controlla
        * se è un pomodoro, o un timer personalizzato
        * dall'utente.
        * Se tipoTimer viene impostato a true
        * mostra la scritta work
        * altrimenti non mette nulla (questo per evitare che quando
        * viene inserito l'etichetta relax non compaia l'etichetta work)
    */
    start(tipoTimer) {
        tomatoParagraph.classList.remove("hide");
        if (tipoTimer) {
            if(!this.#tomatoType){
                tomatoParagraph.innerText = "WORK";
            }
            else{
                tomatoParagraph.innerText = "RELAX";
            }
        }
        else{
            tomatoParagraph.innerText = "WORK";
        }
        this.#mostraTimer();
        this.#count = setInterval(() => {
            this.#mostraTimer();
            document.title=this.#hour+":"+this.#minute+":"+this.#second;
            if (this.#expiredTimer()) {
                document.title="Tomato Timer";
                if(tipoTimer){
                    this.stopTomato();
                }
                else{
                    this.stopTimer();
                }
                this.#playMusic();
            }
            if (this.#second > 0) {
                this.#second--;
            } else {
                if (this.#second == 0) {
                    this.#second = 59;
                }
                if (this.#minute > 0 && this.#second == 59) {
                    this.#minute--;
                } else if (this.#minute == 0 && this.#second == 59 && this.#hour > 0) {
                    this.#minute = 59;
                }
                if (this.#hour > 0 && this.#minute == 59) {
                    this.#hour--;
                }
            }
        }, 1000)
    }

    #playMusic(){
        const music = new Audio('assets/sound/timerScaduto.mp3');
        music.play();
    }

    /**
        * Metodo per bloccare il timer scelto dall'utente
     */
    stopTimer() {
        
        this.stopAndPause();
        
        if (this.#expiredTimer()) {
            startTimer.classList.remove("hide");
            home();       
        }
    }

    /**
     * Metodo per bloccare il timer. Se è stato selezionato
     * la tecnica pomodoro (25 minuti di lavoro e 5 minuti di pausa)
     * viene attivata la prima condizione. (25 minuti schermo rosso
     * 5 minuti schermo verde)
     * Quando terminano i 5 minuti, il timer viene impostato su 25 minuti
     * e lo sfondo viene reimpostato sul colore rosso.
     */
    stopTomato(){
        this.stopAndPause();

        if (this.#expiredTimer()) {
            if (!this.#tomatoType) {
                this.#tomatoType = true;
                document.body.classList.remove("tomatoRedWallpaper");
                document.body.classList.add("tomatoGreenWallpaper");
                tomatoParagraph.innerText = "RELAX";

                this.#hour = 0;
                this.#minute = 0;
                    this.#second = 5;
                    this.start(true);

            }
            else if (this.#tomatoType) {
                this.#hour = 0;
                this.#minute = 25;
                this.#second = 0;
                tomatoParagraph.innerText = "PAUSE";
                document.body.classList.add("tomatoRedWallpaper");
                document.body.classList.remove("tomatoGreenWallpaper");
                this.#mostraTimer();
                pauseTimer.innerText = 'START';
                pauseTimer.classList.add("pauseCenter");
                stopTimer.classList.add("hide");
                homeTimer.classList.remove("hide");
                this.#tomatoType = false;
            }
        }
        else{
            document.body.classList.add("tomatoRedWallpaper");
            document.body.classList.remove("tomatoGreenWallpaper");
        }

    }


    /**
     * Metodo privato che verifica se il timer è scaduto.
     * Se ritorna "true" il timer è scaduto
     * altrimenti no.
     * @returns {boolean}
     */
    #expiredTimer() {
        if (this.#hour == 0 && this.#minute == 0 && this.#second == 0) {
            return true;
        }
        return false;
    }

    /**
     * Metodo che cancella il setInterval, quindi il
     * timer smette di funzionare.
     */
    stopAndPause() {
        document.title="Tomato Timer";
        clearInterval(this.#count);
        this.#count = null;
    }


    /**
     * Metodo privato che stampa a schermo il tempo
     * rimanente del timer.
     */
    #mostraTimer() {
        h.innerText = this.#hour;
        m.innerText = this.#minute;
        s.innerText = this.#second;
    }

}
/*
    Funzione che permette attraverso il pulsante "home"
    di ritornare alla pagina principale
*/
function home() {
    setTimer.classList.add('hide');
    countDown.classList.add('hideCountDown');
    countDown.classList.remove('showCountDown');
    button.classList.add('hide');
    button.classList.remove('show');
    firstChoice.classList.remove('hide');
    tomatoParagraph.classList.add("hide");
}

/*
    Funzione per avviare il timer
*/
function partiTimer(tipoTimer) {
    countDown.classList.remove('hideCountDown');
    countDown.classList.add('showCountDown');
    button.classList.remove('hide');
    button.classList.add('show');
    contenitoreTimer = new Timer();

    if (tipoTimer) {//viene impostata la tecnica del pomodoro
        contenitoreTimer.setHour(0);
        contenitoreTimer.setMinute(0);
        contenitoreTimer.setSecond(10);
        contenitoreTimer.start(true);
    }
    else {//altrimenti viene chiesto all'utente
        //mediante input di inserire un timer
        if (hour == '') {
            contenitoreTimer.setHour(0);
        }
        else {
            contenitoreTimer.setHour(hour);
        }
        if (minute == '') {
            contenitoreTimer.setMinute(0);
        } else {
            contenitoreTimer.setMinute(minute);
        }
        if (second == '') {
            contenitoreTimer.setSecond(0);
        } else {
            contenitoreTimer.setSecond(second);
        }
        contenitoreTimer.start(false);
    }
}

function showErrorTimer(){
    errorTimer.classList.remove('hide');
    errorTimer.classList.add('show');
    setTimeout(() => {
        errorTimer.classList.add('hide');
        errorTimer.classList.remove('show');
    }, 3000)
}


//Ascoltatori

//Pulsante per far partire timer pomodoro
startTomato.addEventListener('click', () => {
    firstChoice.classList.add('hide');
    tipoTimerSelezionato = true;
    partiTimer(tipoTimerSelezionato);
})

//Pulsante per far partire timer personalizzato
startTimer.addEventListener('click', () => {
    hour = document.querySelector('#setHour').value;
    minute = document.querySelector('#setMinute').value;
    second = document.querySelector('#setSecond').value;
    /*
    (hour == '' || minute == '' || second == '') ||
     (hour == '0' && minute == '0' && second == '0') ||
     */
    if((hour == '' || minute == '' || second == '') ||
       (hour == '0' && minute == '0' && second == '0') ||
       (parseInt(hour)<0 || parseInt(hour)>24 ) || 
       (parseInt(minute)<0 || parseInt(minute)>59 ) || 
       (parseInt(second)<0 || parseInt(second)>59 )){
        showErrorTimer();
    }
    else {
        startTimer.classList.add('hide');
        setTimer.classList.add('hide');
        tipoTimerSelezionato = false;
        partiTimer(tipoTimerSelezionato);
    }
})

//Pulsante per creare ed avviare il timer
createTimer.addEventListener('click', () => {
    firstChoice.classList.add('hide');
    setTimer.classList.remove('hide');
})

//Pulsante per mettere in pausa il timer
pauseTimer.addEventListener('click', () => {
    stopTimer.classList.remove("hide");
    pauseTimer.classList.remove("pauseCenter");
    homeTimer.classList.add("hide");
    if (contenitoreTimer.getStatusTimer() != null) {
        pauseTimer.innerText = 'RESUME';
        restartTimer.classList.remove("hide");
        stopTimer.classList.add("hide");
        tomatoParagraph.innerText = "PAUSE";
        contenitoreTimer.stopAndPause();
    }
    else {
        pauseTimer.innerText = 'PAUSE';
        restartTimer.classList.add("hide");
        stopTimer.classList.remove("hide");
        if(tipoTimerSelezionato){
            contenitoreTimer.start(true);
        }
        else{
            contenitoreTimer.start(false);
        }
    }
})

//Pulsante per far ri-partire il timer
restartTimer.addEventListener("click", () => {
    homeTimer.classList.add("hide");
    contenitoreTimer.setHour(contenitoreTimer.getHour());
    contenitoreTimer.setMinute(contenitoreTimer.getMinute());
    contenitoreTimer.setSecond(contenitoreTimer.getSecond());
    pauseTimer.innerText = 'PAUSE';
    restartTimer.classList.add("hide");
    stopTimer.classList.remove("hide");
    contenitoreTimer.start(true);
})

//Pulsante per far fermare il timer
stopTimer.addEventListener('click', () => {
    startTimer.classList.remove("hide");
    hour.innerText=0;
    minute.innerText=0;
    second.innerText=0;
    if(tipoTimerSelezionato){
        contenitoreTimer.stopTomato();
    }
    else{
        contenitoreTimer.stopTimer();
    }
    home();
    
})

//Pulsante per cancellare il timer
cancelTimer.addEventListener('click', () => {
    home();
})

//Pulsante per ritornare alla home
homeTimer.addEventListener('click', () => {
    home();
})
