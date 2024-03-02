import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import 'cal-heatmap/cal-heatmap.css';

const weekDaysTemplate = DateHelper => ({
  name: 'weekday',
  parent: 'day',
  rowsCount: () => 5,
  columnsCount: () => 54,
  mapping: (startTimestamp, endTimestamp) => {
    let weekNumber = 0;
    let x = -1;

    return DateHelper.intervals(
      'day',
      startTimestamp,
      DateHelper.date(endTimestamp)
    )
      .map(ts => {
        const date = DateHelper.date(ts);

        if (weekNumber !== date.week()) {
          weekNumber = date.week();
          x += 1;
        }

        if (date.format('d') === '0' || date.format('d') === '6') {
          return null;
        }

        return {
          t: ts,
          x,
          y: date.format('d') - 1,
        };
      })
      .filter(n => n !== null);
  },
});

const generateDemoData = () => {
  const data = {};
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const time = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate() + i);
    data[Math.floor(time / 1000)] = Math.floor(Math.random() * 10);
  }
  return data;
};

const CalHeatmapTimeline = () => {

  const cal = new CalHeatmap();
  cal.paint({
        data: generateDemoData()
      },
      [[Tooltip]]);
  return <div id="cal-heatmap"></div>;
};

export default CalHeatmapTimeline;
