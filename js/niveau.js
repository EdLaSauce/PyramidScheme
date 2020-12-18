function initNiveau(){
    const objNiveau = new Object();
    /* [z][x] */
    objNiveau.tableau = creerDedale();
    objNiveau.binStart = false;

    objNiveau.level = 0;
    objNiveau.coordTresor = trouverEmplacementTresor(objNiveau.tableau);
    objNiveau.temps = 60;
    objNiveau.score = 300;
    objNiveau.ouvreurs = calculerOuvreurs(objNiveau.level);

    return objNiveau;
}

function trouverEmplacementTresor(tab){
    const tabEmplacements  = new Array();
    for(let z=1;z<tab.length;z++){
        for(let x = 1;x<tab[z].length;x++){
            if(tab[z][x] == " "){
                //ne pas placer le trésor devant l'enclos
                if(z!=12 ||(z==12 && (x<12||x>18))){
                    tabEmplacements.push([z,x]);
                }
            }
        }
    }
    const rand = Math.floor((Math.random() * tabEmplacements.length+1));
    
    //console.log(rand);
    return tabEmplacements[rand];
}

function calculerOuvreurs(lvl){
    const depart = 4;
    const level = lvl;
    return depart-Math.floor(level/2);
}

function creerDedale(){
    return [
        //       0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
        /* 0 */["=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","="],
        /* 1 */["="," "," "," "," "," "," "," "," "," "," "," "," "," "," ","O"," "," "," "," "," "," "," "," "," "," "," "," "," "," ","="],
        /* 2 */["="," ","O","O","O","O","O","O"," ","O","O","O","O","O"," ","O"," ","O","O","O","O","O"," ","O","O","O","O","O","O"," ","="],
        /* 3 */["="," "," "," "," "," "," "," "," ","O"," "," "," ","O"," ","O"," ","O"," "," "," ","O"," "," "," "," "," "," "," "," ","="],
        /* 4 */["=","O","O","O","O","O","O","O"," ","O","O"," ","O","O"," ","O"," ","O","O"," ","O","O"," ","O","O","O","O","O","O","O","="],
        /* 5 */["="," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","="],
        /* 6 */["=","O","O","O"," ","O","O","O"," ","O"," ","O","O","O"," ","O"," ","O","O","O"," ","O"," ","O","O","O"," ","O","O","O","="],
        /* 7 */["="," "," "," "," "," "," "," "," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," "," "," "," "," "," "," "," ","="],
        /* 8 */["=","O","O","O"," ","O","O","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O","O","O"," ","O","O","O","="],
        /* 9 */["="," "," "," "," "," "," "," "," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," "," "," "," "," "," "," "," ","="],
        /*10 */["="," ","O","O","O","O","O","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O"," ","O","O","O","O","O","O"," ","="],
        /*11 */["="," "," "," "," "," "," ","O"," ","O","O","O"," ","O"," ","O"," ","O"," ","O","O","O"," ","O"," "," "," "," "," "," ","="],
        /*12 */["=","O","O","O","O","O"," ","O"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","O"," ","O","O","O","O","O","="],
        /*13 */["="," "," "," "," "," "," ","O"," ","O","O","O"," ","=","="," ","=","="," ","O","O","O"," ","O"," "," "," "," "," "," ","="],
        /*14 */["="," ","O","O","O","O","O","O"," ","O"," ","O"," ","=","E","E","E","="," ","O"," ","O"," ","O","O","O","O","O","O"," ","="],
        /*15 */["="," "," "," "," "," "," "," "," ","O"," ","O"," ","=","E","E","E","="," ","O"," ","O"," "," "," "," "," "," "," "," ","="],
        /*16 */["=","O","O","O","O","O","O","O"," ","O"," ","O"," ","=","E","E","E","="," ","O"," ","O"," ","O","O","O","O","O","O","O","="],
        /*17 */["="," "," "," "," "," "," "," "," ","O"," ","O"," ","=","=","=","=","="," ","O"," ","O"," "," "," "," "," "," "," "," ","="],
        /*18 */["="," ","O","O","O","O","O","O"," ","O"," ","O"," "," "," "," "," "," "," ","O"," ","O"," ","O","O","O","O","O","O"," ","="],
        /*19 */["="," ","O"," "," "," "," "," "," ","O"," ","O","O","O","O"," ","O","O","O","O"," ","O"," "," "," "," "," "," ","O"," ","="],
        /*20 */["="," ","O"," ","O","O","O","O"," ","O"," "," "," "," ","O"," ","O"," "," "," "," ","O"," ","O","O","O","O"," ","O"," ","="],
        /*21 */["="," ","O"," ","O"," "," "," "," ","O"," ","O"," "," ","O"," ","O"," "," ","O"," ","O"," "," "," "," ","O"," ","O"," ","="],
        /*22 */["="," ","O"," ","O","O","O","O"," ","O"," ","O"," ","O","O"," ","O","O"," ","O"," ","O"," ","O","O","O","O"," ","O"," ","="],
        /*23 */["="," "," "," "," "," "," ","O"," ","O"," "," "," ","O"," "," "," ","O"," "," "," ","O"," ","O"," "," "," "," "," "," ","="],
        /*24 */["="," ","O","O","O","O"," ","O"," ","O"," ","O","O","O"," ","O"," ","O","O","O"," ","O"," ","O"," ","O","O","O","O"," ","="],
        /*25 */["="," "," "," "," "," "," ","O"," "," "," ","O"," "," "," "," "," "," "," ","O"," "," "," ","O"," "," "," "," "," "," ","="],
        /*26 */["="," ","O"," ","O","O"," ","O"," ","O","O","O"," ","O","O"," ","O","O"," ","O","O","O"," ","O"," ","O","O"," ","O"," ","="],
        /*27 */["="," ","O"," ","O"," "," ","O"," ","O"," "," "," ","O"," "," "," ","O"," "," "," ","O"," ","O"," "," ","O"," ","O"," ","="],
        /*28 */["=","O","O"," ","O","O","O","O"," ","O"," ","O","O","O","O","O","O","O","O","O"," ","O"," ","O","O","O","O"," ","O","O","="],
        /*29 */["="," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","="],
        /*30 */["=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","=","="]
        ];
}

function ajusterValeurs(){
    objNiveau.temps--;

    document.getElementById('lblTemps').innerHTML = objNiveau.temps;
    document.getElementById('lblScore').innerHTML = objNiveau.score;
}

function recommencer(){
    objSons.recommence.play();
    objNiveau.score -= 200;
    clearInterval(valuesController);
    const scoreActuel = objNiveau.score;
    const levelActuel = objNiveau.level;
    const coordTresor = objNiveau.coordTresor;
    binRecommence = true;
    binVueAerienne = false;
    objNiveau = initNiveau();
    objNiveau.score = scoreActuel;
    objNiveau.level = levelActuel;
    objNiveau.coordTresor = coordTresor;
    objNiveau.ouvreurs = calculerOuvreurs(objNiveau.level);

    objScene3D = initScene3D(objgl);
    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}

function gagner(){
    //Finir niveau actuel
    objNiveau.score += objNiveau.temps * 10;
    clearInterval(valuesController);
    const scoreActuel = objNiveau.score;
    const levelActuel = objNiveau.level;
    if(levelActuel != 9){
        //Réinitialiser avec nouvelles valeurs
        objSons.trouverTresor.currentTime = 0.0;
        objSons.trouverTresor.play();
        binRecommence = false;
        binVueAerienne = false;
        objNiveau = initNiveau();
        objNiveau.score = scoreActuel;
        objNiveau.level = levelActuel +1;
        objNiveau.ouvreurs = calculerOuvreurs(objNiveau.level);

        //Repartir la scène
        objScene3D = initScene3D(objgl);
        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);
    }else{
        //Terminer tous les niveaux
        objSons.gagnerJeu.play();
        effacerCanevas(objgl);
        clearInterval(valuesController);
        binPeutBouger = false;
        binVueAerienne = false;
    }
}

function gameOver(){
    objSons.gameOver.play();
    effacerCanevas(objgl);
    clearInterval(valuesController);
    binPeutBouger = false;
    binVueAerienne = false;
}