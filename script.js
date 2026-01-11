let charts = {};
let dataLoaded = null;

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataLoaded = data;
  });

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        const chartType = entry.target.dataset.chart;
        if (chartType && !charts[chartType]) {
          createChart(chartType);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".step").forEach(step => {
  observer.observe(step);
});

function createChart(type) {
  if (!dataLoaded) return;

  if (type === "migrantes") {
    charts[type] = new Chart(
      document.getElementById("chartMigrantes"),
      {
        type: "line",
        data: {
          labels: dataLoaded.migrantes.labels,
          datasets: [{
            data: dataLoaded.migrantes.values,
            borderWidth: 2
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      }
    );
  }

  if (type === "origen") {
    charts[type] = new Chart(
      document.getElementById("chartOrigen"),
      {
        type: "bar",
        data: {
          labels: dataLoaded.origen.labels,
          datasets: [{
            data: dataLoaded.origen.values
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      }
    );
  }

  if (type === "riesgos") {
    charts[type] = new Chart(
      document.getElementById("chartRiesgos"),
      {
        type: "bar",
        data: {
          labels: dataLoaded.riesgos.labels,
          datasets: [{
            data: dataLoaded.riesgos.values
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      }
    );
  }
}
