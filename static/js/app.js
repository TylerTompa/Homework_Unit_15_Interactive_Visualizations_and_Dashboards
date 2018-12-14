function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // const metadata_url = "http://localhost:5000/metadata/940";
  // d3.json(metadata_url).then(function(data) {
  //   console.log(data);
  // })

  //   // Use d3 to select the panel with id of `#sample-metadata`
  //   var sample_metadata = d3.select("#sample-metadata");

  //   // Use `.html("") to clear any existing metadata
  //   // d3.select("#sample-metadata").html("");
  //   sample_metadata.html("");

  //   // Use `Object.entries` to add each key and value pair to the panel
  //   // Hint: Inside the loop, you will need to use d3 to append new
  //   // tags for each key-value in the metadata.
  //   Object.entries(metadata).forEach(function([key, value])
  //   {
  //     console.log("hello");
  //   }
  //   )


    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

    console.log("Im inside buildMetadata")
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    
    console.log("Im inside buildCharts")

    // d3.json(`/samples/${sample}`).then(function(d) {
    //   console.log(d);
    // })

    d3.json(`/samples/${sample}`).then(
      d => {
        console.log("Then'ed it")
        console.log(d.otu_ids);
        console.log(d.otu_labels);
        console.log(d.sample_values);
        console.log("Still then'ed");

        var top_10_samples_otu_ids = d.otu_ids.slice(0, 10);
        console.log("Please log this 1");
        console.log(top_10_samples_otu_ids);
        
        var top_10_samples_otu_labels = d.otu_labels.slice(0, 10);
        console.log("Please log this 2");
        console.log(top_10_samples_otu_labels);

        var top_10_samples_sample_values = d.sample_values.slice(0, 10);
        console.log("Plese log this 3");
        console.log(top_10_samples_sample_values);

        var trace_pie = {
          labels: top_10_samples_otu_labels,
          values: top_10_samples_sample_values,
          type: 'pie'
        };
        console.log("Maybe made trace");

        var pie_data = [trace_pie];
        console.log("Maybe made data");

        layout_pie = {
          title: "Pie Chart"
        };
        console.log("Maybe made layout");

        Plotly.newPlot("pie", pie_data, layout_pie);
        console.log("Maybe plotted");

    })




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

    console.log(firstSample);

    buildCharts(firstSample);
    buildMetadata(firstSample);


  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected

  // first sample is 940
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
