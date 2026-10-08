(function () {
  const page = document.currentScript.getAttribute("data-page");
  window.PAGE_KEY = page;

  const commonCss = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    "assets/style.css",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  ];

  commonCss.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });

  const pageScripts = {
    js: "assets/js/js-questions.js",
    sql: "assets/js/sql-questions.js",
    form: "assets/js/form-validation-section.js",
  };

  // order matters: jQuery → Bootstrap JS → include-nav (needs jQuery) → page-specific script
  const scriptQueue = [
    "https://code.jquery.com/jquery-3.7.1.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    "assets/js/nav.js",
    "assets/js/hero.js",
    "assets/js/footer.js",
    "assets/js/script.js",
    "assets/js/prefooter.js",
  ];

  if (page == "sql") {
    scriptQueue.push(
      "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js",
    );
  }

  if (pageScripts[page]) {
    scriptQueue.push(pageScripts[page]);
  }

  function loadScript(src, onDone) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = onDone;
    document.head.appendChild(script);
  }

  function loadSequentially(queue) {
    if (!queue.length) return;
    const [next, ...rest] = queue;
    loadScript(next, () => loadSequentially(rest));
  }

  loadSequentially(scriptQueue);
})();
