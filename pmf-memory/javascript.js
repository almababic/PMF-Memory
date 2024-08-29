//nova igra:
function igra() {
	let x = document.getElementById("igra");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
  	}
}

//memory osoblje:
function osoblje() {
	let x = document.getElementById("osoblje");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
  	}
    memoryOsoblje();
}

function memoryOsoblje() {
    const kartice = document.querySelectorAll('.karticaOsoblje');
    let prvaKartica;
    let drugaKartica;
    let okrenutaKartica = false;
    let zakljucanaTabla = false;
    let vrijeme = 0;
    let brojPoteza = 0;
    let pocelaIgra = false;
    let interval;

    function pocetakIgre() {
        pocelaIgra = true;
        //racuna vrijeme koje je korisniku trebalo da rijesi igru
        //svake sekunde povecava vrijeme za 1
        interval = setInterval(() => {
            vrijeme++
        }, 1000)
    }

    function okreniKarticu() {
        if (!pocelaIgra) {
            pocetakIgre();
        }
        
        //ako je tabla zakljucana ne mozemo okretati kartice
        if (zakljucanaTabla) return;  

        //ukoliko 2 puta kliknemo na istu karticu prepoznalo bi se kao da je to par, jer se radi o istim karticama
        //da bi se to izbjeglo drugaKartica ne smije biti prvaKartica
        if (this === prvaKartica) return;

        //racuna ukupan broj poteza u igri
        brojPoteza++;

        this.classList.add('okreni');

        if (!okrenutaKartica) {
            okrenutaKartica = true;
            prvaKartica = this;
            return;
        }

        drugaKartica = this;

        daLiSuPar();

        //ako nema vise kartica koje mozemo okrenuti igra je zavrsena
        if (!document.querySelectorAll('.karticaOsoblje:not(.okreni)').length) {
            document.getElementById("vrijeme").innerHTML = vrijeme;
            document.getElementById("potezi").innerHTML = brojPoteza/2;   //posto u jednom potezu izvlacimo 2 kartice, a brojPoteza se povecavao za 1 pri svakom okretanju kartice, dijelimo ga sa 2
            $('#krajIgre').show();    //https://stackoverflow.com/questions/6242976/javascript-hide-show-element
        }
    }

    //provjerava da li su okrenute kartice par, tj da li su jednakih oznaka
    //ako jesu ostavlja ih okrenute licem ka gore, a ako nisu vraca ih, tj okrece se opet slika sa upitnikom
    function daLiSuPar() {
        if (prvaKartica.dataset.oznaka === drugaKartica.dataset.oznaka) {
            ostaviKarticeOkrenute();
            return;
        }

        vratiKartice();
    }

    //posto su okrenute kartice par, ostavlja ih okrenute licem ka gore
    //ukida se opcija click, tj ne mozemo vise kliknuti na te kartice
    //resetuju se varijable na pocetne vrijednosti
    function ostaviKarticeOkrenute() {
        prvaKartica.removeEventListener('click', okreniKarticu);
        drugaKartica.removeEventListener('click', okreniKarticu);

        reset();
    }

    //posto okrenute kartice nisu par, nakon nekog vremena vracamo ih, tj ukida se opcija okreni i vraca se slika sa upitnikom
    //resetuju se varijable na pocetne vrijednosti
    function vratiKartice() {
        //dok kartice koje nisu par stoje otvorene neko vrijeme tabla se zakljucava da se ne bi mogle otvarati dalje kartice
        //posto se u jednom potezu mogu otvoriti samo 2 kartice ovim smo rijesili problem otvaranja vise od 2 kartice u jednom potezu
        zakljucanaTabla = true; 

        setTimeout(() => {
            prvaKartica.classList.remove('okreni');
            drugaKartica.classList.remove('okreni');

            reset();
        }, 1000);
    }

    //resetuje varijable na pocetne vrijednosti
    function reset() {
        okrenutaKartica = false;
        zakljucanaTabla = false;
        prvaKartica = null;
        drugaKartica = null;
    }

    //random raspored svih 16 kartica
    //self-invoking (samopozivajuca) f-ja - poziva se automatski
    (function izmjesajKartice() {
        kartice.forEach(karticaOsoblje => {
            let random = Math.floor(Math.random() * 16);
            karticaOsoblje.style.order = random;
        });
    })();

    kartice.forEach(karticaOsoblje => karticaOsoblje.addEventListener('click', okreniKarticu));
}

