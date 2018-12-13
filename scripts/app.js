function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // const metadata_url = "http://localhost:5000/metadata/940";
  // d3.json(metadata_url).then(function(data) {
  //   console.log(data);
  // })

    //const metadata = d3.json(metadata_url);

    // Use d3 to select the panel with id of `#sample-metadata`
    // var sample_metadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    // d3.select("#sample-metadata").html("");
    // sample_metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    console.log("hello");
    // Object.entries(metadata).forEach(function([key, value])
    // {
    //   var paragraph = sample_metadata.append("p");
    //   paragraph.text(value)
    //   console.log("hello");
    //   console.log(value);
    // }
    // )

    // metadata.forEach(function(sampler) {
    //   var paragraph = sample_metadata.append("p");
    //   Object.entries(sampler).forEach(function([key, value]) {
    //     paragraph.append(value)
    //   }

    //   )
    // })


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
console.log("build charts")

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log("Building charts");

    buildCharts(firstSample);
    console.log("Building metadata");
    
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
