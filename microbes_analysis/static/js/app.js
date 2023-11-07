// Endpoint URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON and log within the console
d3.json(url).then(function(data){
    console.log("Samples Data:", data);
});

// BarChart generator function
function genBarChart(){

    // Read in the JSON endpoint
    d3.json(url).then(function(data){
        
        // Get the first data point from the samples key
        let chart_data = data.samples[0];

            // Transform data
            let id = chart_data.id;
            let transData = [];
            for (let i = 0; i < chart_data.otu_ids.length; i++){
                transData.push({
                    otu : `OTU ${chart_data.otu_ids[i]}`,
                    label : chart_data.otu_labels[i],
                    otuVal : chart_data.sample_values[i]
                });
            };

            // Order by otuVal Descending
            transData.sort((a,b) => b.otuVal - a.otuVal);

            // Slice first 10 values
            let sliced = transData.slice(0,10);

            // Reverse the array to accommodate Plotly's defaults
            let reverseSlice = sliced.reverse();    
            
        // Map the values to the trace object
        let trace1 = {
            x : reverseSlice.map(val => val.otuVal),
            y : reverseSlice.map(val => val.otu),
            text : reverseSlice.map(val => val.label),
            type: "bar",
            orientation : "h"
        };

        // Create a c_data (chart data) array
        let c_data = [trace1];

        // Create char title and other layout features
        let layout = {
            margin :{
                t: 25
            }
        };

        // Generate plot
        Plotly.newPlot("bar", c_data, layout);
    });
};

genBarChart();