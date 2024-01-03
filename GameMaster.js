
let objgl = null;
let objProgShaders = null;
let objScene3D = null;
let objNiveau = null;
let binVueAerienne = false;
let cameraJoueur = null;
let valuesController = null;
let binRecommence = false;
let binPeutBouger = true;
let binPeutLireAudio = false;

//const tabImages = ['Transparent.gif', 'soil2.jpg', 'concrete_floor.jpg', 'Ciel.jpg', 'Stone wall.jpg', 'shrub.png', 'gold_x256.jpg', 'herse.png'];
// images en base64 (pour éviter le transfert cross-origin)
const tabImages = [Transparent_b64, soil2_b64, concrete_floor_b64,ciel_b64,stone_wall_b64,shrub_b64,gold_256_b64,herse_b64];
const TEX_TRANSPARENT = 0;
const TEX_SOL = 1;
const TEX_ENCLOS = 2;
const TEX_CIEL = 3;
const TEX_MUR_NO = 4;
const TEX_MUR_O = 5;
const TEX_TRESOR = 6;
const TEX_HERSE = 7;

function demarrer() {
    //navigator.permissions.query({name: 'speaker'})
    const objCanvas = document.getElementById('monCanvas');
    objgl = initWebGL(objCanvas);  // Initialise le contexte WebGL
    objProgShaders = initShaders(objgl);
    objSons = initSons();
    objNiveau = initNiveau();
    objScene3D = initScene3D(objgl); // Créer la scène

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
    //animer();
}

// Un cycle d'animation	
function animer() {
    // Requête pour le prochain cycle
    objCycleAnimation = requestAnimationFrame(animer);

    // Le cycle d'animation
    effacerCanevas(objgl);
    mettreAjourAnimation();
    dessiner(objgl, objProgShaders, objScene3D);
}

// Pour mettre à jour l'animation
function mettreAjourAnimation() {

}

function initScene3D(objgl) {
    document.getElementById('lblNiveau').innerHTML = objNiveau.level + 1;
    document.getElementById('lblTemps').innerHTML = objNiveau.temps;
    document.getElementById('lblOuvreurs').innerHTML = objNiveau.ouvreurs;
    document.getElementById('lblScore').innerHTML = objNiveau.score;

    if (!binRecommence && binPeutLireAudio)
        if (!objSons.trouverTresor.paused) {
            binPeutBouger = false;
            setTimeout(function () {
                objSons.debutNiveau.play();
                binPeutBouger = true;
            }, 3000);
        } else {
            objSons.debutNiveau.play();
        }


    const objScene3D = new Object();
    const tabObjets3D = new Array();

    // Mettre les textures dans la scène
    objScene3D.textures = creerTextures(objgl, tabImages);

    //Création des objets et met dans le tableau tabObjets3D
    const obj3DSol = creerObj3DSol(objgl, TEX_SOL)
    tabObjets3D.push(obj3DSol);                                     //0

    const obj3DEnclos = creerObj3DEnclos(objgl, TEX_ENCLOS);
    setPositionsXYZ([14, 0.1, 14], obj3DEnclos.transformations);
    tabObjets3D.push(obj3DEnclos);                                  //1

    const obj3DCiel = creerObj3DCiel(objgl, TEX_CIEL);
    setPositionsXYZ([15.5, 4, 15.5], obj3DCiel.transformations);
    tabObjets3D.push(obj3DCiel);                                    //2

    // Trésor
    const obj3DTresor = creerObj3DTresor(objgl, TEX_TRESOR);
    tabObjets3D.push(obj3DTresor);                                  //3

    const obj3DPorte = creerObj3DHerse(objgl, TEX_HERSE);
    setPositionsXYZ([15, 0, 13], obj3DPorte.transformations);
    if (objNiveau.tableau[13][15] === 'G') {
        obj3DPorte.binVisible = true;
    }
    tabObjets3D.push(obj3DPorte);                                   //4

    /* Parcours du niveau */
    for (let z = 0; z < objNiveau.tableau.length; z++) {
        for (let x = 0; x < objNiveau.tableau[z].length; x++) {
            let obj3DDivers = null;
            switch (objNiveau.tableau[z][x]) {
                case "=":
                    obj3DDivers = creerMur(objgl, TEX_MUR_NO, false);
                    setPositionsXYZ([x, 0, z], obj3DDivers.transformations);
                    break;
                case "O":
                    obj3DDivers = creerMur(objgl, TEX_MUR_O, true);
                    setPositionsXYZ([x, 0, z], obj3DDivers.transformations);
                    break;
            }
            if (obj3DDivers != null)
                tabObjets3D.push(obj3DDivers);
        }
    }

    // Mettre les objets 3D sur la scène (par objNiveau.tableau)
    objScene3D.tabObjets3D = tabObjets3D;

    // La caméra
    const camera = creerCamera();
    setPositionsCameraXYZ([15.5, 0.8, 15.5], camera);
    setCiblesCameraXYZ([15.5, 0.8, 0], camera);
    setOrientationsXYZ([0, 1, 0], camera);
    objScene3D.camera = camera;

    return objScene3D;
}

