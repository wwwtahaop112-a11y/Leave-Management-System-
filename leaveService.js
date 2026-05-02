export async function addLeave(data) {
    let leaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    
    // Auto Duration Calculation
    const start = new Date(data.start);
    const end = new Date(data.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    leaves.push({ id: Date.now(), ...data, duration: diffDays });
    localStorage.setItem("leaves", JSON.stringify(leaves));
}

export async function getLeaves() {
    return JSON.parse(localStorage.getItem("leaves") || "[]");
}

export async function updateLeave(id, status) {
    let leaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    let index = leaves.findIndex(l => l.id == id);
    if (index !== -1) {
        leaves[index].status = status;
        localStorage.setItem("leaves", JSON.stringify(leaves));
    }
}

// Download Report Logic
window.downloadReport = function() {
    const data = localStorage.getItem("leaves") || "[]";
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Taha_Leave_Report.json';
    a.click();
}
