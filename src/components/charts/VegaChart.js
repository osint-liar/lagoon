import React, { useEffect, useRef } from 'react';
import vegaEmbed from 'vega-embed';

const VegaChart = ({ spec }) => {
  const chartRef = useRef(null);

  useEffect(() => {

    async function fetchData()
    {
      const embedOptions = { actions: false }; // Customize Vega-Embed options here
        // Ensure the container is ready before attempting to embed the visualization
        if (chartRef.current) {
          const result = await vegaEmbed(chartRef.current, spec, embedOptions)
          console.log(result.view)
        }
    }
    fetchData()

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
