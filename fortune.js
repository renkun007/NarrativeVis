async function init() {
    const data = await d3.csv("fortune_1000-2020.csv"); 

    var revenueMax = d3.max(data, function(d){return d.revenue;});
    var revenueMin = d3.min(data, function(d){return d.revenue;});
    var companies = data.company;
    var barwidth =  100/3
    var x = d3.scaleBand().domain(companies).range([0,800]); 
     
    var y = d3.scaleLinear().domain([0,revenueMax]).range([800,0]); 
     
    var canvas = d3.select('svg'); 
    //plot bars on x axis
    var bars = canvas.append('g')
        .attr('transform','translate(100,100)') 
        .selectAll('rect').data(data).enter().append('rect') 
        .attr('x',function(d,i) {return i;}) 
        .attr('y',function(d) {return y(d.revenue);})
        .attr("width",barwidth)
        .attr("height",function(d) {return y(d.revenue);}); 
    
    // add revene to bars
    canvas.selectAll("text")
        .append("text")
        .attr("fill","blue")
        .attr('x', function(d,i) {return i + barwidth/2;})
        .text(function(d) {return d.revenue});
    
    // axis
    var xaxis = d3.axisBottom(x);
    var yaxis = d3.axisLeft(y);
    // xaxis.tickValues([10,20,50,100]).tickFormat(d3.format("~s"));
    // yaxis.tickValues([10,20,50,100]).tickFormat(d3.format("~s"));
    canvas.append("g")  
        .attr('transform','translate(100,100)')  
        .call(yaxis)
     
    canvas.append("g")  
        .attr('transform','translate(100,900)')  
        .call(xaxis); 
     }