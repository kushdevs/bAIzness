/**
 * bAIzness Main Application Controller
 */

// Global State
const state = {
    currentView: 'dashboard',
    theme: 'dark',
    businessData: {
        name: 'EcoPack Solutions',
        industry: 'CleanTech / Sustainability',
        score: 82,
        stage: 'Early Research'
    }
};

// Navigation Controller
function navigateTo(viewId) {
    state.currentView = viewId;
    
    // Hide all view panels
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.add('hidden');
    });

    // Deactivate side nav styling
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show target view
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.classList.remove('hidden');
    }

    // Update Header Title
    const titleMap = {
        'dashboard': 'Dashboard Overview',
        'onboarding': 'Idea Generator',
        'results': 'Evaluation Matrix',
        'suggestions': 'AI Recommendations',
        'business-plan': 'Generated Business Plan',
        'market': 'Market Analysis',
        'settings': 'Settings'
    };
    
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) pageTitle.textContent = titleMap[viewId] || 'Workspace';

    // Re-render charts if entering dashboard
    if (viewId === 'dashboard') {
        initCharts();
    }
}

// Simulated Form Handling & AI Engine Sequence
function handleFormSubmit(e) {
    e.preventDefault();
    const ideaInput = document.getElementById('input-idea').value;
    
    if (!ideaInput) return;

    state.businessData.name = ideaInput.split(' ')[0] + " Tech";
    
    // Step 1: Switch to Loading View
    navigateTo('loading');

    const statuses = [
        "Analyzing market demand & target size...",
        "Identifying direct incumbents...",
        "Structuring 5-year unit financial models...",
        "Finalizing strategic blueprint..."
    ];

    let step = 0;
    const statusElem = document.getElementById('loading-status');
    
    const interval = setInterval(() => {
        if (step < statuses.length) {
            statusElem.textContent = statuses[step];
            step++;
        } else {
            clearInterval(interval);
            // Update Dashboard Text
            document.getElementById('active-business-name').textContent = state.businessData.name;
            navigateTo('results');
            showToast('AI Blueprint Generated Successfully!', 'success');
        }
    }, 900);
}

// Chart.js Integrations
let growthChart, marketChart;

function initCharts() {
    const ctx1 = document.getElementById('chart-growth');
    const ctx2 = document.getElementById('chart-market');

    if (!ctx1 || !ctx2) return;

    if (growthChart) growthChart.destroy();
    if (marketChart) marketChart.destroy();

    growthChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Revenue Growth',
                data: [0.2, 0.8, 2.4, 5.1, 11.2],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });

    marketChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Obtainable Market', 'Rest of TAM'],
            datasets: [{
                data: [18, 82],
                backgroundColor: ['#a855f7', 'rgba(255,255,255,0.05)'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

// Toast Notifications System
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-100 shadow-2xl flex items-center gap-3 transition-all transform translate-y-2 opacity-0 pointer-events-auto`;
    toast.innerHTML = `<span class="w-2 h-2 rounded-full bg-indigo-400"></span> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    showToast(`Switched to ${next} theme`, 'info');
}

// Initialize default state
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});