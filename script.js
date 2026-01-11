let charts = {};
let dataLoaded = null;
const steps = document.querySelectorAll(".step");

// Cargar datos primero
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    dataLoaded = data;
    initScroll(); // 🔥 iniciar solo cuando ya hay datos
  });

// Inicializar scroll y observer
function initScroll() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateStep(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  steps.forEach(step => observer.observe(step));

  // Activar inmediatamente los visibles al cargar
  activateVisibleSteps();
}

// Activar un step
function activateStep(step) {
  step.classList.add("active");

  const chartType = step.dataset.chart;
  if (chartType && !charts[chartType]) {
    createChart(chartType);
  }
}

// Activar los steps visibles al cargar
function activateVisibleSteps() {
  steps.forEach(step => {
    const rect = step.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      activateStep(step);
    }
  });
}

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
          datasets: [{
            data: dataLoaded.migrantes.values,
            borderWidth: 2,
            tension: 0.3
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
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
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
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      }
    );
  }
}

