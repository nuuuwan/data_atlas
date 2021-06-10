import {Component} from 'react';
import SVGMap from 'stateful/atoms/SVGMap.js';
import './MapPage.css';

export default class MapPage extends Component {

  render() {
    return (
      <div className="div-map-page">
        <SVGMap regionID="LK-11" />
      </div>
    );
  }

}
