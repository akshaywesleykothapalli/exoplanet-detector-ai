// ============================
// 🌌 Exoplanet Detection AI
// ============================

// ✅ SAME-ORIGIN API (Flask safe)
const API_URL = "/predict";

// ============================
// 🧭 Navigation
// ============================
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        navigateToPage(link.dataset.page);
    });
});

function navigateToPage(page) {
    document.querySelectorAll(".nav-link").forEach(l =>
        l.classList.toggle("active", l.dataset.page === page)
    );
    document.querySelectorAll(".page").forEach(p =>
        p.classList.remove("active")
    );
    document.getElementById(`${page}-page`).classList.add("active");
}

function navigateToUpload() {
    navigateToPage("upload");
}

// ============================
// 🔭 Form Submit
// ============================
document.getElementById("prediction-form").addEventListener("submit", async e => {
    e.preventDefault();

    const features = [
        parseFloat(orbital_period.value),
        parseFloat(planet_radius.value),
        parseFloat(transit_depth.value),
        parseFloat(transit_duration.value),
        parseFloat(eccentricity.value)
    ];

    const btn = document.querySelector(".analyze-button");
    btn.disabled = true;
    document.querySelector(".button-text").style.display = "none";
    document.querySelector(".button-loading").style.display = "inline";

    // Hide Check Another at start (safety)
    const checkAnotherBtn = document.querySelector(".check-another-wrap");
    if (checkAnotherBtn) checkAnotherBtn.style.display = "none";

    // ============================
    // 🔗 Backend Call
    // ============================
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features })
    });

    const data = await res.json();

    // ============================
    // 📊 Show Results Section
    // ============================
    const resultsSection = document.getElementById("results-section");
    resultsSection.style.display = "block";

    // ============================
    // 🧪 Prediction + Confidence
    // ============================
    const status = document.getElementById("result-status");
    status.textContent =
        data.prediction === 1 ? "Confirmed Planet" : "Not Confirmed";

    status.className =
        "result-status " +
        (data.prediction === 1 ? "confirmed" : "not-confirmed");

    document.getElementById("confidence-value").textContent =
        (data.confidence * 100).toFixed(1) + "%";

    // ============================
    // 📈 TRUE DRAW ANIMATION (NO SLIDE)
    // ============================
    const xData = data.plot_data.time;
    const yData = data.plot_data.brightness;

    // Phase 1: Draw POINTS
    Plotly.newPlot(
        "light-curve-plot",
        [{
            x: [],
            y: [],
            mode: "markers",
            marker: {
                size: 3,
                color: "#00ffff",
                opacity: 0.5
            }
        }],
        {
            title: {
                text: "Transit Light Curve",
                font: { color: "#00ffff", size: 18 }
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            xaxis: {
                title: "Time (hours)",
                gridcolor: "rgba(0,255,255,0.15)",
                tickfont: { color: "#cfffff" }
            },
            yaxis: {
                title: "Relative Brightness",
                gridcolor: "rgba(0,255,255,0.15)",
                tickfont: { color: "#cfffff" }
            },
            margin: { t: 50, l: 60, r: 30, b: 50 }
        },
        { displayModeBar: false }
    );

    let i = 0;
    const speed = 45;

    const drawInterval = setInterval(() => {
        if (i >= xData.length) {
            clearInterval(drawInterval);

            // ============================
            // ✨ Fade dots out
            // ============================
            Plotly.restyle(
                "light-curve-plot",
                { "marker.opacity": 0 },
                [0]
            );

            // ============================
            // 🌟 Replace with glow line
            // ============================
            setTimeout(() => {
                Plotly.react(
                    "light-curve-plot",
                    [
                        {
                            x: xData,
                            y: yData,
                            mode: "lines",
                            line: { color: "#00ffff", width: 3 }
                        },
                        {
                            x: xData,
                            y: yData,
                            mode: "lines",
                            line: {
                                color: "rgba(0,255,255,0.25)",
                                width: 10
                            },
                            hoverinfo: "skip"
                        }
                    ],
                    Plotly.d3
                        .select("#light-curve-plot")
                        .node().layout
                );

                // ============================
                // 🧠 Explainability Panel
                // ============================
                const explainPanel =
                    document.getElementById("explain-panel");
                const explainBars =
                    document.getElementById("explain-bars");

                explainBars.innerHTML = "";
                explainPanel.style.display = "block";

                const topFeatures =
                    data.explainability.slice(0, 5);
                const maxImportance =
                    topFeatures[0].importance;

                topFeatures.forEach(item => {
                    const wrapper =
                        document.createElement("div");
                    wrapper.style.marginBottom = "14px";

                    wrapper.innerHTML = `
                        <div style="display:flex; justify-content:space-between;">
                            <span>${item.feature}</span>
                            <span>${(item.importance * 100).toFixed(1)}%</span>
                        </div>
                        <div style="
                            height:8px;
                            background:rgba(255,255,255,0.12);
                            border-radius:6px;
                            overflow:hidden;
                            margin-top:4px;
                        ">
                            <div class="explain-bar" style="
                                width:0%;
                                height:100%;
                                background:linear-gradient(90deg,#00ffff,#7f00ff);
                                box-shadow:0 0 12px rgba(0,255,255,0.7);
                            "></div>
                        </div>
                    `;

                    explainBars.appendChild(wrapper);

                    setTimeout(() => {
                        wrapper.querySelector(".explain-bar").style.width =
                            (item.importance / maxImportance) * 100 + "%";
                    }, 100);
                });

                // ============================
                // 📜 Smooth Scroll (ONCE)
                // ============================
                explainPanel.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // ============================
                // 🔄 Show "Check Another" button
                // ============================
                const checkAnother =
                    document.querySelector(".check-another-wrap");
                if (checkAnother) {
                    checkAnother.style.display = "block";
                }

                // ============================
                // 🔓 Re-enable Button
                // ============================
                btn.disabled = false;
                document.querySelector(".button-text").style.display = "inline";
                document.querySelector(".button-loading").style.display = "none";
            }, 400);

            return;
        }

        Plotly.extendTraces(
            "light-curve-plot",
            {
                x: [[xData[i]]],
                y: [[yData[i]]]
            },
            [0]
        );

        i++;
    }, speed);
});

// ============================
// 🔻 Footer Peek → Reveal Logic
// ============================
function handleFooterReveal() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight - 100) {
        document.body.classList.add("scrolled-footer");
    } else {
        document.body.classList.remove("scrolled-footer");
    }
}

window.addEventListener("scroll", handleFooterReveal);
window.addEventListener("load", handleFooterReveal);

// ============================
// 🔽 About Page Scroll Reveal
// ============================
const revealItems = document.querySelectorAll("#about-page .reveal");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => revealObserver.observe(el));

// ============================
// 🔄 Reset & Go To Upload
// ============================
function resetAndGoToUpload() {
    orbital_period.value = "";
    planet_radius.value = "";
    transit_depth.value = "";
    transit_duration.value = "";
    eccentricity.value = "";

    document.getElementById("results-section").style.display = "none";

    const explainPanel = document.getElementById("explain-panel");
    if (explainPanel) explainPanel.style.display = "none";

    const checkAnother =
        document.querySelector(".check-another-wrap");
    if (checkAnother) checkAnother.style.display = "none";

    navigateToPage("upload");

    setTimeout(() => {
        document
            .getElementById("prediction-form")
            .scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
}
