// grab our canvas
let svg = d3.select("#canvas");

// set the width and height
svg.attr('width', 500)
   .attr('height', 500);

// set up grid spacing
let spacing = 40;
let rows = 3;
let column = 10;

// create an array of 30 items (all with value the 5)
let data = d3.range(30).map(i => {
   return 5;
});

// create rectangles and assign them to a variable
let rects = svg.selectAll('rect')
   .data(data)
   .join('rect')
   .attr('width', spacing - 4)
   .attr('height', spacing - 4)
   .attr('x', (d, i) => (i % column) * spacing)
   .attr('y', (d, i) => Math.floor(i / column) % rows * spacing);

// create the grid functions
function grid() {
   rects.transition()
        .delay((d, i) => 10 * i)
        .duration(400)
        .attr('fill', 'black');
}

function grid2() {
   rects.transition()
        .delay((d, i) => 10 * i)
        .duration(400)
        .attr('fill', (d, i) => i < 17 ? 'brown' : 'gray');
}

function grid3() {
   rects.transition()
        .delay((d, i) => 10 * i)
        .duration(400)
        .attr('fill', (d, i) => i >= 1 && i < 12 ? 'blue' : 'gray');
}

function grid4() {
   rects.transition()
        .delay((d, i) => 10 * i)
        .duration(400)
        .attr('fill', (d, i) => i == 0 ? 'green' : 'gray');
}

// trigger these functions on page scroll
new scroll('div2', '75%', grid2, grid);  // create a grid for div2
new scroll('div3', '75%', grid3, grid2); // create a grid for div3
new scroll('div4', '75%', grid4, grid3); // create a grid for div4
new scroll('div5', '75%', grid, grid4);  // create a grid for div5

// Scrollytelling boilerplate
function scroll(n, offset, func1, func2) {
   const el = document.getElementById(n);
   return new Waypoint({
       element: el,
       handler: function(direction) {
           direction == 'down' ? func1() : func2();
       },
       offset: offset
   });
}
