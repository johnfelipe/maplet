// Generated by CoffeeScript 1.9.1

/**
 * Created by bukun on 2015/2/21.
 */

(function() {
  this.init = function() {
    var attribution, base1, controls, layers, maize, map, projection, scaleLineControl, shucai, shucai_source, vect, vect2, view, zoomSilder;
    controls = [
      new ol.control.Attribution, new ol.control.MousePosition({
        undefinedHTML: 'outside',
        projection: 'EPSG:4326',
        coordinateFormat: function(coordinate) {
          return ol.coordinate.format(coordinate, '{x}, {y}', 4);
        }
      }), new ol.control.Zoom
    ];
    projection = new ol.proj.Projection({
      code: 'EPSG:3857',
      units: 'm'
    });
    base1 = new ol.layer.Tile({
      source: new ol.source.MapQuest({
        layer: 'osm'
      })
    });
    vect = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: 'http://g.osgeo.cn/shihang',
        params: {
          'LAYERS': 'sheng',
          'FORMAT': 'image/png'
        },
        serverType: 'mapserver'
      })
    });
    maize = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        url: 'http://g.osgeo.cn/shihang',
        params: {
          'LAYERS': 'maize',
          'FORMAT': 'image/png'
        },
        serverType: 'mapserver'
      })
    });
    shucai_source = new ol.source.ImageWMS({
      url: 'http://g.osgeo.cn/shihang',
      params: {
        'LAYERS': 'shucai',
        'FORMAT': 'image/png'
      },
      serverType: 'mapserver'
    });
    shucai = new ol.layer.Image({
      source: shucai_source
    });
    vect2 = new ol.layer.Image({
      extent: [7458000, 447000, 15846608, 8835608],
      source: new ol.source.ImageWMS({
        url: 'http://g.osgeo.cn/cgi-bin/tilecache.cgi?',
        params: {
          'LAYERS': 'china',
          'TILED': true,
          'CRS': 'EPSG:3857',
          'WIDTH': '800',
          'HEIGHT': '500',
          'FORMAT': 'image/png'
        },
        serverType: 'tilecache'
      })
    });
    layers = [vect, maize, shucai];
    attribution = new ol.control.Attribution({
      collapsible: true,
      label: 'A',
      collapsed: true,
      tipLabel: 'yooo'
    });
    view = new ol.View({
      projection: projection,
      center: ol.proj.transform([126, 44], 'EPSG:4326', 'EPSG:3857'),
      zoom: 6
    });
    map = new ol.Map({
      layers: layers,
      target: 'map',
      view: view
    });
    map.on('singleclick', function(evt) {
      var url, viewResolution;
      document.getElementById('info').innerHTML = '';
      viewResolution = view.getResolution();
      url = shucai_source.getGetFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {
        'INFO_FORMAT': 'text/html'
      });
      if (url) {
        document.getElementById('info').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
      }
    });
    scaleLineControl = new ol.control.ScaleLine;
    scaleLineControl.setUnits(ol.control.UNIT_METER);
    map.addControl(scaleLineControl);
    zoomSilder = new ol.control.ZoomSlider;
    map.addControl(zoomSilder);
  };

  $(document).ready(function() {
    init();
  });

}).call(this);
