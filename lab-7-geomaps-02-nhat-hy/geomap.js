(function() { 
    var width = 800, 
        height = 600;
    
    // read in our json file
    Promise.all([
      d3.json("./topo.json"), // load the TopoJSON data 
      d3.csv("./cities.csv"), // load the GPS coords for cities 
      d3.csv("./states.csv")  // load the state population for each state  
    ]).then((data) => { 
      // 1.1: Convert TopoJSON to GeoJSON
      const topo = topojson.feature(data[0], data[0].objects.states);
  
      // 1.2: Create the map
      var projection = d3.geoAlbersUsa().scale(700).translate([width/2, height/2]);
      var path = d3.geoPath(projection);
  
      // This draws the rough patch
      const svg = d3.select("#geomap").append('svg')
                    .attr('width', width)
                    .attr('height', height);
      const g = svg.append('g').attr('transform', 'translate(50,50)');
  
      g.append("g")
        .selectAll("path")
        .data(topo.features)
        .join("path")
        .attr("d", path)
        .attr("fill", 'whitesmoke')
        .attr("stroke", "black")
        .attr("stroke-width", "1px");
  
      // give our data sensible names
      const topology = data[0];
      const cities = data[1];
      const states = data[2];
     
     // create a dictionary for states and populations
     const stateDictionary = new Map();
     states.forEach((state) => {
       stateDictionary.set(state.State, +state.Population);
     });
     
     // 2.2: Create the color scale
     var blues = d3.scaleSequential()
                   .domain(d3.extent(Array.from(stateDictionary.values())))
                   .range(["white", "steelblue"]);
  
     // 2.3: Apply colors to states
     g.selectAll('path')
      .data(topo.features)
      .join('path')
      .attr('d', path)
      .attr('fill', d => blues(stateDictionary.get(d.properties.name)))
      .attr('stroke', 'black');

      //Add circles to the cities
      g.selectAll('circle')
       .data(cities)
       .join('circle')
       .attr('r', 5)
       .attr('cx', d => {return projection([d.longitude, d.latitude])[0]; })
       .attr('cy', d => {return projection([d.longitude, d.latitude])[1]; })
       .attr('fill', 'red')
       .attr('stroke', 'red')
       .attr('stroke-width', 1);
    
    });
  })();
  

  