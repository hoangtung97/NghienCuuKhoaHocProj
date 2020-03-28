
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = generatechartData();
function generatechartData() {
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate( firstDate.getDate() - 150 );
  var visits = 50;
  var b = 0.6;
  for ( var i = 0; i < 150; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setDate( newDate.getDate() + i );
    if(i > 80){
        b = 0.4;
    }
    visits += Math.round((Math.random()<b?1:-1)*Math.random()*10);

    chartData.push( {
      date: newDate,
      visits: visits
    } );
  }
  return chartData;
}

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());  
dateAxis.startLocation = 0.5;
dateAxis.endLocation = 0.5;

// Create value axis
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 3;
series.tooltipText = "{valueY.value}";
series.fillOpacity = 0.1;

// Make bullets grow on hover
var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.circle.strokeWidth = 2;
bullet.circle.radius = 3;
bullet.circle.fill = am4core.color("#fff");

var bullethover = bullet.states.create("hover");
bullethover.properties.scale = 1.3;

// tao duong ranh gioi
var range = valueAxis.createSeriesRange(series);
range.value = 80;
range.endValue = -1000;
range.contents.stroke = chart.colors.getIndex(5);
range.contents.fill = range.contents.stroke;
range.contents.strokeOpacity = 0.7;
range.contents.fillOpacity = 0.1;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;
chart.scrollbarX = new am4core.Scrollbar();

series.tooltip.getFillFromObject = false;
series.tooltip.adapter.add("x", (x, target)=>{
    if(series.tooltip.tooltipDataItem.valueY < 10){
        series.tooltip.background.fill = chart.colors.getIndex(5);
    }
    else{
        series.tooltip.background.fill = chart.colors.getIndex(0);
    }
    return x;
})