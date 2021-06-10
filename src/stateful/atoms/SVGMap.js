import { useState, useEffect } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';

import GeoServer from 'core/GeoServer.js';

import './SVGMap.css';

export default function SVGMap(props) {
  const {parentRegionID, childRegionIDs} = props
  const [geoMap, setGeoMap] = useState(undefined);

  useEffect(() => {
    async function getAndSetGeoMap() {
      const geos = await Promise.all(
        [parentRegionID, ...childRegionIDs].map(
          async function(regionID) {
            return await GeoServer.getGeo(regionID);
          },
        )
      );
      const geoMap = [parentRegionID, ...childRegionIDs].reduce(
        function(geoMap, regionID, iRegion) {
          geoMap[regionID] = geos[iRegion];
          return geoMap;
        },
        {},
      );
      setGeoMap(geoMap);
    }

    getAndSetGeoMap();
  }, [parentRegionID, childRegionIDs]);

  return geoMap ? (
    <SVGMapInner {...props} geoMap={geoMap} />
  ) : '...';
};

function SVGMapInner(props) {
  const {parentRegionID, geoMap} = props;
  const [width, height] = [800, 800];
  const projection = geoNaturalEarth1()
    .fitExtent([[0, 0], [width, height]], geoMap[parentRegionID]);

  return (
     <svg className="svg-map-inner" width={ width } height={ height }>
      {
        Object.entries(geoMap).map(
          function([regionID, geo], iGeo) {
            if (regionID === parentRegionID) {
              return null;
            }
            const key = `path-map-${iGeo}`;
            return (
              <path
                key={key}
                className="path-map"
                d={geoPath().projection(projection)(geo)}
              />
            )
          },
        )
      }
    </svg>
  )
}
