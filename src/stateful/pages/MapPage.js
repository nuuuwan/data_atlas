import {Component} from 'react';
import SVGMap from 'stateful/atoms/SVGMap.js';
import './MapPage.css';

export default class MapPage extends Component {

  render() {
    return (
      <div className="div-map-page">
        <SVGMap
          parentRegionID="LK"
          childRegionIDs={[
            'LK-11', 'LK-2', 'LK-3', 'LK-4', 'LK-5',
            'LK-6', 'LK-7', 'LK-8', 'LK-9',
          ]}
        />
      </div>
    );
  }

}
