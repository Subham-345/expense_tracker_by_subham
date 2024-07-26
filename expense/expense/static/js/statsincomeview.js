const renderChart = (data, labels) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
          labels: labels,
          datasets: [
              {
                  label: "Last 6 months income",
                  data: data,
                  backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
              },
          ],
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: true,
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          let label = context.label || '';
                          if (context.parsed) {
                              label += ': ' + context.parsed + ' units';  // Customize this as needed
                          }
                          return label;
                      }
                  }
              },
              title: {
                  display: true,
                  text: "Incomes per category",
              },
          },
      },
  });
};

// Function to fetch and process chart data
const getChartData = () => {
  console.log("Fetching data...");
  fetch("/income_source_summary")
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((results) => {
          console.log("Results:", results);
          const sourceData = results.income_source_data;
          const labels = Object.keys(sourceData);
          const data = Object.values(sourceData);
          renderChart(data, labels);
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
      });
};

// Ensure getChartData is called once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getChartData);