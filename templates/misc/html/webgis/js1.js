// Generated by CoffeeScript 1.9.1
(function() {
  this.init = function() {
    var map;
    return map = new ol.Map({
      target: 'map1',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.Stamen({
            layer: 'watercolor'
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.transform([105, 38], 'EPSG:4326', 'EPSG:3857'),
        zoom: 3
      })
    });
  };

  $(document).ready(function() {
    return init();
  });

}).call(this);
