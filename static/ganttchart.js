const today = new Date(),
    day = 1000 * 60 * 60 * 24;

today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);

async function initilizeganttchart(selectedTableId, selectedTableName){
    try{
        const base_data = await getBaseData(selectedTableId);
        console.log("Chart Data");
        console.log(base_data);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of the current week
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - today.getDay() + 6); 

        // console.log(base_data);
        Highcharts.ganttChart('container', {
            title: {
                text: 'RoadMaps'
            },
            xAxis: {
                currentDateIndicator: {
                color: '#2caffe',
                dashStyle: 'ShortDot',
                width: 2
            }
            },
            navigator: {
                top:80,
                enabled: true,
                liveRedraw: true,
                series: {
                    type: 'gantt',
                    pointPlacement: 0.5,
                    pointPadding: 0.25,
                    accessibility: {
                        enabled: false
                    }
                },
                yAxis: {
                    min: 0,
                    max: 3,
                    reversed: true,
                    categories: [],
                    uniqueNames: true
                },
                xAxis: [{
                    min: startOfWeek.getTime(),
                    max: endOfWeek.getTime(),
                    custom: {
                        today,
                        weekendPlotBands: true
                    },
                }]
            },
            scrollbar: {
                enabled: true
            },
            rangeSelector: {
                enabled: true,
                selected: 0, // Set the default range to 1 week
                buttons: [{
                    type: 'month',
                    count: 1,
                    text: '1w'
                }],
                inputEnabled: true // Disable manual input
            },
            accessibility: {
                point: {
                    descriptionFormatter: function (point) {
                        // const dependency = point.dependency &&
                        //         point.series.chart.get(point.dependency).name,
                        //     dependsOn = dependency ? ' Depends on ' + dependency + '.' : '';
                        // '{point.yCategory}. Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}.{dependsOn}',
                        //  { point, dependsOn }
                        return Highcharts.format(
                            '{point.yCategory}. Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}',
                            { point }
                        );
                    }
                },
                series: {
                    descriptionFormat: '{name}'
                }
            },
            lang: {
                accessibility: {
                    axis: {
                        xAxisDescriptionPlural: 'The chart has a two-part X axis showing time in both week numbers and days.',
                        yAxisDescriptionPlural: 'The chart has one Y axis showing task categories.'
                    }
                }
            },
            plotOptions: {
                series: {
                    dragDrop: {
                        draggableX: true,
                        draggableY: true,
                        dragMinY: 0,
                        dragMaxY: 2,
                        dragPrecisionX: day/4
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        cursor: 'default',
                        pointerEvents: 'none'
                    }
                },
                gantt: {
                    pathfinder: {
                      lineWidth: 1,
                      startMarker: {
                        enabled: true,
                        symbol: 'circle',
                        rotation: 0,
                        radius: 3
                        },
                    endMarker: {
                        enabled: true,
                        symbol: 'diamond',
                        radius: 3
                        },
                    states:{
                            hover: {
                                lineWidthPlus: 2 
                        }
                      }
                    }
                }
            },
            series: [{
                name: selectedTableName,
                data: base_data,
                point: {
                    events: {
                        update: function (event) {
                        let startDate = Highcharts.dateFormat('%Y-%m-%d', event.target.x);
                        let endDate = Highcharts.dateFormat('%Y-%m-%d', event.target.x2);
                        let rowid = event.target.rowid;
                    
                        // Send the task data to the API
                        
                        fetch('https://script.google.com/macros/s/AKfycbxJQ1UYzXSEG18qNiU0E5Xr4JlceOi8B_Jvs5JfvNcP6Oipbi2DMiqz-Oynl5GxcQGI9g/exec?rowName=' + rowid + '&startDate=' + startDate + '&endDate=' + endDate)
                        .then(response => {
                            if (response.ok) {
                                console.log('Task added successfully');
                            } else {
                                console.error('Failed to add task');
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                        console.log('rowid is ', rowid);
                        console.log('New start date:', startDate);
                        console.log('New end date:', startDate);
                        }
                    }
                }
            }]
        });    
       }
       catch(error){
        console.error('Error occurred:', error);
       }
}

document.addEventListener('DOMContentLoaded', initilizeganttchart("tables/busF4R7ZbZefstfDnZPk4Q"));



// const sample_data = [{
//     name: 'Planning',
//     id: 'planning',
//     start: today.getTime(),
//     completed: {
//         amount: 0.95
//     },
//     end: today.getTime() + (20 * day)
// }, {
//     name: 'Requirements',
//     id: 'requirements',
//     parent: 'planning',
//     start: today.getTime(),
//     completed: {
//         amount: 0.95
//     },
//     end: today.getTime() + (5 * day)
// }, {
//     name: 'Design',
//     id: 'design',
//     dependency: 'requirements',
//     parent: 'planning',
//     completed: {
//         amount: 0.85
//     },
//     start: today.getTime() + (3 * day),
//     end: today.getTime() + (20 * day)
// }, {
//     name: 'Layout',
//     id: 'layout',
//     parent: 'design',
//     start: today.getTime() + (3 * day),
//     end: today.getTime() + (10 * day)
// }, {
//     name: 'Graphics',
//     parent: 'design',
//     dependency: 'layout',
//     start: today.getTime() + (10 * day),
//     end: today.getTime() + (20 * day)
// }, {
//     name: 'Develop',
//     id: 'develop',
//     start: today.getTime() + (5 * day),
//     end: today.getTime() + (30 * day)
// }, {
//     name: 'Create unit tests',
//     id: 'unit_tests',
//     dependency: 'requirements',
//     parent: 'develop',
//     start: today.getTime() + (5 * day),
//     end: today.getTime() + (8 * day)
// }, {
//     name: 'Implement',
//     id: 'implement',
//     dependency: 'unit_tests',
//     parent: 'develop',
//     start: today.getTime() + (8 * day),
//     end: today.getTime() + (30 * day)
// }]


