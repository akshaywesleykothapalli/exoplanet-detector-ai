// ===================================================
// 🪐 ExoPlanet AI Observatory - Apple Style JS
// ===================================================

const API_URL = "/predict";

// Preset Candidates Database
const PRESETS = {
    earth: {
        orbital_period: 365.25,
        planet_radius: 1.0,
        transit_depth: 0.000084,
        transit_duration: 13.0,
        eccentricity: 0.017
    },
    kepler452b: {
        orbital_period: 384.84,
        planet_radius: 1.63,
        transit_depth: 0.00021,
        transit_duration: 10.5,
        eccentricity: 0.03
    },
    trappist1e: {
        orbital_period: 6.10,
        planet_radius: 0.92,
        transit_depth: 0.0048,
        transit_duration: 1.0,
        eccentricity: 0.007
    },
    wasp12b: {
        orbital_period: 1.09,
        planet_radius: 19.0,
        transit_depth: 0.015,
        transit_duration: 3.0,
        eccentricity: 0.0
    },
    binary: {
        orbital_period: 2.4,
        planet_radius: 28.0,
        transit_depth: 0.18,
        transit_duration: 48.0,
        eccentricity: 0.45
    }
};

// ===================================================
// ✨ Starfield Canvas Background
// ===================================================
(function initStarfield() {
    const canvas = document.getElementById("starfield-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const numStars = 60;
    const stars = [];

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.2 + 0.3,
            alpha: Math.random(),
            speed: Math.random() * 0.12 + 0.04,
            twinkleSpeed: Math.random() * 0.015 + 0.004
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.y -= star.speed;
            if (star.y < 0) star.y = height;

            star.alpha += star.twinkleSpeed;
            if (star.alpha > 1 || star.alpha < 0.2) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
            ctx.shadowBlur = star.radius > 1 ? 3 : 0;
            ctx.shadowColor = "#00e5ff";
            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    render();
})();

// ===================================================
// 🧭 Resizable Floating Navbar Scroll & Mobile Logic
// ===================================================
window.addEventListener("scroll", handleNavbarResize);
window.addEventListener("load", handleNavbarResize);

function handleNavbarResize() {
    const navbar = document.getElementById("main-navbar");
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// Navigation links handler (Desktop & Mobile)
document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        navigateToPage(link.dataset.page);
        closeMobileMenu();
    });
});

function navigateToPage(page) {
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(l =>
        l.classList.toggle("active", l.dataset.page === page)
    );
    document.querySelectorAll(".page").forEach(p =>
        p.classList.remove("active")
    );

    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add("active");
    }
}

function navigateToUpload() {
    navigateToPage("upload");
}

// Mobile Menu Toggle
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-nav-menu");

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        const iconMenu = mobileBtn.querySelector(".icon-menu");
        const iconClose = mobileBtn.querySelector(".icon-close");
        if (iconMenu && iconClose) {
            iconMenu.style.display = isOpen ? "none" : "block";
            iconClose.style.display = isOpen ? "block" : "none";
        }
    });
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
        if (mobileBtn) {
            const iconMenu = mobileBtn.querySelector(".icon-menu");
            const iconClose = mobileBtn.querySelector(".icon-close");
            if (iconMenu && iconClose) {
                iconMenu.style.display = "block";
                iconClose.style.display = "none";
            }
        }
    }
}

// ===================================================
// 🌗 Dark / Light Mode Toggle
// ===================================================
(function initTheme() {
    const saved = localStorage.getItem("exo-theme") || "dark";
    applyTheme(saved);
})();

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("exo-theme", theme);
    const iconDark = document.querySelector("#theme-toggle .icon-dark");
    const iconLight = document.querySelector("#theme-toggle .icon-light");
    if (iconDark && iconLight) {
        iconDark.style.display = theme === "dark" ? "block" : "none";
        iconLight.style.display = theme === "light" ? "block" : "none";
    }
    updatePlotlyTheme(theme);
}

