// Endpoint URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON and log within the console
d3.json(url).then(function(data){
    console.log("Samples Data:", data);
});

// Init Dashboard Load function
function init(){

    // Fetch the JSON
    d3.json(url).then(function(data){

        // Select the dropdown menu
        let dd = d3.selectAll("#selDataset");

        // Append new list items for all 'names'
        for (let i = 0; i < data.names.length; i++){
            dd.append("option").attr("value", data.names[i]).text(data.names[i]);
        };
    
    // Store the ID from dropdown in a variable
    let sampleID = dd.property('value');

    // console.log(sampleID);

    // Use the functions to generate the plots
    genBarChart(sampleID);
    genDemographic(sampleID);
    genBubbleChart(sampleID);
    });

};

// BarChart generator function
function genBarChart(sample){

    // Read in the JSON endpoint
    d3.json(url).then(function(data){
        
        // Assign samples data to variable
        let samples_data = data.samples;

        // Filter the data for sample array
        let sample_array = samples_data.filter(sd => sd.id == sample);

        // Pull data from the array
        let sampleData = sample_array[0];

        console.log(sampleData);
            // Transform data
            //let id = chart_data.id;
            let transData = [];
            for (let i = 0; i < sampleData.otu_ids.length; i++){
                transData.push({
                    otu : `OTU ${sampleData.otu_ids[i]}`,
                    label : sampleData.otu_labels[i],
                    otuVal : sampleData.sample_values[i]
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

// DemoGraphic function generator
function genDemographic(sample){
    d3.json(url).then(function(data){

        // Assign metadata to a variable
        let metadata = data.metadata;

        // Filter the metadata to the sample
        let meta_array = metadata.filter(md => md.id == sample);

        // Get data from array
        let meta_data = meta_array[0];

        console.log("Metadata:", meta_data);

        // Select the sample-metadata div in the demographic panel
        let div = d3.select("#sample-metadata");

        // Add small text attr and clear the div contents
        div.attr("class","small").attr("align", "center").html("");

        // Loop through metadata and append to div
        for (let meta in meta_data){
            div.append().html(`<b>${meta}:</b> \t ${meta_data[meta]} </br>`);
        };

    });
};

// BubbleChart function generator
function genBubbleChart(sample){
    d3.json(url).then(function(data){

        // Assign samples data to variable
        let samples_data = data.samples;

        // Filter the data for sample array
        let sample_array = samples_data.filter(sd => sd.id == sample);

        // Pull data from the array
        let sampleData = sample_array[0];

        console.log(sampleData);

            // Transform data
            //let id = chart_data.id;
            let transData = [];
            for (let i = 0; i < sampleData.otu_ids.length; i++){
                transData.push({
                    otu : sampleData.otu_ids[i],
                    label : sampleData.otu_labels[i],
                    otuVal : sampleData.sample_values[i]
                });
            };
        
        // Sort the values by otu ascending
        transData.sort((a,b) => b.otuVal - a.otuVal);

        // Map the values to a trace object
        let bubTrace = {
            x : transData.map(val => val.otu),
            y : transData.map(val => val.otuVal),
            mode : 'markers',
            marker :{
                size: transData.map(val => (val.otuVal * 0.75)),
                opacity : 0.75,
                color : transData.map(val => val.otu),
                colorscale: "Earth"
            },
            text: transData.map(val => val.label)
        };

        // Create data array
        let bubData = [bubTrace];

        // Create layout object
        let layout = {
            hovermode: "y",
            hoverdistance:1,
            showlegend:false,
            height: 450,
            width: 1140,
            margin: {
                autoexpand:true,
                t: 10,
                b: 25,
                l: 25,
                r: 25
            }
        };

        // Generate plot
        Plotly.newPlot("bubble", bubData, layout);
    });
};

// Create an Event to run when the dropdown is changed
function optionChanged(sample){
    console.log(`Subject ID changed: ${sample}`);
    genBarChart(sample);
    genBubbleChart(sample);
    genDemographic(sample);
};

init();