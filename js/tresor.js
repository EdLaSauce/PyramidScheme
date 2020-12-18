function creerObj3DTresor(objgl, intNoTexture){
    const obj3DTresor = new Object();
    obj3DTresor.fltProfondeur = 1;
    obj3DTresor.fltLargeur = 1;
    obj3DTresor.fltHauteur = 1;
    obj3DTresor.binVisible = true;

    obj3DTresor.vertex = creerVertexTresor(objgl,obj3DTresor.fltLargeur,obj3DTresor.fltProfondeur,obj3DTresor.fltHauteur);
    obj3DTresor.couleurs = creerCouleursTresor(objgl, [1.0, 0.0, 0.0, 0.0]);
    obj3DTresor.texels = creerTexelsTresor(objgl,obj3DTresor.fltLargeur,obj3DTresor.fltProfondeur,obj3DTresor.fltHauteur, intNoTexture);
    obj3DTresor.maillage = creerMaillageTresor(objgl);

    obj3DTresor.transformations = creerTransformations();
    setPositionsXYZ([objNiveau.coordTresor[1],0,objNiveau.coordTresor[0]],obj3DTresor.transformations);
    return obj3DTresor;
}

function creerVertexTresor(objgl, fltLargeur, fltProfondeur, fltHauteur){
    const tabVertex = [
        //arriere
        fltLargeur/2,fltHauteur,fltProfondeur /2,
        0.0, 0.0, 0.0,
        fltLargeur, 0.0, 0.0,
        
        //avant
        fltLargeur/2,fltHauteur,fltProfondeur/2,
        0.0, 0.0, fltProfondeur,
        fltLargeur, 0.0, fltProfondeur,
        
        //droite
        fltLargeur/2,fltHauteur,fltProfondeur/2,
        fltLargeur, 0.0, 0.0,
        fltLargeur, 0.0, fltProfondeur,

        //gauche
        fltLargeur/2,fltHauteur,fltProfondeur/2,
        0.0, 0.0, 0.0,
        0.0, 0.0, fltProfondeur
       
    ];

    const objTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objTresor;
}

function creerCouleursTresor(objgl, tabCouleur){
    let tabCouleurs = [];
    for(let i = 0; i< 12;i++){
        tabCouleurs = tabCouleurs.concat(tabCouleur);
    }
    const objCouleursTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs),objgl.STATIC_DRAW);

    return objCouleursTresor;
}

function creerTexelsTresor(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture){
    const tabTexels = [
        //Arriere
        fltLargeur/2 , fltHauteur /2,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        
        // Avant
        fltLargeur/2 , fltHauteur /2,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        
        //Droite
        fltProfondeur/2 , fltHauteur/2,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur,

        //Gauche
        fltProfondeur/2 , fltHauteur/2,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur
    ];

    const objTexelsTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER,objTexelsTresor);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels),objgl.STATIC_DRAW);

    objTexelsTresor.intNoTexture = intNoTexture; objTexelsTresor.pcCouleurTexel = 1.0;

    return objTexelsTresor;
}


function creerMaillageTresor(objgl){
    const tabMaillage = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11
    ];

    const objMaillageTresor = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageTresor);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillageTresor.intNbTriangles = 4;
    objMaillageTresor.intNbDroites = 0;

    // Le nombre de vertex pour les triangles
    objMaillageTresor.intNbElemsTriangles = 12;
    // Le nombre de vertex pour les droites
    objMaillageTresor.intNbElemsDroites = 0;
    return objMaillageTresor;
}