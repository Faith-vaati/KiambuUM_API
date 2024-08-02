let details = {
  coordinates: {
    lat: -0.4832,
    lng: 37.1274,
  },
  url: "https://www.duniamaps.com/tile/{z}/{x}/{y}.png",
  attribution:
    'Map data & copy; <a href="https://duniamaps.com/">DuniaMaps</a>',
};

const iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([details.coordinates.lng, details.coordinates.lat])
  ),
  name: "My Location",
});

const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 0.5],
    anchorXUnits: "fraction",
    anchorYUnits: "fraction",
    src: "/api/images/icon.svg",
  }),
});
iconFeature.setStyle(iconStyle);

const vectorSource = new ol.source.Vector({
  features: [iconFeature],
});

const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
});

const raster = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url:
      "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}" +
      "?access_token=pk.eyJ1IjoiZ2F0aG9nbzEiLCJhIjoiY2t0djhndnB4MGkzdDJucDg2bW5uNXNrcyJ9.mnbTMXxDrdYnTrb8Gr7_MA",
  }),
});

const linelayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#ffcc33",
      width: 2,
    }),
  }),
});

const pointLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      stroke: new ol.style.Stroke({
        color: "rgba(200,0,200,1.0)",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rgba(255,255,0,1.0)",
      }),
    }),
  }),
});

let points = {
  type: "FeatureCollection",
  features: [],
  crs: {
    type: "name",
    properties: { name: "urn:ogc:def:crs:EPSG::4326" },
  },
};

let lineFeature = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: 1,
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    },
  ],
  crs: {
    type: "name",
    properties: { name: "urn:ogc:def:crs:EPSG::4326" },
  },
};

const view = new ol.View({
  center: ol.proj.fromLonLat([
    details.coordinates.lng,
    details.coordinates.lat,
  ]),
  zoom: 15,
});

const map = new ol.Map({
  layers: [raster, pointLayer, linelayer, vectorLayer],
  target: "map",
  view: view,
});

//coordinate array to be supplied from the mobile device in production
function plotLineString(lonlat) {
  let pp = points.features;
  pp.push({
    type: "Feature",
    id: pp.length,
    geometry_name: "geom",
    geometry: {
      type: "Point",
      coordinates: lonlat,
    },
  });
  let pf = points;
  pf.features = pp;
  pointLayer.setSource(
    new ol.source.Vector({
      features: new ol.format.GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }).readFeatures(pf),
    })
  );

  let f = lineFeature.features[0].geometry.coordinates;
  f.push(lonlat);
  let d = lineFeature;
  d.features[0].geometry.coordinates = f;
  linelayer.setSource(
    new ol.source.Vector({
      features: new ol.format.GeoJSON({
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }).readFeatures(d),
    })
  );
}

function adjustMarker(lng, lat) {
  iconFeature.setGeometry(new ol.geom.Point(ol.proj.fromLonLat([lng, lat])));
  view.setCenter(ol.proj.fromLonLat([lng, lat]));
  view.setZoom(18);
}

map.on("singleclick", function (evt) {
  var lonlat = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
  //comment out the line below in production
  //plotLineString(lonlat);
});
