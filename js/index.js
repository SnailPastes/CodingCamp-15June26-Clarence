function updateClock() {
    const now = new Date();

    document.getElementById('timeH1').textContent = now.toLocaleTimeString();
    document.getElementById('dateH3').textContent = now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

//----------------------------------------------------------Timer Functions--------------------------------------------------

const DEFAULT_TIME = 25 * 60;
let timeLeft = DEFAULT_TIME;
let intervalId = null;

const timerDisplay = document.getElementById('timer');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
    if (intervalId !== null) return; 
    document.getElementById('startTimer').classList.add('running');

    intervalId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            return;
        }
        timeLeft--;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    document.getElementById('startTimer').classList.remove('running');
    intervalId = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = document.getElementById('timerNumber').value * 60;
    updateDisplay();
}

function changeTimer(time) {
    timeLeft = time * 60;
}

//--------------------------------------------------------Task Functionalities------------------------------------------

function isDuplicateTask(taskName) {
    return tasks.some(task => task.name.trim().toLowerCase() === taskName.trim().toLowerCase());
}

function loadTasks() {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

let tasks = loadTasks();


function renderTasks() {
    const taskDiv = document.getElementById('taskDiv');
    taskDiv.innerHTML = ''; // clear and rebuild from `tasks` array

    tasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="tasks">
                <input type="checkbox" ${task.done ? 'checked' : ''}>
                <p>${task.name}</p>
            </div>
        `;

        const checkbox = div.querySelector('input');
        checkbox.addEventListener('change', () => {
            tasks[index].done = checkbox.checked;
            saveTasks(tasks);
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'bigBtn';
        delBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks(); // rebuild after removing
        });

        div.appendChild(delBtn);
        taskDiv.appendChild(div);
        div.className = 'task';
    });
}

function addNewTask() {
    const taskField = document.getElementById('taskField');
    const taskName = taskField.value.trim();

    if (!taskName) return;

    if (isDuplicateTask(taskName)) {
        alert('This task already exists!');
        return;
    }

    tasks.push({ name: taskName, done: false });
    saveTasks(tasks);
    renderTasks();

    taskField.value = '';
}

//---------------------------------------------------Link Functionalities------------------------------------------------

function loadLinks() {
    const stored = localStorage.getItem('links');
    return stored ? JSON.parse(stored) : [];
}

function saveLinks(links) {
    localStorage.setItem('links', JSON.stringify(links));
}

let links = loadLinks();

function renderLinks() {
    const linkDiv = document.getElementById('linkDiv');
    linkDiv.innerHTML = '';

    links.forEach((linkObj, index) => {
        const div = document.createElement('div');
        const a = document.createElement('a');

        a.textContent = linkObj.name;
        a.href = linkObj.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';

        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.className = 'linkDel';
        delBtn.addEventListener('click', () => {
            links.splice(index, 1);
            saveLinks(links);
            renderLinks();
        });

        div.appendChild(a);
        div.appendChild(delBtn);
        div.className = 'link';
        linkDiv.appendChild(div);
    });
}

function addNewLink() {
    const linkField = document.getElementById('linkField');
    const urlField = document.getElementById('urlField');

    const linkName = linkField.value.trim();
    const url = urlField.value.trim();

    if (!linkName || !url) return;

    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    links.push({ name: linkName, url: fullUrl });
    saveLinks(links);
    renderLinks();

    linkField.value = '';
    urlField.value = '';
}


//--------------------------------------------------------------------Name Functions-------------------------------------------------------

function changeName() {
    const name = document.getElementById('nameField').value;
    if (!name) return;

    localStorage.setItem('username', name);
}


//---------------------------------------------------------------On Reload functions-------------------------------------------------------

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeToggle').textContent = '☀️ Light';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeToggle').textContent = '🌙 Dark';
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    updateClock();
    setInterval(updateClock, 1000);

    updateDisplay();

    document.getElementById('startTimer').addEventListener('click', startTimer);
    document.getElementById('stopTimer').addEventListener('click', stopTimer);
    document.getElementById('resetTimer').addEventListener('click', resetTimer);
    document.getElementById('timerNumber').addEventListener('input', () => {
        stopTimer();
        const timer = document.getElementById('timerNumber').value;
        changeTimer(timer);
        updateDisplay();
    })

    if(localStorage.getItem('username')){
        const name = localStorage.getItem('username');
        document.getElementById('greeting').textContent = `Good Morning, ${localStorage.getItem('username')}`
    }

    document.getElementById('nameBtn').addEventListener('click', () => {
        changeName();
        window.location.reload();
    })


    document.getElementById('addTask').addEventListener('click', () => {
        addNewTask();
    })

    renderTasks();

    document.getElementById('linkBtn').addEventListener('click', () => {
        addNewLink();
    })
    renderLinks();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
    });
})