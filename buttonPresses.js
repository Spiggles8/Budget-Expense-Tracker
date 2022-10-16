// imports functions from functions.js
import {findBudgetCategoryRow, deleteBudgetCategory, deleteBudgetTable} from '/functions.js';

// Retrieves the Budget Table from local storage and sets as an object.
var objBudgetTable = JSON.parse(localStorage.getItem("budgetTable"));

// This listens for the add budget onClick event and puts the info in the table. 
document.getElementById('budgetForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Shows the Budget Table & Delete Budget Table button once budget info has entered. 
    document.getElementById("budgetTable").style.display = "table";
    document.getElementById("deleteBudgetTable").style.display = "block";

    // Assigns budget taable & budget form data. 
    let newBudgetCategory = document.getElementById('budgetCategory').value;
    let newBudgetAmount = document.getElementById('budgetAmount').value;
    let budgetTable = document.getElementById("budgetTable");
    
    
    // Looks to determine if the Budget Category already exists or not. If it exists nothing is done. 
    if (findBudgetCategoryRow(budgetTable, newBudgetCategory) == 0) {
        let budgetRow = budgetTable.insertRow(budgetTable.rows.length);

        // inserts the budget form data in to the cells of the row. 
        budgetRow.insertCell(0).innerHTML = newBudgetCategory;
        budgetRow.insertCell(1).innerHTML = newBudgetAmount;
        budgetRow.insertCell(2).innerHTML = newBudgetAmount;

        //creates the delete budget row button and inserts in 4th column on budget table.     
        var deleteBudgetRowBttn = document.createElement('input');
        deleteBudgetRowBttn.type = "button";
        deleteBudgetRowBttn.className = "btn btn-danger";
        deleteBudgetRowBttn.value = "Delete Category";

        // Function for the delete budget row button. 
        deleteBudgetRowBttn.onclick = function () {deleteBudgetCategory(this)};
        budgetRow.insertCell(3).appendChild(deleteBudgetRowBttn);

        let expensesBudgetCateogory = document.getElementById("expensesBudgetCategory");
        let newOption = document.createElement("option");
        newOption.text = String(newBudgetCategory);
        expensesBudgetCateogory.add(newOption);

        // If Budget Table object is null then create categories. 
        if (objBudgetTable == null) {
            objBudgetTable = [];
            objBudgetTable.budgetCategory = [newBudgetCategory];
            objBudgetTable.budgetAmount = [newBudgetAmount];
            objBudgetTable.budgetAmountLeft = [newBudgetAmount];
        }
        else {
            // Adds in the data to the object Budget Table to be used for local storage. 
            objBudgetTable.budgetCategory.push(newBudgetCategory);
            objBudgetTable.budgetAmount.push(newBudgetAmount);
            objBudgetTable.budgetAmountLeft.push(newBudgetAmount);
        }
    }
    // Saves the budget Table to local storage. 
    localStorage.setItem("budgetTable", JSON.stringify(objBudgetTable));
})


// This takes the expenses form data and listens for the add expense button.
document.getElementById('expensesForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //  
    let expensesTable = document.getElementById("expensesTable");
    let expensesRow = expensesTable.insertRow(expensesTable.rows.length);

    expensesRow.insertCell(0).innerHTML = document.getElementById('expensesName').value;
    let expensesAmount1 = document.getElementById('expensesAmount').value;
    expensesRow.insertCell(1).innerHTML = expensesAmount1;
    let expensesBudgetCategory = document.getElementById('expensesBudgetCategory').value;
    expensesRow.insertCell(2).innerHTML = expensesBudgetCategory;


    let budgetCategoryIndex = findBudgetCategoryRow(budgetTable, expensesBudgetCategory);
    let budgetAmountLeft = Number(budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML) - Number(expensesAmount1);
    budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML = budgetAmountLeft;


    // This function gets the total expense amount. 
    function totalSumOfTable(table) {
        var sumOfExpenses = 0;

        for (var numberOfExpenses = 1; numberOfExpenses < table.rows.length; numberOfExpenses++) {
            sumOfExpenses = sumOfExpenses + Number(table.rows[numberOfExpenses].cells[1].innerHTML);
        }

        return [numberOfExpenses, sumOfExpenses]
    }


    let totalExpenseArray = totalSumOfTable(document.getElementById("expensesTable"));
    let totalExpensesTable = document.getElementById("totalExpensesTable");

    totalExpensesTable.rows[1].cells[0].innerHTML = totalExpenseArray[0] - 1;
    totalExpensesTable.rows[1].cells[1].innerHTML = totalExpenseArray[1];
})

