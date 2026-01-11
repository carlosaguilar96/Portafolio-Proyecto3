let charts = {};
let dataLoaded = null;

// Cargar datos
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataLoaded = data;
  });

// Seleccionar steps
const steps = document.querySelectorAll(".step");

// Intersection Observer
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
  {
    threshold: 0.5
  }
);

// Observar cada step
steps.forEach(step => observer.observe(step));

// Forzar activación inicial (IMPORTANTE)
window.addEventListener("load", () => {
  steps.forEach(step => {
    const rect = step.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.75) {
      step.classList.add("active");

      const chartType = step.dataset.chart;
      if (chartType && !charts[chartType]) {
        createChart(chartType);
      }
    }
  });
});

// Crear gráficas
function createChart(type) {
  if (!dataLoaded) return;

  if (type === "migrantes") {
    charts[type] = new Chart(
      document.getElementById("chartMigrantes"),
      {
        type: "line",
        data: {
          labels: dataLoaded.migrantes.labels,
          datasets: [
            {
              data: dataLoaded.migrantes.values,
              borderWidth: 2,
              tension: 0.3
            }
          ]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: false }
          }
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
          datasets: [
            {
              data: dataLoaded.origen.values
            }
          ]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
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
          datasets: [
            {
              data: dataLoaded.riesgos.values
            }
          ]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      }
    );
  }
}
