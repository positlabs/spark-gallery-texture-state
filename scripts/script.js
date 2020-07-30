/* 

  IG app:
    Texture state change only happens once per effect session.
    Subsequent changes aren't reported in gallery texture state

  Spark player: 
    Texture state value actually changes but the subscription callback is never invoked

  Simulator: 
    Texture state change only happens once per app session. 
    You need to close the project and reopen in order to trigger the event again. 

*/

const Patches = require('Patches')
const Textures = require('Textures')
const {log} = require('Diagnostics')
const R = require('Reactive')

Textures.findFirst('galleryTexture0').then(tex => {
  Patches.inputs.setPoint2D('galleryTextureSize', R.point2d(tex.width, tex.height))
  Patches.inputs.setString('galleryTextureState', tex.state)
  tex.state.monitor().subscribe(val => {
    log('Gallery texture changed')
    log(val)
    Patches.inputs.setPulse('galleryTextureStateChanged', R.once())
  })
})