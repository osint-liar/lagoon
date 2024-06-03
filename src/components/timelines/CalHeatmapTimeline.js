import React, {useContext, useEffect, useRef, useState} from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';
import * as d3 from 'd3';
import AppContext from "../providers/AppContext";
import Mustache from "mustache";
import {fetchOsintLiarData} from "../../utils/data";
import {useLocation} from "react-router-dom";


const CalHeatmapTimeline = () => {

  const {appConfiguration, updateAppConfiguration} = useContext(AppContext);
  const [records, setRecords] = useState([])
  const location = useLocation();
  const cal = new CalHeatmap();

  useEffect(() => {

    async function fetchData()
    {
      if(appConfiguration.Algorithm && location.pathname.startsWith('/timelines') && appConfiguration.SelectedCase?.Name !== null){
          let tmp = {...appConfiguration.Algorithm}

          let dataUrl = Mustache.render(tmp.dataUrl, {
              WebHost: appConfiguration.WebHost,
              CaseManagementUuid: appConfiguration.SelectedCase.Uuid,
              SqlQuery: encodeURIComponent(appConfiguration.Algorithm.sql)
          })
          tmp.dataUrl = dataUrl
          const data = await fetchOsintLiarData(tmp.dataUrl, appConfiguration)
          console.log(data.Records)

          // populate the data
          if(data.Records.length > 0){
              tmp.specification.data.source = data.Records
              tmp.specification.date.start = new Date(data.Records[0].date)
              tmp.specification.date.min = new Date(data.Records[0].date)
              tmp.specification.date.max = new Date(data.Records[data.Records.length - 1].date)
          }

          // Initialization of CalHeatMap
          cal.paint(tmp.specification);
        }

    }
    fetchData()

    // Return a cleanup function that will be called on component unmount
    return () => {
      // Perform cleanup
      // If CalHeatMap provides a specific method for cleanup, use it here
      // For example: cal.destroy(); (assuming 'destroy' is a method provided by CalHeatMap for cleanup)

      // If there's no specific cleanup method, you might need to manually clean up
      // This could include removing the CalHeatMap DOM element, event listeners, etc.
      if(cal){
          cal.destroy()
      }
    };
  }, [appConfiguration, location]);

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
