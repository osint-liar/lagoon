import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import CalHeatmapTimeline from "./CalHeatmapTimeline";

export default function TimelineRouter() {
  return (
    <div>
      <h1>Timeline Dashboard</h1>

      {/* Nested Routes */}
      <Routes>
        <Route path="cal-heat map-timeline" element={<CalHeatmapTimeline />} />
        <Route path="cal-heat-map-hour" element={<CalHeatmapTimeline />} />
        <Route path="cal-heat-map-minute" element={<CalHeatmapTimeline />} />
      </Routes>
      <Outlet />
    </div>
  );
}
