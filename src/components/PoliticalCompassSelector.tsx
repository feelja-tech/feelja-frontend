import React, { ReactElement, useEffect } from "react";

import { Scatter } from "react-chartjs-2";
import Chart from "chart.js";
import "chartjs-plugin-dragdata";

interface PoliticalCompassSelectorProps {
  onChange: (val: string) => void;
}

function registerQuadrantColoringPlugin() {
  Chart.plugins.register({
    beforeDraw(chart, easing) {
      const { chartArea } = chart;
      const { ctx } = chart;

      // Replace these IDs if you have given your axes IDs in the config

      const xScale = (chart as any).scales["x-axis-1"];
      const yScale = (chart as any).scales["y-axis-1"];

      const midX = xScale.getPixelForValue(0);
      const midY = yScale.getPixelForValue(0);

      // Top left quadrant
      ctx.fillStyle = "#f9bbbb";
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        midX - chartArea.left,
        midY - chartArea.top
      );

      // Top right quadrant
      ctx.fillStyle = "#93daf8";
      ctx.fillRect(
        midX,
        chartArea.top,
        chartArea.right - midX,
        midY - chartArea.top
      );

      // Bottom right quadrant
      ctx.fillStyle = "#f5f5a9";
      ctx.fillRect(midX, midY, chartArea.right - midX, chartArea.bottom - midY);

      // Bottom left quadrant
      ctx.fillStyle = "#c9e5bd";
      ctx.fillRect(
        chartArea.left,
        midY,
        midX - chartArea.left,
        chartArea.bottom - midY
      );

      // Text
      ctx.fillStyle = "grey";

      ctx.font = "15px Montserrat,sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const offset = 0.5;

      ctx.fillText(
        "Authoritarian",
        xScale.getPixelForValue(-5),
        yScale.getPixelForValue(5 + offset)
      );
      ctx.fillText(
        "Left",
        xScale.getPixelForValue(-5),
        yScale.getPixelForValue(3.5 + offset)
      );

      ctx.fillText(
        "Authoritarian",
        xScale.getPixelForValue(5),
        yScale.getPixelForValue(5 + offset)
      );
      ctx.fillText(
        "Right",
        xScale.getPixelForValue(5),
        yScale.getPixelForValue(3.5 + offset)
      );

      ctx.fillText(
        "Libertarian",
        xScale.getPixelForValue(-5),
        yScale.getPixelForValue(-5 + offset)
      );
      ctx.fillText(
        "Left",
        xScale.getPixelForValue(-5),
        yScale.getPixelForValue(-6.5 + offset)
      );

      ctx.fillText(
        "Libertarian",
        xScale.getPixelForValue(5),
        yScale.getPixelForValue(-5 + offset)
      );
      ctx.fillText(
        "Right",
        xScale.getPixelForValue(5),
        yScale.getPixelForValue(-6.5 + offset)
      );
    },
  });
}

export function PoliticalCompassSelector(
  props: PoliticalCompassSelectorProps
): ReactElement {
  useEffect(registerQuadrantColoringPlugin, []);

  const { onChange } = props;

  return (
    <Scatter
      height={300}
      data={{
        datasets: [
          {
            pointRadius: 20,
            pointHitRadius: 25,
            showLine: true,
            data: [
              {
                x: 0,
                y: 0,
              },
            ],
          },
        ],
      }}
      options={
        {
          tooltips: {
            enabled: false,
          },
          aspectRatio: 1,
          dragData: true,
          onDragEnd: (e, datasetIndex, index, value) => {
            if (value.x > 0) {
              if (value.y > 0) {
                onChange("Authoritarian Right");
              } else {
                onChange("Libertarian Right");
              }
            } else if (value.y > 0) {
              onChange("Authoritarian Left");
            } else {
              onChange("Libertarian Left");
            }
          },
          dragOptions: {
            showTooltip: false,
          },
          dragX: true,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                type: "linear",
                ticks: {
                  max: 10,
                  min: -10,
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                type: "linear",
                ticks: {
                  max: 10,
                  min: -10,
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        } as Chart.ChartOptions & { dragData?: boolean }
      }
    />
  );
}

export default PoliticalCompassSelector;