function dessiner(objgl, objProgShaders, objScene3D) {
    // La vue
    objgl.viewport(0, 0, objgl.drawingBufferWidth, objgl.drawingBufferHeight);

    // Matrice de projection
    const matProjection = mat4.create();
    const fltRapportCanevas = objgl.drawingBufferWidth / objgl.drawingBufferHeight;
    if (!binVueAerienne)
        mat4.perspective(45, fltRapportCanevas, 0.01, 100, matProjection);
    else
        mat4.ortho(-15, 16, -16, 15, 0, 5, matProjection);

    // Relier la matrice aux shaders
    objgl.uniformMatrix4fv(objProgShaders.matProjection, false, matProjection);

    for (let i = 0; i < objScene3D.tabObjets3D.length; i++) {
        if (objScene3D.tabObjets3D[i].binVisible) {

            const vertex = objScene3D.tabObjets3D[i].vertex;
            const couleurs = objScene3D.tabObjets3D[i].couleurs;
            const texels = objScene3D.tabObjets3D[i].texels;
            const maillage = objScene3D.tabObjets3D[i].maillage;
            const transformations = objScene3D.tabObjets3D[i].transformations;


            // Matrice du modèle            
            const matModeleVue = mat4.create();
            mat4.identity(matModeleVue);

            // Placer la caméra sur la scène
            mat4.lookAt(getPositionsCameraXYZ(objScene3D.camera),
                getCiblesCameraXYZ(objScene3D.camera),
                getOrientationsXYZ(objScene3D.camera),
                matModeleVue);

            // Appliquer les transformations sur le modèle 
            mat4.translate(matModeleVue, getPositionsXYZ(transformations));
            mat4.scale(matModeleVue, getEchellesXYZ(transformations));
            mat4.rotateX(matModeleVue, getAngleX(transformations) * Math.PI / 180);
            mat4.rotateY(matModeleVue, getAngleY(transformations) * Math.PI / 180);
            mat4.rotateZ(matModeleVue, getAngleZ(transformations) * Math.PI / 180);

            // Relier la matrice aux shaders
            objgl.uniformMatrix4fv(objProgShaders.matModeleVue, false, matModeleVue);

            if (maillage == null)
                // Dessiner les sous-objets
                for (let j = 0; j < vertex.length; j++) {

                    // Relier les vertex aux shaders
                    objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex[j]);
                    objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);
                    const intNbVertex = (objgl.getBufferParameter(objgl.ARRAY_BUFFER, objgl.BUFFER_SIZE) / 4) / 3;

                    // Relier les couleurs aux shaders
                    objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs[j]);
                    objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0);

                    // Activer la texture
                    objgl.activeTexture(objgl.TEXTURE0 + texels[j].intNoTexture);
                    objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels[j].intNoTexture]);

                    // Relier les texels aux shaders
                    objgl.bindBuffer(objgl.ARRAY_BUFFER, texels[j]);
                    objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

                    // Relier le no de texture et le taux de couleur aux shaders                 
                    objgl.uniform1i(objProgShaders.noTexture, texels[j].intNoTexture);
                    objgl.uniform1f(objProgShaders.pcCouleurTexel, texels[j].pcCouleurTexel);

                    // Dessiner
                    objgl.drawArrays(vertex[j].typeDessin, 0, intNbVertex);
                }
            else { // Dessiner le maillage

                // Relier les vertex aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, vertex);
                objgl.vertexAttribPointer(objProgShaders.posVertex, 3, objgl.FLOAT, false, 0, 0);

                // Relier les couleurs aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, couleurs);
                objgl.vertexAttribPointer(objProgShaders.couleurVertex, 4, objgl.FLOAT, false, 0, 0)

                // Activer la texture
                objgl.activeTexture(objgl.TEXTURE0 + texels.intNoTexture);
                objgl.bindTexture(objgl.TEXTURE_2D, objScene3D.textures[texels.intNoTexture]);

                // Relier les texels aux shaders
                objgl.bindBuffer(objgl.ARRAY_BUFFER, texels);
                objgl.vertexAttribPointer(objProgShaders.posTexel, 2, objgl.FLOAT, false, 0, 0);

                // Relier le no de texture et le taux de couleur aux shaders                 
                objgl.uniform1i(objProgShaders.noTexture, texels.intNoTexture);
                objgl.uniform1f(objProgShaders.pcCouleurTexel, texels.pcCouleurTexel);

                // Sélectionner le maillage qu'on va utiliser pour les triangles et les droites
                objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, maillage);

                // Dessiner les triangles
                objgl.drawElements(objgl.TRIANGLES, maillage.intNbTriangles * 3, objgl.UNSIGNED_SHORT, 0);
                // Dessiner les droites à la suite des triangles
                objgl.drawElements(objgl.LINES, maillage.intNbDroites * 2, objgl.UNSIGNED_SHORT, maillage.intNbTriangles * 2 * 3);
            }
        }
    }
}