function updatePlotlyTheme(theme) {
    const plot = document.getElementById("light-curve-plot");
    if (plot && plot.layout) {
        const fontColor = theme === "light" ? "#475569" : "#94a3b8";
        const titleColor = theme === "light" ? "#0070f3" : "#00e5ff";
        const gridColor = theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)";
        const axisTitleColor = theme === "light" ? "#0f172a" : "#f8fafc";

        Plotly.relayout(plot, {
            "title.font.color": titleColor,
            "xaxis.tickfont.color": fontColor,
            "xaxis.titlefont.color": axisTitleColor,
            "xaxis.gridcolor": gridColor,
            "yaxis.tickfont.color": fontColor,
            "yaxis.titlefont.color": axisTitleColor,
            "yaxis.gridcolor": gridColor
        });
    }
}

const themeToggleBtn = document.getElementById("theme-toggle");
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
    });
}

// ===================================================
// 🔼 Back To Top Button
// ===================================================
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===================================================
// 🔔 Toast Notification System
// ===================================================
function showToast(message, type = "info", duration = 3500) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icons = {
        success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
        toast.classList.remove("show");
        toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    }, duration);
}

// ===================================================
// 📊 Animated Stat Counters
// ===================================================
function animateCounters() {
    const counters = document.querySelectorAll(".stat-number[data-target]");
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";
        const fixedDecimals = counter.dataset.fixed ? parseInt(counter.dataset.fixed) : null;
        const decimalPlaces = counter.dataset.decimal ? parseInt(counter.dataset.decimal) : 0;
        const duration = 1800;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            if (fixedDecimals !== null) {
                counter.textContent = current.toFixed(fixedDecimals) + suffix;
            } else if (decimalPlaces > 0) {
                counter.textContent = current.toFixed(decimalPlaces) + suffix;
            } else {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    });
}

// Trigger counters when stats banner enters viewport
const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.2 });

const statsBanner = document.getElementById("stats-banner");
if (statsBanner) statsObserver.observe(statsBanner);

// ===================================================
// 🖱️ Mouse Parallax Hero
// ===================================================
const heroSphere = document.querySelector(".hero-sphere-wrapper");
if (heroSphere) {
    document.addEventListener("mousemove", e => {
        const activePage = document.querySelector(".page.active");
        if (!activePage || activePage.id !== "home-page") return;

        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        heroSphere.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
    });

    document.addEventListener("mouseleave", () => {
        heroSphere.style.transform = "translate(0, 0)";
    });
}

// ===================================================
// 📜 Prediction History (localStorage)
// ===================================================
function loadHistory() {
    return JSON.parse(localStorage.getItem("exo-history") || "[]");
}

function saveHistory(history) {
    localStorage.setItem("exo-history", JSON.stringify(history.slice(0, 5)));
}

function addToHistory(entry) {
    const history = loadHistory();
    history.unshift(entry);
    saveHistory(history);
    renderHistory();
}

function renderHistory() {
    const history = loadHistory();
    const panel = document.getElementById("history-panel");
    const list = document.getElementById("history-list");
    if (!panel || !list) return;

    if (history.length === 0) {
        panel.style.display = "none";
        return;
    }

    panel.style.display = "block";
    list.innerHTML = history.map(item => `
        <div class="history-item">
            <span class="history-badge ${item.prediction === 1 ? 'confirmed' : 'rejected'}">
                ${item.prediction === 1 ? 'Confirmed' : 'False Positive'}
            </span>
            <span class="history-confidence">${(item.confidence * 100).toFixed(1)}%</span>
            <span class="history-params">P=${item.params[0]}d · R=${item.params[1]}R⊕</span>
            <span class="history-time">${item.time}</span>
        </div>
    `).join("");
}

function clearHistory() {
    localStorage.removeItem("exo-history");
    renderHistory();
}

// Init history on load
renderHistory();

