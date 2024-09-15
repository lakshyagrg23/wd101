let today = new Date();
let maximum = new Date().setFullYear(today.getFullYear() - 18);
let maximumDate = new Date(maximum).toISOString().split('T')[0];
let minimum = new Date().setFullYear(today.getFullYear() - 55);
let minimumDate = new Date(minimum).toISOString().split('T')[0];

document.querySelector('#dob').setAttribute('max', maximumDate);
document.querySelector('#dob').setAttribute('min', minimumDate);


let userForm = document.querySelector('#user-form');

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else{
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const name = entry.name;
        const email = entry.email;
        const password = entry.password;
        const dob = entry.dob;
        const terms = entry.terms;

        const row = `<tr>
                        <td>${name}</td>
                        <td>${email}</td>
                        <td>${password}</td>
                        <td>${dob}</td>
                        <td>${terms}</td>
                    </tr>`;
        return row;
    }).join("\n");

    const table = `
    <style>
        table {
            width: 50%;
            border-collapse: collapse;
            margin-left: auto;
            margin-right: auto;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #ddd;
        }
    </style>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Dob</th>
            <th>Accepted Terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.querySelector('#user-entries');
    details.innerHTML = table;

}




const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const dob = document.querySelector('#dob').value;
    const terms = document.querySelector('#terms').checked;

    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms
    }

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}

userForm.addEventListener('submit', saveUserForm);
displayEntries();