// import $ from 'jquery';
import * as d3 from "d3";

function forecastChart(data) {
  var temperatures = [],
    height = 400,
    width = 800;

    let tempColor;

    for (let i = 0; i < data.length; i++) {
      temperatures.push(data[i]);
    }

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(temperatures)])
      .range([0,height]);

    const xScale = d3.scaleBand()
      .domain(temperatures)
      .paddingInner(.1)
      .paddingOuter(.1)
      .range([0, width])

    var colors = d3.scaleLinear()
      .domain([0, 65, d3.max(temperatures)])
      .range(['#FFFFFF', '#2D8BCF', '#DA3637'])

    var tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0);

    var chart = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .selectAll('rect').data(temperatures)
      .enter().append('rect')
        .attr('fill', colors)
        .attr('width', function(d) {
          return xScale.bandwidth();
        })
        .attr('height', 0)
        .attr('x', function(d) {
          return xScale(d);
        })
        .attr('y', height)
        
        .on('mouseover', function(d) {
          tooltip.transition()
            .duration(200)
            .style('opacity', .9)
            .style('box-shadow', '0 0 5px rgba(0,0,0,.5)')
          tooltip.html(
            '<div style="font-size: 2rem; font-weight: bold">' +
              d.toFixed() + '&deg;</div>'
            )
            .style('left', (d3.event.pageX -35) + 'px')
            .style('top', (d3.event.pageY -64) + 'px')
            tempColor = this.style.fill
          d3.select(this)
            .style('fill', 'lime')
        })
        .on('mouseout', function(d) {
          tooltip.html('')
          d3.select(this)
            .style('fill', tempColor)
        });

    chart.transition()
      .attr('height', function(d) {
        return yScale(d);
      })
      .attr('y', function(d) {
        return height - yScale(d);
      })
      .delay(function(d, i) {
        return i * 20;
      })
      .duration(1000)
      .ease(d3.easeBounceOut);
}

export default forecastChart;