// ===================================================
// 🎡 Confidence Gauge Arc Animation
// ===================================================
function animateGauge(confidencePercent) {
    const arc = document.getElementById("gauge-arc");
    const label = document.getElementById("gauge-label");
    if (!arc || !label) return;

    const totalLength = 173; // half-circle arc length at r=55
    const duration = 900;
    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const drawn = (confidencePercent / 100) * totalLength * eased;
        arc.setAttribute("stroke-dasharray", `${drawn} ${totalLength - drawn}`);
        label.textContent = Math.round(confidencePercent * eased) + "%";

        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ===================================================
// 💀 Skeleton Loader Helpers
// ===================================================
function showSkeleton() {
    const sk = document.getElementById("skeleton-loader");
    const rs = document.getElementById("results-section");
    if (sk) sk.style.display = "block";
    if (rs) rs.style.display = "none";
}

function hideSkeleton() {
    const sk = document.getElementById("skeleton-loader");
    if (sk) sk.style.display = "none";
}

// ===================================================
// ♿ Keyboard Accessibility: Focus Ring & Enter
// ===================================================
document.addEventListener("keydown", e => {
    if (e.key === "Tab") {
        document.body.classList.add("keyboard-nav");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-nav");
});

// ===================================================
// ⚡ Presets Load Logic
// ===================================================
function loadPreset(key) {
    const data = PRESETS[key];
    if (!data) return;

    document.getElementById("orbital_period").value = data.orbital_period;
    document.getElementById("planet_radius").value = data.planet_radius;
    document.getElementById("transit_depth").value = data.transit_depth;
    document.getElementById("transit_duration").value = data.transit_duration;
    document.getElementById("eccentricity").value = data.eccentricity;

    const inputs = document.querySelectorAll(".form-group input");
    inputs.forEach(input => {
        input.style.borderColor = "#00e5ff";
        input.style.boxShadow = "0 0 14px rgba(0, 229, 255, 0.35)";
        setTimeout(() => {
            input.style.borderColor = "";
            input.style.boxShadow = "";
        }, 700);
    });
}

function loadPresetAndNavigate(key) {
    loadPreset(key);
    navigateToUpload();
    setTimeout(() => {
        const form = document.getElementById("prediction-form");
        if (form) {
            form.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, 200);
}

// ===================================================
// 🔭 Form Submit & Analysis
// ===================================================
document.getElementById("prediction-form").addEventListener("submit", async e => {
    e.preventDefault();

    const orbitalPeriodVal = parseFloat(document.getElementById("orbital_period").value);
    const planetRadiusVal = parseFloat(document.getElementById("planet_radius").value);
    const transitDepthVal = parseFloat(document.getElementById("transit_depth").value);
    const transitDurationVal = parseFloat(document.getElementById("transit_duration").value);
    const eccentricityVal = parseFloat(document.getElementById("eccentricity").value);

    const features = [
        orbitalPeriodVal,
        planetRadiusVal,
        transitDepthVal,
        transitDurationVal,
        eccentricityVal
    ];

    const btn = document.querySelector(".analyze-button");
    btn.disabled = true;
    document.querySelector(".button-text").style.display = "none";
    document.querySelector(".button-loading").style.display = "inline";

    const checkAnotherBtn = document.querySelector(".check-another-wrap");
    if (checkAnotherBtn) checkAnotherBtn.style.display = "none";

    showSkeleton();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features })
        });

        const data = await res.json();
        hideSkeleton();

        // Show Results Section
        const resultsSection = document.getElementById("results-section");
        resultsSection.style.display = "block";

        // Result Status Badge
        const status = document.getElementById("result-status");
        if (data.prediction === 1) {
            status.textContent = "Confirmed Exoplanet";
            status.className = "result-status confirmed";
            showToast(`Candidate Confirmed! Confidence: ${(data.confidence * 100).toFixed(1)}%`, "success");
        } else {
            status.textContent = "Not Confirmed (False Positive)";
            status.className = "result-status not-confirmed";
            showToast(`False Positive Signal. Confidence: ${(data.confidence * 100).toFixed(1)}%`, "error");
        }

        // Trigger Gauge Arc Animation
        animateGauge(data.confidence * 100);

        // Add to Local Storage History
        addToHistory({
            prediction: data.prediction,
            confidence: data.confidence,
            params: [orbitalPeriodVal, planetRadiusVal],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        // Upgraded Light Curve Plotting
        const xData = data.plot_data.time;
        const yData = data.plot_data.brightness;

        // Find minimum flux point (mid-transit dip)
        let minY = Math.min(...yData);
        let minIndex = yData.indexOf(minY);
        let minX = xData[minIndex];

        Plotly.newPlot(
            "light-curve-plot",
            [{
                x: [],
                y: [],
                mode: "markers",
                marker: {
                    size: 3.5,
                    color: "#00e5ff",
                    opacity: 0.8
                },
                hovertemplate: "Time: %{x:.2f} hrs<br>Relative Flux: %{y:.6f}<extra></extra>"
            }],
            {
                title: {
                    text: "Stellar Transit Light Curve",
                    font: { color: "#00e5ff", size: 16, family: "Plus Jakarta Sans, Inter, sans-serif" }
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                hovermode: "x unified",
                hoverlabel: {
                    bgcolor: "#0e1526",
                    bordercolor: "#00e5ff",
                    font: { color: "#ffffff", family: "Plus Jakarta Sans, sans-serif" }
                },
                xaxis: {
                    title: "Time (hours)",
                    gridcolor: "rgba(255,255,255,0.06)",
                    zerolinecolor: "rgba(0, 229, 255, 0.2)",
                    tickfont: { color: "#94a3b8", family: "Inter, sans-serif" },
                    titlefont: { color: "#f8fafc", family: "Plus Jakarta Sans, sans-serif" }
                },
                yaxis: {
                    title: "Relative Brightness (Normalized Flux)",
                    gridcolor: "rgba(255,255,255,0.06)",
                    zerolinecolor: "rgba(0, 229, 255, 0.2)",
                    tickfont: { color: "#94a3b8", family: "Inter, sans-serif" },
                    titlefont: { color: "#f8fafc", family: "Plus Jakarta Sans, sans-serif" }
                },
                margin: { t: 50, l: 65, r: 30, b: 50 },
                shapes: [{
                    type: "line",
                    x0: Math.min(...xData),
                    x1: Math.max(...xData),
                    y0: 1.0,
                    y1: 1.0,
                    line: {
                        color: "rgba(255, 255, 255, 0.25)",
                        width: 1,
                        dash: "dash"
                    }
                }]
            },
            { displayModeBar: false, responsive: true }
        );

        let i = 0;
        const speed = 35;

        const drawInterval = setInterval(() => {
            if (i >= xData.length) {
                clearInterval(drawInterval);

                Plotly.restyle("light-curve-plot", { "marker.opacity": 0 }, [0]);

                setTimeout(() => {
                    Plotly.react(
                        "light-curve-plot",
                        [
                            {
                                x: xData,
                                y: yData,
                                mode: "lines",
                                fill: "tozeroy",
                                fillcolor: "rgba(0, 229, 255, 0.06)",
                                line: { color: "#00e5ff", width: 2.5, shape: "spline" },
                                hovertemplate: "Time: %{x:.2f} hrs<br>Relative Flux: %{y:.6f}<extra></extra>"
                            },
                            {
                                x: xData,
                                y: yData,
                                mode: "lines",
                                line: { color: "rgba(0, 229, 255, 0.2)", width: 8, shape: "spline" },
                                hoverinfo: "skip"
                            }
                        ],
                        {
                            title: {
                                text: "Stellar Transit Light Curve",
                                font: { color: "#00e5ff", size: 16, family: "Plus Jakarta Sans, Inter, sans-serif" }
                            },
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            hovermode: "x unified",
                            hoverlabel: {
                                bgcolor: "#0e1526",
                                bordercolor: "#00e5ff",
                                font: { color: "#ffffff", family: "Plus Jakarta Sans, sans-serif" }
                            },
                            xaxis: {
                                title: "Time (hours)",
                                gridcolor: "rgba(255,255,255,0.06)",
                                tickfont: { color: "#94a3b8", family: "Inter, sans-serif" },
                                titlefont: { color: "#f8fafc", family: "Plus Jakarta Sans, sans-serif" }
                            },
                            yaxis: {
                                title: "Relative Brightness (Normalized Flux)",
                                gridcolor: "rgba(255,255,255,0.06)",
                                tickfont: { color: "#94a3b8", family: "Inter, sans-serif" },
                                titlefont: { color: "#f8fafc", family: "Plus Jakarta Sans, sans-serif" }
                            },
                            margin: { t: 50, l: 65, r: 30, b: 50 },
                            shapes: [{
                                type: "line",
                                x0: Math.min(...xData),
                                x1: Math.max(...xData),
                                y0: 1.0,
                                y1: 1.0,
                                line: {
                                    color: "rgba(255, 255, 255, 0.25)",
                                    width: 1,
                                    dash: "dash"
                                }
                            }],
                            annotations: [{
                                x: minX,
                                y: minY,
                                text: "Transit Minimum Dip",
                                showarrow: true,
                                arrowhead: 2,
                                arrowcolor: "#00e5ff",
                                arrowsize: 0.8,
                                font: { color: "#00e5ff", size: 11, family: "Plus Jakarta Sans, sans-serif" },
                                ax: 0,
                                ay: 30
                            }]
                        }
                    );

                    // Feature Importance Panel
                    const explainPanel = document.getElementById("explain-panel");
                    const explainBars = document.getElementById("explain-bars");

                    explainBars.innerHTML = "";
                    explainPanel.style.display = "block";

                    const topFeatures = data.explainability.slice(0, 5);
                    const maxImportance = topFeatures[0].importance;

                    topFeatures.forEach(item => {
                        const wrapper = document.createElement("div");
                        wrapper.style.marginBottom = "14px";

                        wrapper.innerHTML = `
                            <div style="display:flex; justify-content:space-between; margin-bottom: 5px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem;">
                                <span style="color: #f8fafc; font-weight: 500;">${item.feature}</span>
                                <span style="color: #00e5ff; font-weight: 700;">${(item.importance * 100).toFixed(1)}%</span>
                            </div>
                            <div style="
                                height:7px;
                                background:rgba(255, 255, 255, 0.08);
                                border-radius:10px;
                                overflow:hidden;
                            ">
                                <div class="explain-bar" style="
                                    width:0%;
                                    height:100%;
                                    background:linear-gradient(90deg, #0070f3, #00e5ff);
                                    box-shadow:0 0 10px rgba(0, 229, 255, 0.5);
                                    transition: width 0.7s ease;
                                "></div>
                            </div>
                        `;

                        explainBars.appendChild(wrapper);

                        setTimeout(() => {
                            wrapper.querySelector(".explain-bar").style.width =
                                (item.importance / maxImportance) * 100 + "%";
                        }, 100);
                    });

                    explainPanel.scrollIntoView({ behavior: "smooth", block: "start" });

                    if (checkAnotherBtn) {
                        checkAnotherBtn.style.display = "block";
                    }

                    btn.disabled = false;
                    document.querySelector(".button-text").style.display = "inline";
                    document.querySelector(".button-loading").style.display = "none";
                }, 300);

                return;
            }

            Plotly.extendTraces(
                "light-curve-plot",
                { x: [[xData[i]]], y: [[yData[i]]] },
                [0]
            );

            i++;
        }, speed);

    } catch (err) {
        console.error("Prediction Error:", err);
        btn.disabled = false;
        document.querySelector(".button-text").style.display = "inline";
        document.querySelector(".button-loading").style.display = "none";
    }
});


// Footer is now static — no scroll reveal needed

// ===================================================
// 🔽 About Page Reveal Observer
// ===================================================
const revealItems = document.querySelectorAll("#about-page .reveal");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealItems.forEach(el => revealObserver.observe(el));

// ===================================================
// 🔄 Reset Logic
// ===================================================
function resetAndGoToUpload() {
    document.getElementById("orbital_period").value = "";
    document.getElementById("planet_radius").value = "";
    document.getElementById("transit_depth").value = "";
    document.getElementById("transit_duration").value = "";
    document.getElementById("eccentricity").value = "";

    document.getElementById("results-section").style.display = "none";

    const explainPanel = document.getElementById("explain-panel");
    if (explainPanel) explainPanel.style.display = "none";

    const checkAnotherBtn = document.querySelector(".check-another-wrap");
    if (checkAnotherBtn) checkAnotherBtn.style.display = "none";

    navigateToPage("upload");

    setTimeout(() => {
        document.getElementById("prediction-form").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
}
