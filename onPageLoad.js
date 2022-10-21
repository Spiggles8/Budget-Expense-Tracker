// This JavaScript file handles the first page load and local storage loading in to the tables. 

// imports functions from functions.js
import {deleteBudgetCategory, deleteExpensesItem, deleteIncomeItem, findBudgetCategoryRow, arraySum} from '/functions.js';


// Sets the Budget Table & Delete button display to none until Submit button is pressed.
document.getElementById("budgetTable").style.display = "none";
document.getElementById("deleteBudgetTableButton").style.display = "none";

// Sets the Income Table & Delete button to display none until Submit button is pressed.
document.getElementById("incomeTable").style.display = "none";
document.getElementById("deleteIncomeTableButton").style.display = "none";

// Sets the Expense Table & Delete button to display none until Submit button is pressed.
document.getElementById("expensesTable").style.display = "none";
document.getElementById("deleteExpensesTableButton").style.display = "none";


// Checks if Budget Table is in local storage.
if (localStorage.getItem("localBudgetCategories") !== null) {

    // Retrieves the Budget Table from local storage and sets as an object.
    var localBudgetCategories = JSON.parse(localStorage.getItem("localBudgetCategories"));
    var localBudgetAmount = JSON.parse(localStorage.getItem("localBudgetAmount"));
    var localBudgetAmountLeft = JSON.parse(localStorage.getItem("localBudgetAmountLeft"));
}
else {
    // Creates an empty Budget Table object since one was not found.
    var localBudgetCategories = [];
    var localBudgetAmount = [];
    var localBudgetAmountLeft = [];
    }

// Sets the Budget Table from DOM to an object. 
let budgetTable = document.getElementById("budgetTable");

// Checks to see if there is a budget table in local storage. 
if (localBudgetCategories != '') {

    // Shows the Budget Table & Delete Budget Table button to display data.
    document.getElementById("budgetTable").style.display = "table";
    document.getElementById("deleteBudgetTableButton").style.display = "block";

    
    // Adds in data to the Budget Table from the object from local storage.     
    for (let i = 0; i < (localBudgetCategories.length); i++) {

        let budgetRow = budgetTable.insertRow(budgetTable.rows.length);
        budgetRow.insertCell(0).innerHTML = localBudgetCategories[i];
        budgetRow.insertCell(1).innerHTML = localBudgetAmount[i];
        budgetRow.insertCell(2).innerHTML = localBudgetAmountLeft[i];

        //creates the delete budget row button and inserts in 4th column on budget table.     
        var deleteBudgetRowBttn = document.createElement('button');
        deleteBudgetRowBttn.type = "button";
        deleteBudgetRowBttn.className = "btn btn-danger";
        deleteBudgetRowBttn.textContent = "Delete Category";
        
        // Function for the delete budget row button. 
        deleteBudgetRowBttn.onclick = function () {deleteBudgetCategory(this)};
        budgetRow.insertCell(3).appendChild(deleteBudgetRowBttn);

        // Adds in the budget category list for the expenses form.
        let expensesBudgetCateogory = document.getElementById("expensesBudgetCategory");
        let newOption = document.createElement("option");
        newOption.text = String(localBudgetCategories[i]);
        expensesBudgetCateogory.add(newOption);
    }
}

// Adds the Budget Amount to the Total Budget Cell in the Overview Table. 
if (localBudgetAmount.length > 0) { 
    document.getElementById("totalBudget").innerHTML = arraySum(localBudgetAmount);
}




// Checks if Income Table is in local storage.
if (localStorage.getItem("localIncomeSource") !== null) {

    // Retrieves the Income Table from local storage and sets as an object.
    var localIncomeSource = JSON.parse(localStorage.getItem("localIncomeSource"));
    var localIncomeAmount = JSON.parse(localStorage.getItem("localIncomeAmount"));
}
else {

    // Creates an empty Income Table object since one was not found.
    var localIncomeSource = [];
    var localIncomeAmount = [];
}

// Sets the Expenses Table from DOM to an object. 
let incomeTable = document.getElementById("incomeTable");


