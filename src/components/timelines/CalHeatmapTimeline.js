import React, {useContext, useEffect, useRef, useState} from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';
import * as d3 from 'd3';
import AppContext from "../providers/AppContext";
import Mustache from "mustache";
import {fetchOsintLiarData} from "../../utils/data";
import {useLocation} from "react-router-dom";

/**
 * Data visualization using the CalMap tool
 * @returns {(function(): void)|*}
 * @constructor
 */
const CalHeatmapTimeline = (props) => {
  const {selectedCase, selectedAlgorithm} = props;
  const location = useLocation();
  const cal = new CalHeatmap();

  useEffect(() => {
      // populate the data
      const records = selectedAlgorithm?.specification.data.values ?? [];
      if(records.length > 0 && 'date' in records[0]){
          cal.destroy();
          selectedAlgorithm.specification.data.source = records
          selectedAlgorithm.specification.date.start = new Date(records[0].date)
          selectedAlgorithm.specification.date.min = new Date(records[0].date)
          selectedAlgorithm.specification.date.max = new Date(records[records.length - 1].date)
          // Initialization of CalHeatMap
          cal.paint(selectedAlgorithm.specification);
      }

    // Return a cleanup function that will be called on component unmount
    return () => {
      // Perform cleanup
      // If CalHeatMap provides a specific method for cleanup, use it here
      // For example: cal.destroy(); (assuming 'destroy' is a method provided by CalHeatMap for cleanup)

      // If there's no specific cleanup method, you might need to manually clean up
      // This could include removing the CalHeatMap DOM element, event listeners, etc.
      if(cal){
          cal.destroy();

      }
    };
  }, [selectedAlgorithm]);

  return (
  <div>
    <div id="cal-heatmap" className="margin-bottom--md"></div>
    <a
      className="button button--sm button--secondary"
      href="#"
      onClick={e => {
        e.preventDefault();
        cal.previous();
      }}
    >
      ← Previous
    </a>
    <a
      className="button button--sm button--secondary margin-left--xs"
      href="#"
      onClick={e => {
        e.preventDefault();
        cal.next();
      }}
    >
      Next →
    </a>
    <div style={{ float: 'right', fontSize: 11, marginTop: '5px' }}>
      Calm
      <div
        id="ex-stock-legend"
        style={{ display: 'inline-block', margin: '0 8px' }}
      ></div>
      Busy
    </div>
  </div>
  )
};

export default CalHeatmapTimeline;
