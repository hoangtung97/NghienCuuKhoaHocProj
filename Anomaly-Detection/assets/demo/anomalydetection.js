
// Themes begin
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
  for ( var i = 0; i < 100; i++ ) {
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
dateAxis.renderer.minGridDistance = 50;
dateAxis.renderer.grid.template.location = 0.5;
dateAxis.baseInterval = {
  count: 1,
  timeUnit: "date"
}

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "visits";
series.dataFields.dateX = "date";
series.strokeWidth = 3;
series.connect = false;
series.tensionX = 0.8;
series.fillOpacity = 0.2;
var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.stroke = new am4core.InterfaceColorSet().getFor("background");
bullet.strokeWidth = 2;
bullet.tooltipText = "{valueY}";
bullet.circle.radius = 4;


chart.colors.list = [
  am4core.color("#D65DB1"),
];
bullet.adapter.add("fill", function(fill, target){
    if(target.dataItem.valueY > 100){
        return chart.colors.getIndex(2);
    }
    return fill;
})

var range = valueAxis.createSeriesRange(series);
range.value = 100;
range.endValue = 5000;
range.contents.stroke = chart.colors.getIndex(2);
range.contents.fill = range.contents.stroke;
range.contents.fillOpacity = 0.2;

chart.scrollbarX = new am4core.Scrollbar();
chart.cursor = new am4charts.XYCursor()