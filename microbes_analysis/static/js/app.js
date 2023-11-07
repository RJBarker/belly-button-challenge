// Endpoint URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON and log within the console
d3.json(url).then(function(data){
    console.log("Samples Data:", data);
});

// Init chart to be shown on load
function init(){

    // Read in the JSON endpoint
    d3.json(url).then(function(data){
        
        // Get the first data point from the samples key
        let chart_data = data.samples[0];

            // From data point obtain required values
            let id = chart_data.id.slice(0,10);
            let otuIds = chart_data.otu_ids.slice(0,10);
            let otuLabels = chart_data.otu_labels.slice(0,10);
            let otuValues = chart_data.sample_values.slice(0,10);
        
        // Prefix otuIds with 'OTU'
        let y = otuIds.map(otu => `OTU ${otu}`);
        
        // Map the first 10 values to the x and y
        let trace1 = {
            x : otuValues.reverse(),
            y : y,
            text : otuLabels,
            type: "bar",
            orientation : "h"
        };

        // Create a c_data (chart data) array
        let c_data = [trace1];

        // Create char title and other layout features
        let layout = {
            title : "Top 10 OTU's"
        };

        // Generate plot
        Plotly.newPlot("bar", c_data, layout);
    });
};

init();