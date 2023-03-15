 /*d3.csv('cars.csv')
           .then(function(data) {
            console.log(data);
           }) */

d3.request("https://raw.githubusercontent.com/npow/airline-codes/master/airlines.json")
     .get((data)=>{
        console.log(JSON.parse(data.response))
          })
