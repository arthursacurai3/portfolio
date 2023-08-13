import * as dat from 'dat.gui'

export function datGuide(objects){
  const gui = new dat.GUI()
  const options = {
    sphereColor: 0xff0000,
  }
  gui.addColor(options, 'sphereColor').onChange(function (e) {
    objects.sphereMesh.material.color.set(e)
  })

  return options
}
