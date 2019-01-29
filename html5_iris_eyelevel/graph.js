var jsonData_dummy = {
"Today": [],
"This Month": [],
"This Year": [],
"Yesterday": [],
"Last Mont": []}

var jsonData_agents = {
"Agent 1": [],
"Agent 2": [],
"Agent 3": [],
"Agent 4": [],
"Agent 5": []}

function addZeroes(num) {
    var value = Number(num);      
    var res = num.split(".");     
    if(res.length == 1 || res[1].length < 3) { 
        value = value.toFixed(2);
    }
// Return updated or original number.
return value;
}

 window.onload = function () {
     calcData();
      setArr()
    chart.options.data[0].dataPoints = [];
    var e = document.getElementById("dd");
  	var selected = e.options[e.selectedIndex].value;
  	displaySelected(selected)
    dps = jsonData_dummy[selected];
    for (var i in dps) {
    	var xVal = dps[i].x;
      chart.options.data[0].dataPoints.push({x: new Date(2018, 10, 16, xVal, 0), y: dps[i].y});
    }
    chart.render();

 }

var data = []
var calc_hour = [] //used
var calc_week = []
var calc_month = [] //used
var calc_year = [] //used

var unique_hr_aids = []
var unique_month_aids = []
var unique_year_aids = []

var total_rev_hour = 0;
var total_rev_month = 0;
var total_rev_year = 0;

function setX(arr, formatString, time, dummy) {
  jsonData_dummy[dummy] = getSummed(arr);
  chart.options.axisX = {
	  labelFontSize: 10,
	  labelFontFamily: "sans-serif",
  	valueFormatString: formatString,
    intervalType: time,
    interval: 1,
    title: "Time"
  }
}

function getSummed(arr) {
  var summed_arr = DataGrouper.sum(arr, 'x')
  return summed_arr
}

function setAids(arr, aid, aids) {
  if (aid != null) {
     if (arr.includes(aid) == false) {
       arr.push(aid)
     }
  } else if (aids != null) {
    
    if (arr.includes(aids) == false) {
       arr.push(aids)
     }
    
    // take care of getting individual aids from arr of arr of aids
  }
  
  return arr
}

function calcData() {
    var d = new Date();
    var now = d.getTime();
    d.setUTCMilliseconds(0);
    d.setUTCSeconds(0);
    d.setUTCMinutes(0);
    d.setUTCHours(7);
    
  var dat = []
  var dat_test = []
  var week = [];
    
    var now;
    var date;
    var readable_date;
    
    var times = ['hour', 'day', 'month'];
    
    for (var i in times) {
        time = times[i]
        for (var each in jsonData[time]) {
          now = jsonData[time][each][time]
          date = new Date(now); // gets the hour from input data
          readable_date = date.toString() // formatted date including date + time
          
          var aid = jsonData[time][each]['aid']
          var aids = jsonData[time][each]['aids']
          if (time == 'hour') {
            unique_hr_aids = setAids(unique_hr_aids, aid, aids)

            calc_hour.push({"x": date.getHours(), "y": jsonData[time][each]['estimatedrev']});
            total_rev_hour += calc_hour[each]['y'];

          } else if (time == 'day') {
            
            unique_month_aids = setAids(unique_month_aids, aid, aids)
            
            x = date.getMonth() + "/" + date.getDate()
            calc_month.push({"x": x, "y": jsonData[time][each]['estimatedrev']});
            total_rev_month += calc_month[each]['y']

          } else if (time == 'month') {
            
            unique_year_aids = setAids(unique_year_aids, aid, aids)
            
            calc_year.push({"x": date.getMonth(), "y": jsonData[time][each]['estimatedrev']})
            total_rev_year += calc_year[each]['y'];
          }
        
      }
    }
}

function setArr() {
  calc_hour = getSummed(calc_hour)
  calc_month = getSummed(calc_month)
  calc_year = getSummed(calc_year)
}

function displayTot(total) {
  total_rev_div =  document.getElementById("total_revenue")
  total_by_time = round(total, 2)
  total_by_time = addZeroes(String(total_by_time))
  total_rev_div.innerHTML = "Total Revenue:" + "<br>" + total_by_time;
}

function displaySelected(selected) {
  if (selected == 'Today') {
    setX(calc_hour, "h TT", 'hour', 'Today');
    displayTot(total_rev_hour);
  } else if (selected == 'This Month') {
    setX(calc_month, "M/DD", 'day', 'This Month');
    displayTot(total_rev_month);
  } else if (selected == 'This Year') {
    setX(calc_year, "MMM", 'month', 'This Year');
    displayTot(total_rev_year);
  }
  
}

