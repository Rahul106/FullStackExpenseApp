let form = document.getElementById('addExpenseForm');
let imgInput = document.querySelector('.img');
let imgFile = document.getElementById('i_imgInput');
let expNum = document.getElementById('i_expNum');
let expName = document.getElementById('i_expName');
let expAmt = document.getElementById('i_expAmount');
let expDate = document.getElementById('i_expDate');
let submitBtn = document.querySelector('.submit');
let expData = document.getElementById('expenseData');
let modal = document.getElementById('addExpenseForm');
let modalTitle = document.querySelector('#addExpenseForm .modal-title');
let newExpenseBtn = document.querySelector('.newExpense');

console.log('Form' + form);
console.log('ImageInput' + imgInput);
console.log('File : ' + imgFile);
console.log('UserName : ' + expNum + expName + expAmt + expDate);
console.log('Submit : ' + submitBtn);
console.log('ExpenseData : ' + expData);
console.log('Modal : ' + modal);
console.log('ModalTitle : ' + modalTitle);
console.log('UserButton : ' + newExpenseBtn);

//let getData = localStorage.getItem('expenseProfile') ? JSON.parse(localStorage.getItem('expenseProfile')) : [];
let isEdit = false;
let editId = 0;


newExpenseBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit'
    modalTitle.innerText = 'Fill The Expense-Form ...'
    isEdit = false
    imgInput.src = '/images/Profile Icon.webp'
});


imgFile.onchange = function () {
    if (imgFile.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(imgFile.files[0])
    } else {
        alert('This file is too large!')
    }
}


async function showExpenseInfo() {

    const responseExpenses = await axios.get('http://localhost:3000/expense/fetch-allexpenses');

    //document.querySelectorAll(responseExpenses.data).forEach(info => info.remove())
    responseExpenses.data.forEach((element, index) => {

        // Convert UTC date string to Date object
        const date = new Date(element.exp_date);
        // Format the date as YYYY-MM-DD
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        let createElement = `<tr class='expenseDetail'>
            <td data-title="S.No">${index + 1}</td>
            <td data-title="Expense Picture"><img src='${element.exp_img}' alt='' width='50' height='50'></td>
            <td data-title="Expense Number">${element.exp_number}</td>
            <td data-title="Expense Name">${element.exp_name}</td>
            <td data-title="Expense Amount">${element.exp_amount}</td>
            <td data-title="Expense Date">${formattedDate}</td>

            <td data-title="Action">
                <button class='btn btn-success' onclick="readInfo('${element.exp_img}', '${element.exp_number}', '${element.exp_name}', '${element.exp_amount}', '${formattedDate}')" data-bs-toggle='modal' data-bs-target='#readData'><i class='bi bi-eye'></i></button>
                <button class='btn btn-primary' onclick="editInfo(${element.exp_id}, '${element.exp_img}', '${element.exp_number}', '${element.exp_name}', '${element.exp_amount}', '${formattedDate}')" data-bs-toggle='modal' data-bs-target='#addExpenseForm'><i class='bi bi-pencil-square'></i></button>
                <button class='btn btn-danger' onclick='deleteInfo(${element.exp_id})'><i class='bi bi-trash'></i></button>
            </td>
        </tr>`

        expData.innerHTML += createElement;
    });

}


function readInfo(ePic, eNum, eName, eAmt, eDate) {
    document.querySelector('.n_showImg').src = ePic,
        document.querySelector('#i_show_expNum').value = eNum,
        document.querySelector('#i_show_expName').value = eName,
        document.querySelector('#i_show_expAmount').value = eAmt,
        document.querySelector('#i_show_expDate').value = eDate
}


function editInfo(index, ePic, eNum, eName, eAmt, eDate) {
    isEdit = true,
        editId = index,
        imgInput.src = ePic,
        expNum.value = eNum,
        expName.value = eName,
        expAmt.value = eAmt,
        expDate.value = eDate

    submitBtn.innerText = 'Update'
    modalTitle.innerText = '#Update The Form!!!'
}


async function deleteInfo(index) {
    //alert(index);

    try {

        if (confirm('Are you sure want to delete?')) {

            // Implement delete functionality
            console.log('Deleting user with ID: ${index}');
            const response = await axios.delete(`http://localhost:3000/expense/delete-expense/${index}`);

            location.reload();
        }

        if (response.status === 200) {
            alert('User successfully deleted');
            // Optionally, provide feedback to the user interface
            // Reload the page to reflect the changes
            location.reload();
        } else {
            alert('Failed to delete user');
            // Optionally, handle the failure or provide feedback to the user interface
        }
    } catch (err) {
        console.error(`Error deleting user: ${err}`);
        // Optionally, handle the error or provide feedback to the user interface
    }

}


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);
    if (imgInput.src === undefined || imgInput.src === '') {
        formData.set('n_imgInput', './image/Profile Icon.webp');
    } else {
        formData.set('n_imgInput', imgInput.src);
    }

    if (!isEdit) {

        try {

            const resp = await axios.post('http://localhost:3000/expense/insert-expense', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (resp.status === 201) {
                alert('Expense added successfully');
                location.reload();

            } else {
                alert('Failed to add expense');
            }

        } catch (error) {
            console.error('Error adding expense: ' + error);
            // Optionally, handle the error or provide feedback to the user interface
        }

    } else {

        try {

            const response = await axios.put(`http://localhost:3000/expense/update-expense/${editId}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response.status === 200) {
                alert('Expense updated successfully');
                location.reload();
            } else {
                alert('Failed to update expense');
            }

        } catch (error) {
            console.error('Error updating expense:' + error);
            // Optionally, handle the error or provide feedback to the user interface
        }

    }

    submitBtn.innerText = 'Submit';
    modalTitle.innerHTML = 'Fill The Form';
    document.getElementById("i_expPaperWorkForm").reset();
    imgInput.src = '/images/Profile Icon.webp';
})


// Function to fetch and display total expense from the backend
async function fetchTotalExpense() {

    try {
        
        const response = await axios.get('http://localhost:3000/expenseadmin/totalexpense'); // Update the URL with your backend endpoint
        const totalExpense = response.data.totalExpense;
        document.getElementById('totalPrice').value = totalExpense;
        //alert(document.getElementById('totalPrice').value);
    
    } catch (error) {
        console.error('Error fetching total expense:', error);
    }

}


// Call the fetchTotalExpense function when the page loads
document.addEventListener('DOMContentLoaded', fetchTotalExpense);

showExpenseInfo();

