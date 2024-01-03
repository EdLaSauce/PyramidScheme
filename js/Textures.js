// Textures.js

function creerTextures(objgl, tabImages) {
	const tabObjTextures = new Array();
	
	// retiré pour cause de cross-origin: utilisation de base64
	//const repo = "Textures/";

	for (let i = 0; i < tabImages.length; i++) {    
		// L'image de la texture
		const objImage = new Image();
		//objImage.crossOrigin = "";
		//objImage.src = repo + tabImages[i];
		objImage.src = 'data:image/jpga;base64,'+tabImages[i];
		objImage.onload= () =>{
			// Cr�er La texture
			const objTexture = objgl.createTexture();
			             
			// La s�lectionner
			objgl.bindTexture(objgl.TEXTURE_2D, objTexture);
	
			// Ins�rer l'image � l'int�rieur de la texture
			objgl.texImage2D(objgl.TEXTURE_2D, 0, objgl.RGBA, objgl.RGBA, objgl.UNSIGNED_BYTE, objImage);
	
			// La param�trer
			objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MAG_FILTER, objgl.LINEAR);
			objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_MIN_FILTER, objgl.NEAREST_MIPMAP_NEAREST);
			objgl.generateMipmap(objgl.TEXTURE_2D); // Pour cr�er le mipmap
			objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_S, objgl.REPEAT);
			objgl.texParameteri(objgl.TEXTURE_2D, objgl.TEXTURE_WRAP_T, objgl.REPEAT);
			
			// Ins�rer cette texture dans un tableau de textures
			tabObjTextures.push(objTexture);
		}
	
	}

	return tabObjTextures;
}
