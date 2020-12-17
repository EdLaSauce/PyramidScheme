function initSons() {
    const objSons = new Object();

    // GameOver
    let objSon = document.createElement('audio');
    objSon.setAttribute('src', 'Maniacal Witches Laugh.mp3');
    objSon.load();
    objSon.loop = false;
    objSons.gameOver = objSon;

    // Début du niveau
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'Jump.mp3');
    objSon.load();
    objSon.loop = false;
    objSon.volume = 0.75;
    objSons.debutNiveau = objSon;

    // Gagner du jeu
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'Ta Da.mp3');
    objSon.load();
    objSon.loop = false;
    objSons.gagnerJeu = objSon;

    // Trouver tresor
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'niveauTermine.mp3');
    objSon.load();
    objSon.loop = false;
    objSons.trouverTresor = objSon;

    // Ouvrir Mur
    objSon = document.createElement('audio');
    objSon.setAttribute('src', 'sawing-wood.mp3');
    objSon.load();
    objSon.loop = false;
    objSons.ouvrirMur = objSon;

     // Recommencer
     objSon = document.createElement('audio');
     objSon.setAttribute('src', 'Beam Me Up Scotty.mp3');
     objSon.load();
     objSon.loop = false;
     objSons.recommence = objSon;

     //Son herse
     objSon = document.createElement('audio');
     objSon.setAttribute('src', 'Chain Dropped.mp3');
     objSon.load();
     objSon.loop = false;
     objSons.herseFerme = objSon;

    return objSons;
}