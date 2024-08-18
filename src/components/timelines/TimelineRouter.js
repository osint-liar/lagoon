import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import CalHeatmapTimeline from "./CalHeatmapTimeline";

export default function TimelineRouter(props) {
  const {selectedCase, selectedAlgorithm} = props;
  return (
    <div>
      <h1>Timeline Dashboard</h1>
        <CalHeatmapTimeline selectedCase={selectedCase} selectedAlgorithm={selectedAlgorithm}/>
    </div>
  );
}
