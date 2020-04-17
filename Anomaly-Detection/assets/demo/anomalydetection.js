
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




am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var piechart = am4core.create("chartdiv2", am4charts.PieChart);

// Add data
piechart.data = [ {
  "label": "Normal",
  "rate": 501.9
}, {
  "label": "Undetected",
  "rate": 301.9
}, {
  "label": "Anomaly",
  "rate": 201.1
}];

// Add and configure Series
var pieSeries = piechart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "rate";
pieSeries.dataFields.category = "label";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 1;
pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;



am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv1", am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();

// Add data
chart.data = [{
  "point": "0.1",
  "count": 3025
}, {
  "point": "0.2",
  "count": 1882
}, {
  "point": "0.3",
  "count": 1809
}, {
  "point": "0.4",
  "count": 1322
}, {
  "point": "0.5",
  "count": 1122
}, {
  "point": "0.6",
  "count": 1114
}, {
  "point": "0.7",
  "count": 984
}, {
  "point": "0.8",
  "count": 711
}, {
  "point": "0.9",
  "count": 665
}, {
  "point": "1",
  "count": 580
}, {
  "point": "1.1",
  "count": 800
}, {
  "point": "1.2",
  "count": 760
}, {
  "point": "1.3",
  "count": 120
}, {
  "point": "1.4",
  "count": 535
}, {
  "point": "1.5",
  "count": 796
}, {
  "point": "1.6",
  "count": 124
}, {
  "point": "1.7",
  "count": 145
}, {
  "point": "1.8",
  "count": 852
}, {
  "point": "1.9",
  "count": 453
}, {
  "point": "2",
  "count": 762
}];

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "point";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.labels.template.rotation = 270;
// categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "count";
series.dataFields.categoryX = "point";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
var hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

// Cursor
chart.cursor = new am4charts.XYCursor();