function effacerCanevas(objgl) {
    // Met la couleur d'effacement au noir et complétement opaque
    objgl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Efface les couleurs et le buffer de profondeur.
    objgl.clear(objgl.COLOR_BUFFER_BIT | objgl.DEPTH_BUFFER_BIT);
}

function deplacerCamera() {
    const camera = objScene3D.camera;

    if (!binPeutBouger)
        return false;

    let fltX;
    let fltZ;
    let intDirection;
    let fltXPrime;
    let fltZPrime;
    let binAucuneCollision;

    //Lors que le joueur appuie sur une touche au départ,
    //Débuter le controlleur de valeurs
    if (!objNiveau.binStart) {
        objNiveau.binStart = true;
        valuesController = setInterval(function () {

            if (binVueAerienne) {
                objNiveau.score -= 10;
                if (objNiveau.score < 10) {
                    //fin de la vue aérienne

                    binVueAerienne = false;
                    objScene3D.tabObjets3D[2].binVisible = true;
                    objScene3D.tabObjets3D[3].binVisible = true;
                    objScene3D.camera = cameraJoueur;

                    effacerCanevas(objgl);
                    dessiner(objgl, objProgShaders, objScene3D);
                }
            }

            if (objNiveau.score <= 0) {
                objNiveau.score = 0;
            }
            ajusterValeurs();
            if (objNiveau.temps <= 0) {
                objNiveau.temps = 0;

                if (objNiveau.score < 200) {
                    gameOver();
                } else {
                    recommencer();
                }
            }


        }, 1000);
    }

    if ((event.keyCode == 37 || event.keyCode == 39) && !binVueAerienne) {
        // 37:  Flèche-à-gauche; 39:Flèche-à-droite
        fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        intDirection = (event.keyCode == 37) ? -1 : 1;
        const fltAngle = intDirection * Math.PI / 90; // Tourner 2 degrés
        fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
        fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
        setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
        setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
    }
    else if ((event.keyCode == 38 || event.keyCode == 40) && !binVueAerienne) {
        // 38:  Flèche-en-haut; 40:Flèche-en-bas
        fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
        intDirection = (event.keyCode == 38) ? 1 : -1;

        fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
        fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

        // Positions de la caméra
        let fltXCamera = getPositionX(camera) + fltXPrime;
        let fltZCamera = getPositionZ(camera) + fltZPrime;

        const celluleZ = Math.floor(fltZCamera);
        const celluleX = Math.floor(fltXCamera);
        const typeCellule = objNiveau.tableau[celluleZ][celluleX];
        binAucuneCollision = true;

        if (typeCellule === '=' || typeCellule === 'O' || typeCellule === 'G') {
            binAucuneCollision = false;
        }

        if (celluleX === objNiveau.coordTresor[1] && celluleZ === objNiveau.coordTresor[0]) { // Passer à un autre niveau
            gagner();
        }
        else if (binAucuneCollision) { // Déplacer la caméra
            setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
            setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
            setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
            setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);

            if (celluleZ === 12 && (celluleX === 15 || celluleX === 14 || celluleX === 16)) {
                if (objNiveau.tableau[13][15] === ' ') {
                    objNiveau.tableau[13][15] = 'G';
                    objScene3D.tabObjets3D[4].binVisible = true;
                    objSons.herseFerme.play();
                }
            }
        }
        /*
        else {
            longer le mur
        }
        */

    } else if (event.keyCode == 33 && !binVueAerienne && objNiveau.score >= 10) {
        //Page UP: 33
        cameraJoueur = objScene3D.camera;
        binVueAerienne = true;
        objScene3D.tabObjets3D[2].binVisible = false;
        //trésor est invisible sauf avec la combinaison secrete
        objScene3D.tabObjets3D[3].binVisible = false;
        const cameraAerienne = creerCamera();
        setPositionsCameraXYZ([15, 5, 15], cameraAerienne);
        setCiblesCameraXYZ([15, 0, 15], cameraAerienne);
        setOrientationsXYZ([0, 0, -1], cameraAerienne);
        objScene3D.camera = cameraAerienne;
    } else if ((event.keyCode == 34 && binVueAerienne)) {
        //Page DOWN: 34
        binVueAerienne = false;
        objScene3D.tabObjets3D[2].binVisible = true;
        objScene3D.tabObjets3D[3].binVisible = true;
        objScene3D.camera = cameraJoueur;
    } else if (binVueAerienne && (event.keyCode == 32 && event.ctrlKey && event.shiftKey)) {
        //rendre visible ou invisible le trésor (en alternance)
        objScene3D.tabObjets3D[3].binVisible = !objScene3D.tabObjets3D[3].binVisible;
    }
    else if (event.keyCode = 32 && !binVueAerienne) {
        //Ouvrir mur, si mur il y a
        fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
        fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
        const fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);

        const posXObjet = Math.floor(getPositionCameraX(camera) + Math.round(Math.cos(Math.acos(fltX / fltRayon))) * 0.9);
        const posZObjet = Math.floor(getPositionCameraZ(camera) + Math.round(Math.sin(Math.asin(fltZ / fltRayon))) * 0.9);

        //Si l'objet est un mur ouvrable, qu'il reste des ouvreurs et que le score est supérieur à 50
        //alors on ouvre le mur
        if (objNiveau.tableau[posZObjet][posXObjet] === "O" && objNiveau.ouvreurs > 0 && objNiveau.score >= 50) {
            const camJoueur = objScene3D.camera;
            objSons.ouvrirMur.play();
            setTimeout(function () {
                objSons.ouvrirMur.pause();
                objSons.ouvrirMur.currentTime = 0.0;
            }, 2500);
            objNiveau.tableau[posZObjet][posXObjet] = ' ';
            objNiveau.ouvreurs--;
            objNiveau.score -= 50;
            binRecommence = true;
            objScene3D = initScene3D(objgl);
            objScene3D.camera = camJoueur;
        }
    }
    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}