// Checks to see if there is an income table in local storage. 
if (localIncomeSource != '') {

    // Shows the Expenses Table & Delete Expenses Table button to display data.
    document.getElementById("incomeTable").style.display = "table";
    document.getElementById("deleteIncomeTableButton").style.display = "block";

    // Adds in data to the expenses Table from the object from local storage.     
    for (let i = 0; i < (localIncomeSource.length); i++) {
        let incomeRow = incomeTable.insertRow(incomeTable.rows.length);
        incomeRow.insertCell(0).innerHTML = localIncomeSource[i];
        incomeRow.insertCell(1).innerHTML = localIncomeAmount[i];

        //creates the delete budget row button and inserts in 4th column on budget table.     
        var deleteIncomeRowBttn = document.createElement('button');
        deleteIncomeRowBttn.type = "button";
        deleteIncomeRowBttn.className = "btn btn-danger";
        deleteIncomeRowBttn.textContent = "Delete Item";
        
        // Function for the delete budget row button. 
        deleteIncomeRowBttn.onclick = function () {deleteIncomeItem(this)};
        incomeRow.insertCell(2).appendChild(deleteIncomeRowBttn);
    }
}

// Adds the Income Amount to the Total Income Cell in the Overview Table. 
if (localIncomeAmount.length > 0) { 
    document.getElementById("totalIncome").innerHTML = arraySum(localIncomeAmount);
}


// Checks if Expenses Table is in local storage.
if (localStorage.getItem("localExpensesName") !== null) {

    // Retrieves the Expenses Table from local storage and sets as an object.
    var localExpensesName = JSON.parse(localStorage.getItem("localExpensesName"));
    var localExpensesAmount = JSON.parse(localStorage.getItem("localExpensesAmount"));
    var localExpensesCategory = JSON.parse(localStorage.getItem("localExpensesCategory"));
}
else {

    // Creates an empty Expenses Table object since one was not found.
    var localExpensesName = [];
    var localExpensesAmount = [];
    var localExpensesCategory = [];
}

// Sets the Expenses Table from DOM to an object. 
let expensesTable = document.getElementById("expensesTable");

// Checks to see if there is a expenses table in local storage. 
if (localExpensesName != '') {

    // Shows the Expenses Table & Delete Expenses Table button to display data.
    document.getElementById("expensesTable").style.display = "table";
    document.getElementById("deleteExpensesTableButton").style.display = "block";

    // Adds in data to the expenses Table from the object from local storage.     
    for (let i = 0; i < (localExpensesName.length); i++) {
        let expensesRow = expensesTable.insertRow(expensesTable.rows.length);
        expensesRow.insertCell(0).innerHTML = localExpensesName[i];
        expensesRow.insertCell(1).innerHTML = localExpensesAmount[i];
        expensesRow.insertCell(2).innerHTML = localExpensesCategory[i];

        //creates the delete budget row button and inserts in 4th column on budget table.     
        var deleteExpensesRowBttn = document.createElement('button');
        deleteExpensesRowBttn.type = "button";
        deleteExpensesRowBttn.className = "btn btn-danger";
        deleteExpensesRowBttn.textContent = "Delete Item";
        
        // Function for the delete budget row button. 
        deleteExpensesRowBttn.onclick = function () {deleteExpensesItem(this)};
        expensesRow.insertCell(3).appendChild(deleteExpensesRowBttn);
    }
}


// Adds the Expenses Amount to the Total Expenses Cell in the Overview Table. 
if (localExpensesAmount.length > 0) { 
    document.getElementById("totalExpenses").innerHTML = arraySum(localExpensesAmount);
}


// This section subtracts the expense amount from the Budget Table Budget Amount Column. 
for (let i = 0; i < (localExpensesName.length) ;i++) {
    let budgetCategoryIndex = findBudgetCategoryRow(budgetTable, localExpensesCategory[i]);
    let budgetAmountLeft = Number(budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML) - Number(localExpensesAmount[i]);
    budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML = budgetAmountLeft;
}


// Calculates the total Balance for the overview table. 
document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;


// Checks if any Budget Category has gone over the limit. 
if (localBudgetAmountLeft.length > 0) {
    for (let i=0; i < (localBudgetAmountLeft.length); i++) {
        if (Number(localBudgetAmountLeft[i]) <= 0) {
            document.getElementById("budgetStatus").innerHTML = "No";
            break;
        }
    }
}