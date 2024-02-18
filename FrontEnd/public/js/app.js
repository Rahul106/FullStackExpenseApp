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

console.log('Form' +form);
console.log('ImageInput' +imgInput);
console.log('File : ' +imgFile);
console.log('UserName : ' +expNum+expName+expAmt+expDate);
console.log('Submit : ' +submitBtn);
console.log('ExpenseData : ' +expData);
console.log('Modal : ' +modal);
console.log('ModalTitle : ' +modalTitle);
console.log('UserButton : ' +newExpenseBtn);

let getData = localStorage.getItem('expenseProfile') ? JSON.parse(localStorage.getItem('expenseProfile')) : [];
let isEdit = false;
let editId = 0;

showExpenseInfo();

newExpenseBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit'
    modalTitle.innerText = 'Fill The Expense-Form ...'
    isEdit = false
    imgInput.src = '.././public/images/Profile Icon.webp'
});


imgFile.onchange = function() {
    if(imgFile.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(imgFile.files[0])
    } else{
        alert('This file is too large!')
    }
}



function showExpenseInfo() {

    document.querySelectorAll('.expenseDetail').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class='expenseDetail'>
            <td data-title="S.No">${index+1}</td>
            <td data-title="Expense Picture"><img src='${element.ePic}' alt='' width='50' height='50'></td>
            <td data-title="Expense Number">${element.eNum}</td>
            <td data-title="Expense Name">${element.eName}</td>
            <td data-title="Expense Amount">${element.eAmt}</td>
            <td data-title="Expense Date">${element.eDate}</td>

            <td data-title="Action">
                <button class='btn btn-success' onclick="readInfo('${element.ePic}', '${element.eNum}', '${element.eName}', '${element.eAmt}', '${element.eDate}')" data-bs-toggle='modal' data-bs-target='#readData'><i class='bi bi-eye'></i></button>
                <button class='btn btn-primary' onclick="editInfo(${index}, '${element.ePic}', '${element.eNum}', '${element.eName}', '${element.eAmt}', '${element.eDate}')" data-bs-toggle='modal' data-bs-target='#addExpenseForm'><i class='bi bi-pencil-square'></i></button>
                <button class='btn btn-danger' onclick='deleteInfo(${index})'><i class='bi bi-trash'></i></button>
            </td>
        </tr>`

        expData.innerHTML += createElement;
    });
}

showExpenseInfo();


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
    expAmt.value =eAmt,
    expDate.value = eDate

    submitBtn.innerText = 'Update'
    modalTitle.innerText = '#Update The Form!!!'
}


function deleteInfo(index){
    if(confirm('Are you sure want to delete?')){
        getData.splice(index, 1)
        localStorage.setItem('expenseProfile', JSON.stringify(getData))
        showExpenseInfo();
		if(getData.length == 0) {
			localStorage.clear();
		}
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const expenseInfo = {
        ePic: imgInput.src == undefined ? '.././public/images/Profile Icon.webp' : imgInput.src,
        eNum: expNum.value,
        eName: expName.value,
        eAmt: expAmt.value,
        eDate: expDate.value
    }

    if(!isEdit){
        getData.push(expenseInfo);
    } else{
        isEdit = false;
        getData[editId] = expenseInfo;
    }

    localStorage.setItem('expenseProfile', JSON.stringify(getData));

    submitBtn.innerText = 'Submit';
    modalTitle.innerHTML = 'Fill The Form';

    showExpenseInfo();
    document.getElementById("i_expPaperWorkForm").reset(); 
   
    imgInput.src = '.././public/images/Profile Icon.webp';  

    // modal.style.display = 'none'
    // document.querySelector('.modal-backdrop').remove()
})
