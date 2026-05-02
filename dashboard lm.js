import { getLeaves, updateLeave } from "./leavesService.js";

window.initApp = async function() {
    const data = await getLeaves();
    updateCounts(data);
    renderCharts(data);

    // Admin Toggle Feature
    document.getElementById("adminToggle").onclick = () => {
        const portal = document.getElementById("adminPortal");
        portal.style.display = portal.style.display === "none" ? "block" : "none";
        loadAdminRequests(data);
    };
};

function updateCounts(data) {
    document.getElementById("countApplied").innerText = data.length;
    document.getElementById("countPending").innerText = data.filter(l => l.status === "Pending").length;
    document.getElementById("countApproved").innerText = data.filter(l => l.status === "Approved").length;
}

// Manual Requirement 3: Approval Process UI
function loadAdminRequests(data) {
    const list = document.getElementById("pendingList");
    const pending = data.filter(l => l.status === "Pending");

    list.innerHTML = pending.length ? pending.map(l => `
        <div class="request-item">
            <p><b>${l.name}</b> (${l.empId}) - ${l.type}</p>
            <div class="btns">
                <button onclick="handleAction('${l.id}', 'Approved')" class="btn-ok">Approve</button>
                <button onclick="handleAction('${l.id}', 'Rejected')" class="btn-no">Reject</button>
            </div>
        </div>
    `).join('') : "<p>No pending tasks.</p>";
}

window.handleAction = async (id, status) => {
    await updateLeave(id, status);
    location.reload();
};

function renderCharts(data) {
    const ctx = document.getElementById('typeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Sick', 'Casual', 'Annual'],
            datasets: [{
                data: [
                    data.filter(l => l.type === "Sick Leave").length || 1,
                    data.filter(l => l.type === "Casual Leave").length || 1,
                    data.filter(l => l.type === "Annual Leave").length || 0
                ],
                backgroundColor: ['#00f2fe', '#f093fb', '#f5576c']
            }]
        },
        options: { cutout: '80%', plugins: { legend: { labels: { color: 'white' } } } }
    });
}