//memory fakultet:
function fakultet() {
	let x = document.getElementById("fakultet");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
  	}
    memoryFakultet();
}

function memoryFakultet() {
    const kartice = document.querySelectorAll('.karticaFakultet');
    let prvaKartica;
    let drugaKartica;
    let okrenutaKartica = false;
    let zakljucanaTabla = false;
    let vrijeme = 0;
    let brojPoteza = 0;
    let pocelaIgra = false;
    let interval;

    function pocetakIgre() {
        pocelaIgra = true;
        //racuna vrijeme koje je korisniku trebalo da rijesi igru
        //svake sekunde povecava vrijeme za 1
        interval = setInterval(() => {
            vrijeme++
        }, 1000)      
    }

    function okreniKarticu() {
        if (!pocelaIgra) {
            pocetakIgre();
        }

        //ako je tabla zakljucana ne mozemo okretati kartice
        if (zakljucanaTabla) return;
    
        //ukoliko 2 puta kliknemo na istu karticu prepoznalo bi se kao da je to par, jer se radi o istim karticama
        //da bi se to izbjeglo drugaKartica ne smije biti prvaKartica        
        if (this === prvaKartica) return;

        //racuna ukupan broj poteza u igri
        brojPoteza++; 

        this.classList.add('okreni');

        if (!okrenutaKartica) {
            okrenutaKartica = true;
            prvaKartica = this;
            return;
        }

        drugaKartica = this;

        daLiSuPar();

        //ako nema vise kartica koje mozemo okrenuti igra je zavrsena
        if (!document.querySelectorAll('.karticaFakultet:not(.okreni)').length) {
            document.getElementById("vrijeme").innerHTML = vrijeme;
            document.getElementById("potezi").innerHTML = brojPoteza/2;   //posto u jednom potezu izvlacimo 2 kartice, a brojPoteza se povecavao za 1 pri svakom okretanju kartice, dijelimo ga sa 2
            $('#krajIgre').show();    //https://stackoverflow.com/questions/6242976/javascript-hide-show-element
        }
    }

    //provjerava da li su okrenute kartice par, tj da li su jednakih oznaka
    //ako jesu ostavlja ih okrenute licem ka gore, a ako nisu vraca ih, tj okrece se opet slika sa upitnikom
    function daLiSuPar() {
        if (prvaKartica.dataset.oznaka === drugaKartica.dataset.oznaka) {
            ostaviKarticeOkrenute();
            return;
        }

        vratiKartice();
    }

    //posto su okrenute kartice par, ostavlja ih okrenute licem ka gore
    //ukida se opcija click, tj ne mozemo vise kliknuti na te kartice
    //resetuju se varijable na pocetne vrijednosti
    function ostaviKarticeOkrenute() {
        prvaKartica.removeEventListener('click', okreniKarticu);
        drugaKartica.removeEventListener('click', okreniKarticu);

        reset();
    }

    //posto okrenute kartice nisu par, nakon nekog vremena vracamo ih, tj ukida se opcija okreni i vraca se slika sa upitnikom
    //resetuju se varijable na pocetne vrijednosti
    function vratiKartice() {
        //dok kartice koje nisu par stoje otvorene neko vrijeme tabla se zakljucava da se ne bi mogle otvarati dalje kartice
        //posto se u jednom potezu mogu otvoriti samo 2 kartice ovim smo rijesili problem otvaranja vise od 2 kartice u jednom potezu
        zakljucanaTabla = true;

        setTimeout(() => {
            prvaKartica.classList.remove('okreni');
            drugaKartica.classList.remove('okreni');

            reset();
        }, 1000);
    }

    //resetuje varijable na pocetne vrijednosti
    function reset() {
        okrenutaKartica = false;
        zakljucanaTabla = false;
        prvaKartica = null;
        drugaKartica = null;
    }

    //random raspored svih 16 kartica
    //self-invoking (samopozivajuca) f-ja - poziva se automatski
    (function izmjesajKartice() {
        kartice.forEach(karticaFakultet => {
            let random = Math.floor(Math.random() * 16);
            karticaFakultet.style.order = random;
        });
    })();

    kartice.forEach(karticaFakultet => karticaFakultet.addEventListener('click', okreniKarticu));
}

