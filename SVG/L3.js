//Start D3 Scripts
d3.selectAll('cicle')
   //append svg
   .append('svg')

 //Use D3 selectors to change the color of the 5 circles
  .style('fill','red')
 
 //Use D3 selectors to make the 5 circles increase in size from left to right
 .attr("r", function(d, i) {
     return 40 + 10 * i;
 })

 //Use D3 selectors to stack them vertically with 50px in between
 .attr("cy", function(d, i) {
     return 50 + 100 * i;
 })

 //Use D3 selectors to stack them horizaontall with 50px in between
 .attr("cx", function(d, i) {
     return 50 + 120 * i;
 }); 