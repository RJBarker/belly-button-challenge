// Gauge chart for washing frequency
function genGaugeChart(sample){

    // Fetch the JSON file
    d3.json(url).then(function(data){

        // Assign the meta data to a variable
        let metadata = data.metadata;

        // Filter the metadata to the sample
        let meta_array = metadata.filter(md => md.id == sample);

        // get data from array
        let meta_data = meta_array[0];

        // Create the trace object for data required
        let gaugeTrace = {
            value : meta_data.wfreq,
            title : {text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    dtick : 1,
                    tick0 : 1,
                    range: [null, 9],
                    ticks: "",
                    ticklabelstep : 1                    
                },
                bar:{
                    thickness : 0.05,                    
                    color: "red"                    
                },
                steps: [
                    {range: [0,1], color: "rgb(248,243,236)"},
                    {range: [1,2], color: "rgb(244,241,229)"},
                    {range: [2,3], color: "rgb(233,231,201)"},
                    {range: [3,4], color: "rgb(229,232,176)"},
                    {range: [4,5], color: "rgb(212,229,154)"},
                    {range: [5,6], color: "rgb(182,205,143)"},
                    {range: [6,7], color: "rgb(138,192,134)"},
                    {range: [7,8], color: "rgb(137,188,141)"},
                    {range: [8,9], color: "rgb(131,181,136)"}
                ],
                threshold: {
                    value : meta_data.wfreq,
                    line: { 
                        color : "red",
                        width : 2
                 },
                    thickness : 1
                }
            }
        };

        // Assign trace to data array
        let gaugeData = [gaugeTrace];

        // Create layout object
        let gaugeLayout = {
            margin:{
                t : 0,
                b : 0,
                r : 30,
                l : 30
            }
        };

        // Create the plot
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);

    });
}

// var data = [
// 	{
// 		domain: { x: [0, 1], y: [0, 1] },
// 		value: 270,
// 		title: { text: "Speed" },
// 		type: "indicator",
// 		mode: "gauge+number"
// 	}
// ];

// var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
// Plotly.newPlot('myDiv', data, layout);