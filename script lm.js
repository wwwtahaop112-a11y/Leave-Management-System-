import { addLeave, getLeaves, updateLeave } from "./leaveservice.js";

// Toast Notification
window.showToast = (msg) => {
    const t = document.createElement("div");
    t.innerText = msg;
    t.style = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--primary); padding:12px 25px; border-radius:30px; z-index:1000;";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

window.applyLeave = async function() {
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    if(!name || !start || !end) return alert("Fill all dates!");

    await addLeave({ name, type, start, end, status: "Pending" });
    showToast("Application Sent! 🚀");
    setTimeout(() => window.location.href = "index.html", 1500);
};

window.loadHistory = async function() {
    const table = document.getElementById("historyTable");
    const data = await getLeaves();
    table.innerHTML = data.map(l => {
        let badge = l.status === 'Approved' ? 'bg-success' : (l.status === 'Rejected' ? 'bg-danger' : 'bg-warning');
        return `<tr>
            <td>${l.name}</td>
            <td>${l.duration} Days</td>
            <td><span class="badge ${badge}">${l.status}</span></td>
        </tr>`;
    }).join('');
};

window.loadApproval = async function() {
    const table = document.getElementById("approvalTable");
    const data = await getLeaves();
    table.innerHTML = data.filter(l => l.status === "Pending").map(l => `
        <tr>
            <td>${l.name}</td>
            <td>${l.duration} Days</td>
            <td>
                <button onclick="action('${l.id}', 'Approved')" style="background:green; width:45px; margin-right:5px">✔</button>
                <button onclick="action('${l.id}', 'Rejected')" style="background:red; width:45px">✖</button>
            </td>
        </tr>
    `).join('');
};

window.action = async function(id, status) {
    await updateLeave(id, status);
    location.reload();
};