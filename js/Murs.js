function creerMur(objgl,intNoTexture,binOuvrable){
    const obj3DMur = new Object();
    obj3DMur.fltProfondeur = 1;
    obj3DMur.fltLargeur = 1;
    obj3DMur.fltHauteur = 2;
    obj3DMur.binOuvrable = binOuvrable;
    obj3DMur.binVisible = true;

    obj3DMur.vertex = creerVertexMur(objgl,obj3DMur.fltLargeur,obj3DMur.fltProfondeur,obj3DMur.fltHauteur);
    obj3DMur.couleurs = creerCouleursMur(objgl,[1, 1, 1, 1]);
    obj3DMur.texels = creerTexelsMur(objgl,obj3DMur.fltLargeur,obj3DMur.fltProfondeur,obj3DMur.fltHauteur,intNoTexture);
    obj3DMur.maillage = creerMaillageMur(objgl);

    obj3DMur.transformations = creerTransformations();
    return obj3DMur;
}

function creerVertexMur(objgl, fltLargeur, fltProfondeur, fltHauteur) {
    const tabVertex = [
        // Mur nord (z= 0)
        0.0, fltHauteur, 0.0,
        fltLargeur, fltHauteur, 0.0,
        0.0, 0.0, 0.0,
        fltLargeur , 0, 0.0,
        // Mur sud
        fltLargeur, fltHauteur, fltProfondeur,
        0.0, fltHauteur, fltProfondeur,
        fltLargeur, 0, fltProfondeur,
        0.0, 0, fltProfondeur,
        // Mur est
        fltLargeur, fltHauteur, 0.0,
        fltLargeur, fltHauteur, fltProfondeur,
        fltLargeur, 0, 0.0,
        fltLargeur, 0, fltProfondeur,
        // Mur ouest
        0.0, fltHauteur, fltProfondeur,
        0.0, fltHauteur, 0.0,
        0.0, 0, fltProfondeur,
        0.0, 0, 0.0,
        //Dessus
        0.0, fltHauteur, fltProfondeur,
        0.0, fltHauteur, 0.0,
        fltLargeur, fltHauteur, fltProfondeur,
        fltLargeur, fltHauteur, 0.0
        
    ];

    const objMurs = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMurs);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMurs;
}

function creerCouleursMur(objgl, tabCouleur) {
    tabCouleurs = [];
    for (let i = 0; i < 20; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMur;
}

function creerTexelsMur(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture) {
    const tabTexels = [
        // Mur nord
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        // Mur sud			 
        0.0, 0.0,
        fltLargeur, 0.0,
        0.0, fltHauteur,
        fltLargeur, fltHauteur,
        // Mur est			 
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur,
        // Mur ouest			 
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltHauteur,
        fltProfondeur, fltHauteur,
        //Dessus
        0.0, 0.0,
        fltProfondeur, 0.0,
        0.0, fltLargeur,
        fltProfondeur, fltLargeur
    ];

    const objTexelsMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMur.intNoTexture = intNoTexture; objTexelsMur.pcCouleurTexel = 1.0;

    return objTexelsMur;
}

function creerMaillageMur(objgl) {
    const tabMaillage =
        [ // Les 2 triangles du mur nord
            0, 1, 2,
            1, 2, 3,
            // Les 2 triangles du mur sud
            4, 5, 6,
            5, 6, 7,
            // Les 2 triangles du mur est
            8, 9, 10,
            9, 10, 11,
            // Les 2 triangles du mur ouest
            12, 13, 14,
            13, 14, 15,
            //Dessus
            16, 17, 18,
            17, 18, 19
        ];

    const objMaillageMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMur.intNbTriangles = 10;
    // Le nombre de droites
    objMaillageMur.intNbDroites = 0;

    return objMaillageMur;
}