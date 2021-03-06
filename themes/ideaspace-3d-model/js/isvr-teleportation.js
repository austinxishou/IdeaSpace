AFRAME.registerComponent('isvr-teleportation', {

  dependencies: ['raycaster'],

  schema: {
        camera_distance_vr: {type: 'number', default: 1.0}
  },

  play: function() {

    var self = this;

    var teleportIndicator = document.querySelector('#teleport-indicator');
    var teleportPosition = {x: 0, y:0, z:0};

    this.el.addEventListener('raycaster-intersected', function(event) {

        teleportPosition = event.detail.intersection.point;

        teleportIndicator.setAttribute('position', { x: event.detail.intersection.point.x, y: 0.01, z: event.detail.intersection.point.z });

        teleportIndicator.setAttribute('visible', true);
    });

    this.el.addEventListener('raycaster-intersected-cleared', function() {

        teleportIndicator.setAttribute('visible', false);
    });

    this.el.addEventListener('click', function() {

        var camera_pos = document.querySelector('a-entity[camera]').getAttribute('position');
        document.querySelector('a-entity[camera]').setAttribute('position', { x: teleportPosition.x, y: camera_pos.y, z: teleportPosition.z - self.data.camera_distance_vr });

    });

  }

});
