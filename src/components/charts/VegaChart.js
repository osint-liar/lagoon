import React, { useEffect, useRef } from 'react';
import vegaEmbed from 'vega-embed';

const VegaChart = ({ spec }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const embedOptions = { actions: false }; // Customize Vega-Embed options here

    // Ensure the container is ready before attempting to embed the visualization
    if (chartRef.current) {
      vegaEmbed(chartRef.current, spec, embedOptions)
        .then((result) => {
          // Handle the result or interact with the view here
        })
        .catch((error) => console.error(error));
    }

    // Optional: Cleanup function to remove the view
    return () => {
      if (chartRef.current) {
        // Remove the view or perform any cleanup if necessary
      }
    };
  }, [spec]); // Re-embed the chart if the spec changes

  return <div ref={chartRef}></div>; // This div will contain the Vega chart
};

export default VegaChart;
