// let account = null;
let state = Object.freeze({
    account: null
});

const storageKey = 'savedAccount';
const routes = {
    '/login': {templateId: 'login'},
    '/dashboard': {templateId: 'dashboard', init: refresh},
    '/credits': {templateId: 'credits'},
};
// d
function createTransactionRow(transaction) {
    const template = document.getElementById('transaction');
    const transactionRow = template.content.cloneNode(true);
    const tr = transactionRow.querySelector('tr');
    tr.children[0].textContent = transaction.date;
    tr.children[1].textContent = transaction.object;
    tr.children[2].textContent = transaction.amount.toFixed(2);
    return transactionRow;
}

function updateElement(id, textOrNode) {
    const element = document.getElementById(id);
    element.textContent = ''; // Removes all children
    element.append(textOrNode);
}

document.querySelectorAll(".click-link").forEach(link => {
    link.addEventListener('click', evt => onLinkClick(evt))
})

function updateState(property, newData) {
    state = Object.freeze({
        ...state,
        [property]: newData
    });
    localStorage.setItem(storageKey, JSON.stringify(state.account));
}

//
// function updateDashboard() {
//     const transactionsRows = document.createDocumentFragment();
//     for (const transaction of account.transactions) {
//         const transactionRow = createTransactionRow(transaction);
//         transactionsRows.appendChild(transactionRow);
//     }
//     updateElement('transactions', transactionsRows);
// }

function updateDashboard() {
    const account = state.account;
    if (!account) {
        return logout();
    }

    updateElement('description', account.description);
    updateElement('balance', account.balance.toFixed(2));
    updateElement('currency', account.currency);

    const transactionsRows = document.createDocumentFragment();
    for (const transaction of account.transactions) {
        const transactionRow = createTransactionRow(transaction);
        transactionsRows.appendChild(transactionRow);
    }
    updateElement('transactions', transactionsRows);
}

async function login() {
    const loginForm = document.getElementById('loginForm')
    const user = loginForm.user.value;
    const data = await getAccount(user)

    if (data.error) {
        // alert(`an error occurred : ${data.error}`);
        // return console.log('loginError', data.error);
        return updateElement('loginError', data.error);
    }

    // account = data;
    // state.account = data
    updateState('account', data);
    navigate('/dashboard');
    updateDashboard();
}

async function getAccount(user) {
    try {
        const response = await fetch('//localhost:5000/api/accounts/' +
            encodeURIComponent(user));
        return await response.json();
    } catch (error) {
        return {error: error.message || 'Unknown error'};
    }
}

async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    const result = await createAccount(jsonData)
    if (result.error) {
        // alert(`an error occurred : ${result}`);
        // return console.log('An error occurred:', result.error);

        return updateElement('registration error: ', data.error);
    }
    // console.log('Account created!', result);
    // alert(`account created : ${result.user}`);

    // account = result;
    // state.account = data
    updateState('account', result);
    navigate('/dashboard');
}

function logout() {
    updateState('account', null);
    navigate('/login');
}

async function createAccount(account) {
    try {
        const response = await fetch('//localhost:5000/api/accounts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: account
        });
        return await response.json();
    } catch (error) {
        return {error: error.message || 'Unknown error'};
    }
}


function updateTitle(templateId) {
    switch (templateId) {
        case 'dashboard':
            document.title = "Dashboard"
            console.log("dashboard is shown")
            break
        case 'login':
            document.title = "Login"
            break
        case 'credits':
            document.title = "Credits"
            break
        default:
            document.title = "Login"
    }

}

function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];
    if (!route) {
        return navigate('/dashboard');
    }
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
    updateTitle(route.templateId)

    if (typeof route.init === 'function') {
        route.init();
    }

}

async function updateAccountData() {
    const account = state.account;
    if (!account) {
        return logout();
    }

    const data = await getAccount(account.user);
    if (data.error) {
        return logout();
    }

    updateState('account', data);
}

function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
    console.log(event.target.href)
}

async function refresh() {
    await updateAccountData();
    updateDashboard();
}

function navigate(path) {
    window.history.pushState({}, path, path);
    updateRoute();
}

function init() {
    const savedAccount = localStorage.getItem(storageKey);
    if (savedAccount) {
        updateState('account', JSON.parse(savedAccount));
    }
    window.onpopstate = () => updateRoute();
    updateRoute()
}


init()






