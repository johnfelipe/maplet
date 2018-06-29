// Only used for  /geojson/ url.
(function () {
    $(document).ready(function () {
        var AjaxUrl, Z, baseMaps, cities, deleteShape, drawnItems, latlng, lcontrol, map, onKeyDown, osm, redoBuffer, satellite_layer, save_data, show_saved_info, styleEditor;
        show_saved_info = function () {
            $("#infor").css("color", "#ff0");
            $("#infor").text("用户数据已经成功保存！");
            return setTimeout("$('#infor').text('');", 8000);
        };
        save_data = function () {
            var shape;
            shape = drawnItems.toGeoJSON();
            map.doubleClickZoom.enable();
            return $.ajax({
                type: "POST",
                url: "/geojson/" + geojsonid,
                data: {
                    geojson: JSON.stringify(shape)
                },
                dataType: "html",
                timeout: 2000,
                error: function () {
                    return alert("请登陆后进行数据保存！或再次尝试进行保存！");
                },
                success: function (result) {
                    var geo;
                    geo = $.parseJSON(result);
                    if (geo["status"] === 0) {
                        return alert("请检查是否拥有数据权限！");
                    } else {
                        show_saved_info();
                        if (geo["sig"] !== "") {
                            return location.href = "/geojson/" + geo["sig"];
                        }
                    }
                }
            });
        };
        $("#btn_add_maplet").click(function () {
            var hdata, nexrad2;
            hdata = $("#maplet_id").val();
            nexrad2 = L.tileLayer.wms("http://wcs.osgeo.cn:8088/service?", {
                layers: "maplet_" + hdata,
                format: "image/png",
                transparent: true,
                attribution: "Maplet2"
            });
            map.addLayer(nexrad2);
            return lcontrol.addOverlay(nexrad2, hdata);
        });
        $("#load_geojson").click(function () {
            var gdata, gson_arr, hdata;
            hdata = $("#hdata").val();
            gson_arr = new Array();
            gdata = $.parseJSON(hdata)["features"];
            $.each(gdata, function (i, item) {
                var myGeoJson;
                gson_arr[i] = item;
                if (login === 1) {
                    // myGeoJson = L.geoJson(item);
                    myGeoJson = L.geoJson(item,
                        {
                            onEachFeature: function (feature, layer) {
                                var input = L.DomUtil.create('input', 'my-input');
                                input.value = feature.properties.name;
                                L.DomEvent.addListener(input, 'change', function () {
                                    feature.properties.name = input.value;

                                });
                                layer.bindPopup(input);
                            }
                        }
                    );
                    return myGeoJson.addTo(drawnItems);
                }
            });
            if (login === 0) {
                L.geoJson(gson_arr).addTo(drawnItems);
            }
            $("#hdata").val("");
            $("#infor").css("color", "#ff0");
            $("#infor").text("已经加载GeoJson数据！");
            return setTimeout("$('#infor').text('');", 8000);
        });
        cities = new L.LayerGroup();
        drawnItems = new L.FeatureGroup();

         var osm_a1 = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
            maxZoom: 18,
            minZoom: 1
        });

        var osm_a2 = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
            maxZoom: 18,
            minZoom: 1
        });

        var osm = L.layerGroup([osm_a2, osm_a1]);

        // osm = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnVrdW4iLCJhIjoiY2lqeWFjZmo4MXFubndka2lzcnZ1M2tzciJ9.C1dZUQkRZSIEKfg-DaFYpw", {
        //     maxZoom: 18,
        //     attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, " + "<a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " + "Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        //     id: "mapbox.streets"
        // });
        satellite_layer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnVrdW4iLCJhIjoiY2lqeWFjZmo4MXFubndka2lzcnZ1M2tzciJ9.C1dZUQkRZSIEKfg-DaFYpw", {
            maxZoom: 18,
            attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, " + "<a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, " + "Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
            id: "mapbox.satellite"
        });
        osm.addTo(cities);
        map = L.map("map", {
            center: [vlat, vlon],
            zoom: vzoom_current,
            maxZoom: vzoom_max,
            minZoom: vzoom_min,
            layers: [osm],
            editable: true,
            editOptions: {
                featuresLayer: drawnItems
            }
        });
        map.addLayer(drawnItems);
        AjaxUrl = "/geojson/gson/" + geojsonid;
        if (geojsonid !== "") {
            $.getJSON(AjaxUrl, function (gjson) {
                var gson_arr;
                gson_arr = new Array();
                $.each(gjson, function (i, item) {
                    var myGeoJson;
                    gson_arr[i] = item;
                    if (login === 1) {
                        // myGeoJson = L.geoJson(item);
                        myGeoJson = L.geoJson(item,
                            {
                                onEachFeature: function (feature, layer) {
                                    var input = L.DomUtil.create('input', 'my-input');
                                    input.value = feature.properties.name;
                                    L.DomEvent.addListener(input, 'change', function () {
                                        feature.properties.name = input.value;

                                    });
                                    layer.bindPopup(input);
                                }
                            }
                        );
                        return myGeoJson.addTo(drawnItems);
                    }
                });
                if (login === 0) {
                    return L.geoJson(gson_arr).addTo(drawnItems);
                }
            });
        }
        // Need plugin
        // styleEditor = L.control.styleEditor({
        //   position: "topleft"
        // });
        // map.addControl(styleEditor);
        L.EditControl = L.Control.extend({
            options: {
                position: "topleft",
                callback: null,
                kind: "",
                html: ""
            },
            onAdd: function (map) {
                var container, link;
                container = L.DomUtil.create("div", "leaflet-control leaflet-bar");
                link = L.DomUtil.create("a", "", container);
                link.href = "#";
                link.title = this.options.kind;
                link.innerHTML = this.options.html;
                L.DomEvent.on(link, "click", L.DomEvent.stop).on(link, "click", (function () {
                    window.LAYER = this.options.callback.call(map.editTools);
                    map.doubleClickZoom.disable();
                    return map.dragging.disable();
                }), this);
                return container;
            }
        });
        L.EditSaveControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: save_data,
                kind: "保存编辑",
                html: "<span class=\"glyphicon glyphicon-save\"></span>"
            }
        });
        L.NewLineControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: map.editTools.startPolyline,
                kind: "线",
                html: "\\/\\"
            }
        });
        L.NewPolygonControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: map.editTools.startPolygon,
                kind: "多边形",
                html: "▰"
            }
        });
        L.NewMarkerControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: map.editTools.startMarker,
                kind: "点标注",
                html: "<span class=\"glyphicon glyphicon-map-marker\"></span>"
            }
        });
        L.NewRectangleControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: map.editTools.startRectangle,
                kind: "矩形",
                html: "⬛"
            }
        });
        L.NewCircleControl = L.EditControl.extend({
            options: {
                position: "topleft",
                callback: map.editTools.startCircle,
                kind: "circle",
                html: "⬤"
            }
        });
        map.addControl(new L.EditSaveControl());
        map.addControl(new L.NewMarkerControl());
        map.addControl(new L.NewLineControl());
        map.addControl(new L.NewPolygonControl());
        map.addControl(new L.NewRectangleControl());
        if (login === 1) {
            Z = 90;
            latlng = void 0;
            redoBuffer = [];
            onKeyDown = function (e) {
                if (e.keyCode === Z) {
                    if (!this.editTools._drawingEditor) {
                        return;
                    }
                    if (e.shiftKey) {
                        if (redoBuffer.length) {
                            return this.editTools._drawingEditor.push(redoBuffer.pop());
                        }
                    } else {
                        latlng = this.editTools._drawingEditor.pop();
                        if (latlng) {
                            return redoBuffer.push(latlng);
                        }
                    }
                } else if (e.keyCode === 69) {
                    if (map.dragging.enabled()) {
                        return map.dragging.disable();
                    } else {
                        return map.dragging.enable();
                    }
                }
            };
            L.DomEvent.addListener(document, "keydown", onKeyDown, map);
            map.on("editable:drawing:end", function () {
                return redoBuffer = [];
            });
        }
        deleteShape = function (e) {
            if ((e.originalEvent.ctrlKey || e.originalEvent.metaKey) && this.editEnabled()) {
                return this.editor.deleteShapeAt(e.latlng);
            }
        };
        map.on("layeradd", function (e) {
            if (e.layer instanceof L.Path) {
                e.layer.on("click", L.DomEvent.stop).on("click", deleteShape, e.layer);
            }
            if ((e.layer instanceof L.Path) || (e.layer instanceof L.Marker)) {
                return e.layer.on("dblclick", L.DomEvent.stop).on("dblclick", e.layer.toggleEdit);
            }
        });
        map.on("editable:vertex:ctrlclick editable:vertex:metakeyclick", function (e) {
            var index;
            index = e.vertex.getIndex();
            if (index === 0) {
                return e.layer.editor.continueBackward(e.vertex.latlngs);
            } else {
                if (index === e.vertex.getLastIndex()) {
                    return e.layer.editor.continueForward(e.vertex.latlngs);
                }
            }
        });
        map.on("editable:editing", function (e) {
            map.dragging.disable();
            map.doubleClickZoom.disable();
            if (e.layer instanceof L.Path) {
                return e.layer.setStyle({
                    color: "Red"
                });
            }
        });
        map.on("editable:disable", function (e) {
            map.doubleClickZoom.enable();
            return map.dragging.enable();
        });
        baseMaps = {
            "MapBox底图": osm,
            "卫星影像": satellite_layer
        };
        return lcontrol = L.control.layers(baseMaps, null).addTo(map);
    });

}).call(this);