var dataPoints = [];
var chart = new CanvasJS.Chart("chartContainer",
{
  colorSet: "greenShades",
  title: {
	text: "Revenue by Time Frame",
	fontSize: 24,
	fontWeight: "bold",
	fontFamily: "sans-serif",
  margin: 36,
	},
	width: 600,
	zoomEnabled: true,
	exportEnabled: true,
	dataPointWidth: 20,
	colorSet: "greenShades",
    axisY: {
      labelFontSize: 16,
      labelFormatter: function(e){
				return  "$" + e.value;
			},
      margin: 8
    },
	data: [{
	  color: "#72e5b1",
    showInLegend: true,
    labelFontFamily: "sans-serif",
    type: 'column',
    //xValueFormatString:"D MM h:mm",
    xValueType: "dateTime",
    showInLegend: true,
    name: "agents",
    dataPoints: dataPoints // this should contain only specific serial number data


	}]
});


$(".agents_dropdown").change(function() {
    var e = document.getElementById("agents");
    var selected = e.options[e.selectedIndex].value;
    dps = jsonData_agents[selected];
    for(var i in dps) {
  	var xVal = dps[i].x;
    chart.options.data[0].dataPoints.push({x: new Date(2018, 10, 16, xVal, 0), y: dps[i].y});
  }
  chart.render();
});



var min, max, graph = {};
var total_rev = 0;


function daysInMonth (month, year) {
  return new Date(year, month+1, 0).getDate();
}


var DataGrouper = (function() {
    var has = function(obj, target) {
        return _.any(obj, function(value) {
            return _.isEqual(value, target);
        });
    };

    var keys = function(data, names) {
        return _.reduce(data, function(memo, item) {
            var key = _.pick(item, names);
            if (!has(memo, key)) {
                memo.push(key);
            }
            return memo;
        }, []);
    };

    var group = function(data, names) {
        var stems = keys(data, names);
        return _.map(stems, function(stem) {
            return {
                key: stem,
                vals:_.map(_.where(data, stem), function(item) {
                    return _.omit(item, names);
                })
            };
        });
    };

    group.register = function(name, converter) {
        return group[name] = function(data, names) {
            return _.map(group(data, names), converter);
        };
    };

    return group;
}());

DataGrouper.register("sum", function(item) {
    return _.extend({}, item.key, {y: _.reduce(item.vals, function(memo, node) {
        return memo + Number(node.y);
    }, 0)});
});

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);


    for (var i in data) {
      if (i == 0) {
        result += "Today's"
        result += columnDelimiter
        result += 'Earnings'
        result += lineDelimiter;
      } else if (i == 1) {
        result += "This Month's"
        result += columnDelimiter
        result += 'Earnings'
        result += lineDelimiter;
      } else if (i == 2) {
        result += "This Year's"
        result += columnDelimiter
        result += 'Earnings'
        result += lineDelimiter;
      }
     for (var j in data[i]) {
       result += data[i][j]['x']
       result += columnDelimiter
       result += data[i][j]['y']
       result += lineDelimiter
     }
    }
    

    console.log(result)
    return result;
}

function downloadCSV(args) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: [calc_hour, calc_month, calc_year]
    });
    if (csv == null) {
      console.log('returned')
      return;
    }

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

var time = ""
$( ".dropdown" ).change(function() {

	chart.options.data[0].dataPoints = [];
  var e = document.getElementById("dd");
	var selected = e.options[e.selectedIndex].value;
  displaySelected(selected)
	if (selected == "This Month") {
	  time = 'day'
	} else if (selected == "This Year") {
	  time = "month"
	} else if (selected == "Today") {
	  time = 'hour'
	}
	
	var dps = jsonData_dummy[selected];
	for(var i in dps) {
    	var xVal = dps[i].x;
    	if (time == "month") {
    	  chart.options.data[0].dataPoints.push({x: new Date(2018, xVal, 1, 0, 0), y: dps[i].y});
    	} else if (time == "hour") {
    	  chart.options.data[0].dataPoints.push({x: new Date(2018, 10, 1, xVal, 0), y: dps[i].y});
    	} else if (time == "day") {
    	  var parts = xVal.split('/');
        var month = parts[0];
        var day = parts[1];
    	  chart.options.data[0].dataPoints.push({x: new Date(2018, month, day, 0, 0), y: dps[i].y});
    	}
    }

  chart.render();

});

export_button = document.getElementById('export_data')

export_button.onclick = function() {
  var e = document.getElementById("dd");
	var selected = e.options[e.selectedIndex].value;
	if (selected == "This Month") {
	  time = 'day'
	} else if (selected == "This Year") {
	  time = "month"
	} else if (selected == "Today") {
	  time = 'hour'
	}
	
	dps = jsonData_dummy[selected]
  if (time == 'hour') {
      downloadCSV({ filename: "hourly-data.csv" }, dps)
    } else if (time == 'day') {
      downloadCSV({ filename: "monthly-data.csv" }, dps)
    } else if (time == 'month') {
      downloadCSV({ filename: "yearly-data.csv" }, dps)
    }
  
};


agents_dropdown = document.getElementById('agents')

agents_dropdown.onclick = function() {
    var select = document.getElementById('agents')
    console.log(select.length)
    
    if (select.length != agentobj.length) {
        for (var i = 0; i < agentobj.length; i+= 1) {
            select.options[i] = new Option(agentobj[i]['name'], agentobj[i]['name']);
     
        }
    }
};