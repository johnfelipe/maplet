// Generated by CoffeeScript 1.9.1
(function() {
  var init;

  init = function() {
    var controls_array, exts, glc, grid100w, grid10w, grid1w, grid25w, grid2d5w, grid50w, grid5w, layer_dt, map, navigation_control, regionc1, ress, tcsvr, tcsvr2, tcsvr3, wetland1980, wetland1980_line, wetland2000, wetland2000_line;
    navigation_control = new OpenLayers.Control.Navigation({});
    tcsvr = 'http://159.226.123.26/cgi-bin/tilecache.cgi?';
    tcsvr2 = 'http://192.168.4.166/cgi-bin/tilecache.cgi?';
    tcsvr3 = tcsvr2;
    controls_array = [navigation_control, new OpenLayers.Control.PanZoomBar({}), new OpenLayers.Control.LayerSwitcher({}), new OpenLayers.Control.Permalink, new OpenLayers.Control.MousePosition({})];
    exts = new OpenLayers.Bounds(7458000, 447000, 15846608, 8835608);
    ress = [16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8];
    map = new OpenLayers.Map('mapdiv', {
      controls: controls_array,
      displayProjection: new OpenLayers.Projection('EPSG:3857'),
      units: 'm'
    });
    layer_dt = new OpenLayers.Layer.WMS('底图', tcsvr, {
      layers: 'china',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayers: true
    });
    grid1w = new OpenLayers.Layer.WMS('1比1万', tcsvr, {
      layers: 'grid1w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid2d5w = new OpenLayers.Layer.WMS('1比2.5万', tcsvr, {
      layers: 'grid2d5w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid5w = new OpenLayers.Layer.WMS('1比5万', tcsvr, {
      layers: 'grid5w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid10w = new OpenLayers.Layer.WMS('1比10万', tcsvr, {
      layers: 'grid10w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid25w = new OpenLayers.Layer.WMS('1比25万', tcsvr, {
      layers: 'grid25w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid50w = new OpenLayers.Layer.WMS('1比50万', tcsvr, {
      layers: 'grid50w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    grid100w = new OpenLayers.Layer.WMS('1比100万', tcsvr, {
      layers: 'grid100w',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    wetland2000 = new OpenLayers.Layer.WMS('2000年沼泽湿地', tcsvr3, {
      layers: 'wetland2000',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    wetland2000_line = new OpenLayers.Layer.WMS('2000年沼泽湿地_线状', tcsvr3, {
      layers: 'wetland2000_line',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: true
    });
    wetland1980 = new OpenLayers.Layer.WMS('1980年沼泽湿地', tcsvr3, {
      layers: 'wetland1980',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    wetland1980_line = new OpenLayers.Layer.WMS('1980年沼泽湿地_线状', tcsvr3, {
      layers: 'wetland1980_line',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    glc = new OpenLayers.Layer.WMS('2000年遥感影像', tcsvr3, {
      layers: 'glc',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: true
    });
    regionc1 = new OpenLayers.Layer.WMS('省界', tcsvr3, {
      layers: 'regionc1',
      format: 'image/png'
    }, {
      reproject: false,
      maxExtent: exts,
      resolutions: ress,
      isBaseLayer: false
    });
    wetland2000_line.setVisibility(false);
    wetland1980_line.setVisibility(false);
    map.addLayers([layer_dt]);
    map.addLayers([wetland2000]);
    map.addControl(new OpenLayers.Control.ScaleLine);
    map.zoomToMaxExtent();
  };

  $(document).ready(function() {
    init();
  });

}).call(this);
