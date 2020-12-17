// Ciel.js

function creerObj3DCiel(objgl, intNoTexture) {
    const obj3DCiel = new Object();
    obj3DCiel.fltProfondeur = 62;
    obj3DCiel.fltLargeur = 62;
    obj3DCiel.fltHauteur = 0;
    obj3DCiel.binVisible = true;
    
    obj3DCiel.vertex = creerVertexCiel(objgl, obj3DCiel.fltLargeur, obj3DCiel.fltProfondeur);
    obj3DCiel.couleurs = creerCouleursCiel(objgl, [1, 1, 1, 1]);
	obj3DCiel.texels = creerTexelsCiel(objgl, intNoTexture);
	obj3DCiel.maillage = creerMaillageCiel(objgl);
	
    obj3DCiel.transformations = creerTransformations();
    return obj3DCiel;
}

function creerVertexCiel(objgl, fltLargeur, fltProfondeur) {
    const tabVertex = [
             -fltLargeur / 2, 0.0, -fltProfondeur / 2,
             fltLargeur / 2, 0.0, -fltProfondeur / 2,
             -fltLargeur / 2, 0.0, fltProfondeur / 2,
             fltLargeur / 2, 0.0, fltProfondeur / 2
        ];
    
    const objCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objCiel;
}

function creerCouleursCiel(objgl, tabCouleur) {
    let tabCouleurs = []; 
    for (let i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    const objCouleursCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);
   
    return objCouleursCiel;
}

function creerTexelsCiel(objgl, intNoTexture) {
     const tabTexels = [
             0.0, 0.0,
             1.0, 0.0,
             0.0, 1.0,
             1.0, 1.0
        ];
    
    const objTexelsCiel = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsCiel);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);
  
    objTexelsCiel.intNoTexture = intNoTexture; objTexelsCiel.pcCouleurTexel = 1.0;
    
    return objTexelsCiel;
  }

function creerMaillageCiel(objgl) {

       const tabMaillage =
            [ // Les 2 triangles du ciel
             0, 1, 2,
             1, 2, 3,
            ];

	    const objMaillageCiel = objgl.createBuffer();
        objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageCiel);
        objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

        // Le nombre de triangles
        objMaillageCiel.intNbTriangles = 2;
        // Le nombre de droites
        objMaillageCiel.intNbDroites = 0;
		
        return objMaillageCiel;
    }
  
  
