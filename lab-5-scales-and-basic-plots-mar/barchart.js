(function() {
  var width = 800,
    height = 600;

  // read in our csv file
  d3.csv("./cars.csv").then((data) => {

    // Process the Data
    var data = d3.rollup(data, v => Math.round(d3.mean(v, d => d.hwy)), d => d.cylinders);
    var data = Array.from(data, ([name, value]) => ({ name, value }));

    // Create scales
    const distinctValues = [...new Set(data.map((d) => d.name))]

    var x = d3.scaleBand()
      .domain(distinctValues)
      .range([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return (+d.value) })])
      .range([height, 0]);

    var color = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return (+d.value) })])
      .range(["#e6f2ff", "#0066cc"]);

    // Create the chart
    var svg = d3.select("#barchart")
      .append("g")
      .attr("transform", `translate(50, 50)`);

    bars = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return x(d.name);
      })
      .attr("y", function(d) {
        return y(d.value);
      })
      .attr("fill", function(d) {
        return color(d.value)
      })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        return height - y(+d.value);
      })
      .style("opacity", 0.75);

    // Add x axis
    svg.append("g")
      .attr("transform", "translate(50," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("y", 50)
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("Cylinders");

    // Add y axis
    svg.append("g")
      .attr("transform", "translate(50,0)")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text("Highway MPG");

    // Add event listeners
    bars.on('mouseover', (event, d) => {
        d3.select(event.currentTarget)
          .style("stroke", "black");

        d3.select('#tooltip')
          .style('display', 'block')
          .html(`
                 <h1 class="tooltip-title">${d.name}</h1>          
                 <div>Highway (HWY) MPG: ${d.hwy}</div>
                 <div>Num of Cylinders (CYL) : ${d.cyl}</div>
             `);
         
   })
     .on('mouseleave', (event) => {  //when mouse isn’t over point
         d3.select('#tooltip').style('display', 'none'); // hide tooltip
         d3.select(event.currentTarget) //remove the stroke from point
             .style("stroke", "none");
   });
       
          });
    
    })();
    