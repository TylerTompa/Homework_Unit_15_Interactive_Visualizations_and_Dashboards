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

    d3.json(`/metadata/${sample}`).then(
      d => {

        console.log("Then'ed it metadata");
        console.log(d);

        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");

        Object.entries(d).forEach(function([key, value])
        {
          // console.log(`${key}: ${value}`);
          var paragraph = sample_metadata.append("p");
          paragraph.text(`${key}: ${value}`);

          // sample_metadata.selectAll("h6").data(Object.entries(d)).enter().append("h6").text(function(d) {return `${d[0]}: ${d[1]}`})

        }
        )

      }
    )

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
        console.log("Then'ed it charts");
        console.log(d.otu_ids);
        // console.log(d.otu_labels);
        // console.log(d.sample_values);
        // console.log("Still then'ed");

        var otu_ids = d.otu_ids;
        console.log(otu_ids);
        var otu_labels = d.otu_labels;
        var sample_values = d.samples_values;

        // var top_10_samples_otu_ids = d.otu_ids.slice(0, 10);
        // console.log("Please log this 1");
        // console.log(top_10_samples_otu_ids);
        
        // var top_10_samples_otu_labels = d.otu_labels.slice(0, 10);
        // console.log("Please log this 2");
        // console.log(top_10_samples_otu_labels);

        // var top_10_samples_sample_values = d.sample_values.slice(0, 10);
        // console.log("Plese log this 3");
        // console.log(top_10_samples_sample_values);

        var trace_pie = {
          // values: top_10_samples_sample_values,
          values: d.sample_values.slice(0, 10),
          // labels: top_10_samples_otu_labels,
          labels: d.otu_ids.slice(0,10),
          text: d.otu_labels,
          type: 'pie'
        };
        console.log("Maybe made trace pie");

        var pie_data = [trace_pie];
        console.log("Maybe made data pie");

        var layout_pie = {
          title: "Pie Chart",
          // legend: {
          //   x: 4,
          //   y: 0.5
          // }
        };
        console.log("maybe reposition legend");

        console.log("Maybe made layout pie");

        Plotly.newPlot("pie", pie_data, layout_pie);
        console.log("Maybe plotted pie");

        // var trace_bubble = {
        //   x: top_10_samples_otu_ids,
        //   y: top_10_samples_sample_values,
        //   mode: "markers",
        //   marker: {
        //     size: top_10_samples_sample_values,
        //     color: top_10_samples_otu_ids
        //   }
        //   // test: otu_labels
        // };
        var trace_bubble = {
          x: d.otu_ids,
          y: d.sample_values,
          mode: "markers",
          marker: {
            size: d.sample_values,
            color: d.otu_ids,
            colorscale: "Earth"
          },
          text: d.otu_labels
        };
        console.log("Maybe made bubble trace")
    
        var bubble_data = [trace_bubble];
        console.log("Maybe made bubble trace");
    
        var layout_bubble = {
          title: "Bubble Chart"
        }
    
        Plotly.newPlot("bubble", bubble_data, layout_bubble);

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