//memory razno:
function razno() {
	let x = document.getElementById("razno");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
  	}
    memoryRazno();
}

function memoryRazno() {
    const kartice = document.querySelectorAll('.karticaRazno');
    let prvaKartica;
    let drugaKartica;
    let okrenutaKartica = false;
    let zakljucanaTabla = false;
    let vrijeme = 0;
    let brojPoteza = 0;
    let pocelaIgra = false;
    let interval;

    function pocetakIgre() {
        pocelaIgra = true;
        //racuna vrijeme koje je korisniku trebalo da rijesi igru
        //svake sekunde povecava vrijeme za 1
        interval = setInterval(() => {
            vrijeme++
        }, 1000)
    }

    function okreniKarticu() {
        if (!pocelaIgra) {
            pocetakIgre();
        }

        //ako je tabla zakljucana ne mozemo okretati kartice
        if (zakljucanaTabla) return;

        //ukoliko 2 puta kliknemo na istu karticu prepoznalo bi se kao da je to par, jer se radi o istim karticama
        //da bi se to izbjeglo drugaKartica ne smije biti prvaKartica
        if (this === prvaKartica) return;

        //racuna ukupan broj poteza u igri
        brojPoteza++;

        this.classList.add('okreni');

        if (!okrenutaKartica) {
            okrenutaKartica = true;
            prvaKartica = this;
            return;
        }

        drugaKartica = this;

        daLiSuPar();

        //ako nema vise kartica koje mozemo okrenuti igra je zavrsena
        if (!document.querySelectorAll('.karticaRazno:not(.okreni)').length) {
            document.getElementById("vrijeme").innerHTML = vrijeme;
            document.getElementById("potezi").innerHTML = brojPoteza/2;   //posto u jednom potezu izvlacimo 2 kartice, a brojPoteza se povecavao za 1 pri svakom okretanju kartice, dijelimo ga sa 2
            $('#krajIgre').show();    //https://stackoverflow.com/questions/6242976/javascript-hide-show-element
        }
    }

    //provjerava da li su okrenute kartice par, tj da li su jednakih oznaka
    //ako jesu ostavlja ih okrenute licem ka gore, a ako nisu vraca ih, tj okrece se opet slika sa upitnikom
    function daLiSuPar() {
        if (prvaKartica.dataset.oznaka === drugaKartica.dataset.oznaka) {
            ostaviKarticeOkrenute();
            return;
        }

        vratiKartice();
    }

    //posto su okrenute kartice par, ostavlja ih okrenute licem ka gore
    //ukida se opcija click, tj ne mozemo vise kliknuti na te kartice
    //resetuju se varijable na pocetne vrijednosti
    function ostaviKarticeOkrenute() {
        prvaKartica.removeEventListener('click', okreniKarticu);
        drugaKartica.removeEventListener('click', okreniKarticu);

        reset();
    }

    //posto okrenute kartice nisu par, nakon nekog vremena vracamo ih, tj ukida se opcija okreni i vraca se slika sa upitnikom
    //resetuju se varijable na pocetne vrijednosti
    function vratiKartice() {
        //dok kartice koje nisu par stoje otvorene neko vrijeme tabla se zakljucava da se ne bi mogle otvarati dalje kartice
        //posto se u jednom potezu mogu otvoriti samo 2 kartice ovim smo rijesili problem otvaranja vise od 2 kartice u jednom potezu
        zakljucanaTabla = true;

        setTimeout(() => {
            prvaKartica.classList.remove('okreni');
            drugaKartica.classList.remove('okreni');

            reset();
        }, 1000);
    }

    //resetuje varijable na pocetne vrijednosti
    function reset() {
        okrenutaKartica = false;
        zakljucanaTabla = false;
        prvaKartica = null;
        drugaKartica = null;
    }

    //random raspored svih 16 kartica
    //self-invoking (samopozivajuca) f-ja - poziva se automatski
    (function izmjesajKartice() {
        kartice.forEach(karticaRazno => {
            let random = Math.floor(Math.random() * 16);
            karticaRazno.style.order = random;
        });
    })();

    kartice.forEach(karticaRazno => karticaRazno.addEventListener('click', okreniKarticu));
}

//upute:
function pravilaIgre() {
    let x = document.getElementById("pravilaIgre");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

//o projektu:
function projekat() {
	let x = document.getElementById("projekat");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
  	}
}