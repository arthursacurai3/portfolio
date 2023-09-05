import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const fontUrl = new URL('../../../fonts/PoppinsLight_Regular.json', import.meta.url)

export const socialMediaInfos = {}

export function createText(scene,text='teste',fontSize, socialMediaName){
  const assetLoader = new FontLoader()
  assetLoader.load(
    fontUrl.href, function (font){
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: fontSize,
        height: 0.2,
      })
      const textMesh = new THREE.Mesh(textGeometry,
        new THREE.MeshPhongMaterial({color: 0xeeeeee, visible: false})
      )
      socialMediaInfos[socialMediaName] = textMesh
      scene.add(textMesh)
      textMesh.name = socialMediaName
      textMesh.castShadow = true
      textMesh.rotation.x = -0.25 * Math.PI
      textMesh.position.z = 2.5
      const centerX = new THREE.Box3().setFromObject(textMesh).getCenter(new THREE.Vector3).x
      textMesh.translateX(-centerX)

      return textMesh
    }, undefined, function ( err ) {
      console.error( err );
    }
  )
}