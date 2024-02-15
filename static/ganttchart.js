const today = new Date(),
    day = 1000 * 60 * 60 * 24;

today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);

document.addEventListener('DOMContentLoaded', async function() {
   try{
    const base_data = await getBaseData();
    // console.log(base_data);
    Highcharts.ganttChart('container', {

        title: {
            text: 'RoadMaps'
        },
        xAxis: {
            min: today.getTime() - (2 * day),
            max: today.getTime() + (32 * day)
        },
        yAxis: {
            uniqueNames: true
        },
        navigator: {
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
                categories: []
            }
        },
        scrollbar: {
            enabled: true
        },
        rangeSelector: {
            enabled: true,
            selected: 0
        },
        accessibility: {
            point: {
                descriptionFormatter: function (point) {
                    const dependency = point.dependency &&
                            point.series.chart.get(point.dependency).name,
                        dependsOn = dependency ? ' Depends on ' + dependency + '.' : '';
    
                    return Highcharts.format(
                        '{point.yCategory}. Start {point.x:%Y-%m-%d}, end {point.x2:%Y-%m-%d}.{dependsOn}',
                        { point, dependsOn }
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
        series: [{
            name: 'Project 1',
            data: base_data,
        }]
    });    
   }
   catch(error){
    console.error('Error occurred:', error);
   }
});



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


