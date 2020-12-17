function creerObj3DHerse(objgl, intNoTexture){
    const obj3DHerse = new Object();
    obj3DHerse.fltProfondeur = 1;
    obj3DHerse.fltLargeur = 1;
    obj3DHerse.fltHauteur = 2;
    obj3DHerse.binVisible = false;

    obj3DHerse.vertex = creerVertexHerse(objgl,obj3DHerse.fltLargeur,obj3DHerse.fltProfondeur,obj3DHerse.fltHauteur);
    obj3DHerse.couleurs = creerCouleursHerse(objgl, [1.0, 0.0, 0.0, 0.0]);
    obj3DHerse.texels = creerTexelsHerse(objgl,obj3DHerse.fltLargeur,obj3DHerse.fltProfondeur,obj3DHerse.fltHauteur, intNoTexture);
    obj3DHerse.maillage = creerMaillageHerse(objgl);

    obj3DHerse.transformations = creerTransformations();
    return obj3DHerse;
}

function creerVertexHerse(objgl, fltLargeur, fltProfondeur, fltHauteur){
    const tabVertex = [
        0.0,0.0,fltProfondeur/2,
        fltLargeur, 0.0, fltProfondeur/2,
        0.0, fltHauteur, fltProfondeur/2,
        fltLargeur,fltHauteur,fltProfondeur/2
       
    ];

    const objVertexHerse = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objVertexHerse);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objVertexHerse;
}

function creerCouleursHerse(objgl, tabCouleur){
    let tabCouleurs = [];
    for(let i = 0; i< 4;i++){
        tabCouleurs = tabCouleurs.concat(tabCouleur);
    }
    const objCouleursHerse = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursHerse);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs),objgl.STATIC_DRAW);

    return objCouleursHerse;
}

function creerTexelsHerse(objgl, fltLargeur, fltProfondeur, fltHauteur, intNoTexture){
    const tabTexels = [
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        1.0, 0.0
    ];

    const objTexelsHerse = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER,objTexelsHerse);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels),objgl.STATIC_DRAW);

    objTexelsHerse.intNoTexture = intNoTexture; objTexelsHerse.pcCouleurTexel = 1.0;

    return objTexelsHerse;
}


function creerMaillageHerse(objgl){
    const tabMaillage = [
        0, 1, 2,
        1, 2, 3
    ];

    const objMaillageHerse = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageHerse);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    objMaillageHerse.intNbTriangles = 2;
    objMaillageHerse.intNbDroites = 0;
    return objMaillageHerse;
}