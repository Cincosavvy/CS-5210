(function() { 

    var width = 800;
    var height = 600;

    //read in the json file
    Promise.all([
        d3.json("./love-actually.json")
    ]).then((data) => { 

    //node variables
    const nodes = data[0].nodes;
    const links = data[0].links;

    //Create the SVG elements
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //Create circles for each data item in the nodes array
    const circles = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        //Adding the math.random
        .attr("cx", d => width * Math.random())
        .attr("cy", d => height * Math.random())
        .attr("r", 10)
        .style("fill", "lightgreen");

    //simulation
    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-25))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(15))
        .force("link", d3.forceLink().links(links).distance(50))
        .on("tick", ticked);

    //ticked function
    function ticked() {
        circles
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
            
        //connects the dots together
        svg.selectAll("line")
            .data(links)
            .join("line")
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; })
            .style("opacity", 2)
            .attr("stroke-width", "1px");
    }

    });
})();
