
function creerObj3DSol(objgl, intNoTexture) {
    const obj3DSol = new Object();
    obj3DSol.fltProfondeur = 31;
    obj3DSol.fltLargeur = 31;
    obj3DSol.fltHauteur = 0;
    obj3DSol.binVisible = true;
    
    obj3DSol.vertex = creerVertexSol(objgl, obj3DSol.fltLargeur, obj3DSol.fltProfondeur);
    obj3DSol.couleurs = creerCouleursSol(objgl, [1, 1, 1, 1]);
	obj3DSol.texels = creerTexelsSol(objgl, obj3DSol.fltLargeur, obj3DSol.fltProfondeur, intNoTexture);
	obj3DSol.maillage = creerMaillageSol(objgl);
	
    obj3DSol.transformations = creerTransformations();
    return obj3DSol;
}

function creerObj3DEnclos(objgl,intNoTexture){
    const obj3DEnclos = new Object();
    obj3DEnclos.fltProfondeur = 3;
    obj3DEnclos.fltLargeur = 3;
    obj3DEnclos.fltHauteur = 0;
    obj3DEnclos.binVisible = true;

    obj3DEnclos.vertex = creerVertexSol(objgl,obj3DEnclos.fltLargeur, obj3DEnclos.fltProfondeur);
    obj3DEnclos.couleurs = creerCouleursSol(objgl, [1, 1, 1, 1]);
    obj3DEnclos.texels = creerTexelsSol(objgl,obj3DEnclos.fltLargeur, obj3DEnclos.fltProfondeur, intNoTexture);
    obj3DEnclos.maillage = creerMaillageSol(objgl);

    obj3DEnclos.transformations = creerTransformations();

    return obj3DEnclos;
}

function creerVertexSol(objgl, fltLargeur, fltProfondeur) {
    const tabVertex = [
             0.0, 0.0, 0.0,
             fltLargeur, 0.0, 0.0,
             0.0, 0.0, fltProfondeur,
             fltLargeur, 0.0, fltProfondeur
        ];
    
    const objSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objSol;
}

function creerCouleursSol(objgl, tabCouleur) {
    tabCouleurs = []; 
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
 
	return objCouleursSol;
}

function creerTexelsSol(objgl, fltLargeur, fltProfondeur, intNoTexture) {
     const tabTexels = [
             0.0, 0.0,
             fltLargeur, 0.0,
             0.0, fltProfondeur,
             fltLargeur, fltProfondeur
        ];
    
    const objTexelsSol = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsSol);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsSol.intNoTexture = intNoTexture; objTexelsSol.pcCouleurTexel = 1.0;
    
    return objTexelsSol;
  }

function creerMaillageSol(objgl) {

       const tabMaillage =
            [ // Les 2 triangles du sol
             0, 1, 2,
             1, 2, 3,
            ];

	    const objMaillageSol = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageSol);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageSol.intNbTriangles = 2;
        // Le nombre de droites
        objMaillageSol.intNbDroites = 0;
		
        return objMaillageSol;
    }
  
  
