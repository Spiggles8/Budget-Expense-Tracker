// This JavaScript file handles all button presses of the Finance Tracker Website. 

// imports functions from functions.js
import {findBudgetCategoryRow, deleteBudgetCategory, deleteExpensesItem, deleteIncomeItem, arraySum} from '/functions.js';


// Retrieves the local Storage Arrays.
var localBudgetCategories = JSON.parse(localStorage.getItem("localBudgetCategories"));
var localBudgetAmount = JSON.parse(localStorage.getItem("localBudgetAmount"));
var localBudgetAmountLeft = JSON.parse(localStorage.getItem("localBudgetAmountLeft"));
var localIncomeSource = JSON.parse(localStorage.getItem("localIncomeSource"));
var localIncomeAmount = JSON.parse(localStorage.getItem("localIncomeAmount"));
var localExpensesName = JSON.parse(localStorage.getItem("localExpensesName"));
var localExpensesAmount = JSON.parse(localStorage.getItem("localExpensesAmount"));
var localExpensesCategory = JSON.parse(localStorage.getItem("localExpensesCategory"));


// This listens for the add budget onClick event and puts the info in the budget table. 
document.getElementById('budgetForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Form Validation for Budget Category and Budget Amount. 
    let newBudgetCategory = document.getElementById('budgetCategory').value;
    let newBudgetAmount = document.getElementById('budgetAmount').value;
    newBudgetAmount = newBudgetAmount.replace(",", "");
    
    // Checks if newBudgetCategory is a valid name
    if (isNaN(newBudgetCategory) == false) {
        alert("Budget Category must not be just a number");

        // clears data from form entry. 
        document.getElementById('budgetCategory').value = "";
        return;
    }

    // Checks if newBudgetAmount is a valid number.
    if (isNaN(newBudgetAmount) == true) {
        alert("Budget Amount must be a valid number");

        // clears data from form entry. 
        document.getElementById('budgetAmount').value = "";
        return;
    }

    // Makes adjustments based on user input to make it '.XX' at end of newBudgetAmount. 
    if (newBudgetAmount.indexOf(".") == -1) {
        newBudgetAmount = newBudgetAmount + ".00";
    }
    else if (newBudgetAmount.length - newBudgetAmount.indexOf(".") == 2) {
        newBudgetAmount = newBudgetAmount + "0";
    }
    else if(newBudgetAmount.length - newBudgetAmount.indexOf(".") > 3) {
        alert("Budget Amount must be a valid number with up to 2 decimal points");
        document.getElementById('budgetAmount').value = newBudgetAmount.substr(0,(newBudgetAmount.indexOf(".") + 3));
        return;
    }

    // Shows the Budget Table & Delete Budget Table button once budget info has been entered. 
    document.getElementById("budgetTable").style.display = "table";
    document.getElementById("deleteBudgetTableButton").style.display = "block";

    // Assigns budget table & budget form data. 
    let budgetTable = document.getElementById("budgetTable");
    
    // Looks to determine if the Budget Category already exists or not. If it exists nothing is done.
    // In the future there will be an edit option.  
    if (findBudgetCategoryRow(budgetTable, newBudgetCategory) == 0) {
        let budgetRow = budgetTable.insertRow(budgetTable.rows.length);

        // Inserts the budget form data in to the cells of the budget row. 
        budgetRow.insertCell(0).innerHTML = newBudgetCategory;
        budgetRow.insertCell(1).innerHTML = newBudgetAmount;
        budgetRow.insertCell(2).innerHTML = newBudgetAmount;

        // Creates the delete budget row button and inserts in the 4th column on budget table.     
        var deleteBudgetRowBttn = document.createElement('button');
        deleteBudgetRowBttn.type = "button";
        deleteBudgetRowBttn.className = "btn btn-danger";
        deleteBudgetRowBttn.textContent = "Delete Category";

        // Function for the delete budget row button. 
        deleteBudgetRowBttn.onclick = function () {deleteBudgetCategory(this)};
        budgetRow.insertCell(3).appendChild(deleteBudgetRowBttn);

        // Adds the budget category item to the expense form dropdown menu. 
        let expensesBudgetCateogory = document.getElementById("expensesBudgetCategory");
        let newOption = document.createElement("option");
        newOption.text = String(newBudgetCategory);
        expensesBudgetCateogory.add(newOption);

        // If Budget Table object is null then create categories. 
        if (localBudgetCategories == null) {
            localBudgetCategories = [newBudgetCategory];
            localBudgetAmount = [newBudgetAmount];
            localBudgetAmountLeft = [newBudgetAmount];
        }
        else {
            // Adds in the data to the object Budget Table to be used for local storage. 
            localBudgetCategories.push(newBudgetCategory);
            localBudgetAmount.push(newBudgetAmount);
            localBudgetAmountLeft.push(newBudgetAmount);
        }
    }

    // Adds the Budget Amount to the Total Budget Cell in the Overview Table. 
    if (localBudgetAmount.length > 0) { 
        document.getElementById("totalBudget").innerHTML = arraySum(localBudgetAmount);
    }

    // Saves the budget Table data to local storage. 
    localStorage.setItem("localBudgetCategories", JSON.stringify(localBudgetCategories));
    localStorage.setItem("localBudgetAmount", JSON.stringify(localBudgetAmount));
    localStorage.setItem("localBudgetAmountLeft", JSON.stringify(localBudgetAmountLeft));

    // clears data from form entry. 
    document.getElementById('budgetCategory').value = "";
    document.getElementById('budgetAmount').value = "";
})


// Deletes the Budget Table and clears from local storage.  
document.getElementById('deleteBudgetTableButton').addEventListener('click', function() {

    // Alert pop-up to confirm deletion of the entire Budget Table.
    // In the future it will be a proper modal. 
    if (confirm("Please confirm deletion of Budget Table") == true) {
        localStorage.clear("localBudgetCategories");
        localStorage.clear("localBudgetAmount");
        localStorage.clear("localBudgetAmountLeft");

        for (var i = 1; i < document.getElementById('budgetTable').rows.length; i++) {
            document.getElementById('budgetTable').deleteRow(i);
        }
    
        // Deletes all info the from local storage retrieved Budget Table.
        localBudgetCategories = '';
        localBudgetAmount = '';
        localBudgetAmountLeft ='';
    }

    // Sets the Budget Table & Delete button display to none until Submit button is pressed.
    document.getElementById("budgetTable").style.display = "none";
    document.getElementById("deleteBudgetTableButton").style.display = "none";

    // Checks if any Budget Category has gone over the limit. 
    if (localBudgetAmountLeft.length > 0) {
        for (let i=0; i < (localBudgetAmountLeft.length); i++) {
            console.log(localBudgetAmountLeft[i]);
            if (Number(localBudgetAmountLeft[i]) <= 0) {
                document.getElementById("budgetStatus").innerHTML = "No";
                break;
                }
            else {
                document.getElementById("budgetStatus").innerHTML = "Yes";
                }
            }
        }
})



// This takes the expenses form data and listens for the add expense button.
document.getElementById('incomeForm').addEventListener('submit', function (event) {
    event.preventDefault();
 
    // Shows the Expenses Table & Delete Expenses Table button once budget info has entered. 
    document.getElementById("incomeTable").style.display = "table";
    document.getElementById("deleteIncomeTableButton").style.display = "block";

    // Assigns values from the income form and enters in income table. 
    let incomeSource = document.getElementById('incomeSource').value;
    let incomeAmount = document.getElementById('incomeAmount').value;
    let incomeTable = document.getElementById("incomeTable");
    incomeAmount = incomeAmount.replace(",", "");
    
    // Checks if newBudgetCategory is a valid name
    if (isNaN(incomeSource) == false) {
        alert("Income Source must not be just a number");

        // clears data from form entry. 
        document.getElementById('incomeSource').value = "";
        return;
    }

    // Checks if newBudgetAmount is a valid number.
    if (isNaN(incomeAmount) == true) {
        alert("Income Amount must be a valid number");

        // clears data from form entry. 
        document.getElementById('incomeAmount').value = "";
        return;
    }

    // Makes adjustments based on user input to make it '.XX' at end of newBudgetAmount. 
    if (incomeAmount.indexOf(".") == -1) {
        incomeAmount = incomeAmount + ".00";
    }
    else if (incomeAmount.length - incomeAmount.indexOf(".") == 2) {
        incomeAmount = incomeAmount + "0";
    }
    else if(incomeAmount.length - incomeAmount.indexOf(".") > 3) {
        alert("Income Amount must be a valid number with up to 2 decimal points");
        document.getElementById('incomeAmount').value = incomeAmount.substr(0,(incomeAmount.indexOf(".") + 3));
        return;
    }


    let incomeRow = incomeTable.insertRow(incomeTable.rows.length);
    incomeRow.insertCell(0).innerHTML = incomeSource;
    incomeRow.insertCell(1).innerHTML = incomeAmount;

    // Creates the delete budget row button and inserts in 3rd column on the income table.     
    var deleteIncomeRowBttn = document.createElement('button');
    deleteIncomeRowBttn.type = "button";
    deleteIncomeRowBttn.className = "btn btn-danger";
    deleteIncomeRowBttn.textContent = "Delete Item";

    // Function for the delete budget row button. 
    deleteIncomeRowBttn.onclick = function () {deleteIncomeItem(this)};
    incomeRow.insertCell(2).appendChild(deleteIncomeRowBttn);

    // Adds income values to the array to be used to update the local storage variables. 
    if (localIncomeSource == null) {
        localIncomeSource = [incomeSource];
        localIncomeAmount = [incomeAmount];
    }
    else {
        // Adds in the data to the object Budget Table to be used for local storage. 
        localIncomeSource.push(incomeSource);
        localIncomeAmount.push(incomeAmount);
    }

    // Sets the income arrays to local storage. 
    localStorage.setItem("localIncomeSource", JSON.stringify(localIncomeSource));
    localStorage.setItem("localIncomeAmount", JSON.stringify(localIncomeAmount));

    // Clears data from the form entry 
    document.getElementById('incomeSource').value = "";
    document.getElementById('incomeAmount').value = "";

    // Adds the Income Amount to the Total Income Cell in the Overview Table. 
    if (localIncomeAmount.length > 0) { 
        document.getElementById("totalIncome").innerHTML = arraySum(localIncomeAmount);
    }

    // Calculates the total Balance for the overview table. 
    document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;
})

// Deletes the Income Table and clears from local storage.  
document.getElementById('deleteIncomeTableButton').addEventListener('click', function() {

    // Alert pop-up to confirm deletion of the entire Expenses Table.
    if (confirm("Please confirm deletion of Income Table") == true) {
        localStorage.clear("localIncomeSource");
        localStorage.clear("localIncomeAmount");

        // Deletes table rows of income table. 
        for (var i = 1; i < document.getElementById('incomeTable').rows.length; i++) {
            document.getElementById('incomeTable').deleteRow(i);
        }
    
        // Deletes all info from local storage retrieved Expenses Table.
        localIncomeSource = '';
        localIncomeAmount = '';
    }

    // Sets the Income Table & Delete button display to none until Submit button is pressed.
    document.getElementById("incomeTable").style.display = "none";
    document.getElementById("deleteIncomeTableButton").style.display = "none";

    // Adds the Income Amount to the Total Income Cell in the Overview Table. 
    document.getElementById("totalIncome").innerHTML = 0.00;

    // Calculates the total Balance for the overview table. 
    document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;
})





// This takes the expenses form data and listens for the add expense button.
document.getElementById('expensesForm').addEventListener('submit', function (event) {
    event.preventDefault();
 
    // Shows the Expenses Table & Delete Expenses Table button once budget info has entered. 
    document.getElementById("expensesTable").style.display = "table";
    document.getElementById("deleteExpensesTableButton").style.display = "block";

    // Sets the expense table to variables.
    let expensesTable = document.getElementById("expensesTable");
    let expensesRow = expensesTable.insertRow(expensesTable.rows.length);

    // Assigns form data to variables. 
    let expensesName = document.getElementById('expensesName').value;
    let expensesAmount = document.getElementById('expensesAmount').value;
    let expensesBudgetCategory = document.getElementById('expensesBudgetCategory').value;
    expensesAmount = expensesAmount.replace(",", "");
    
    // Checks if newBudgetCategory is a valid name
    if (isNaN(expensesName) == false) {
        alert("Expenses Name must not be just a number");

        // clears data from form entry. 
        document.getElementById('expensesName').value = "";
        return;
    }

    // Checks if newBudgetAmount is a valid number.
    if (isNaN(expensesAmount) == true) {
        alert("Expenses Amount must be a valid number");

        // clears data from form entry. 
        document.getElementById('expensesAmount').value = "";
        return;
    }

    // Makes adjustments based on user input to make it '.XX' at end of newBudgetAmount. 
    if (expensesAmount.indexOf(".") == -1) {
        expensesAmount = expensesAmount + ".00";
    }
    else if (expensesAmount.length - expensesAmount.indexOf(".") == 2) {
        expensesAmount = expensesAmount + "0";
    }
    else if(expensesAmount.length - expensesAmount.indexOf(".") > 3) {
        alert("Income Amount must be a valid number with up to 2 decimal points");
        document.getElementById('expensesAmount').value = expensesAmount.substr(0,(expensesAmount.indexOf(".") + 3));
        return;
    }

    // Inserts form data in to expense table. 
    expensesRow.insertCell(0).innerHTML = expensesName;
    expensesRow.insertCell(1).innerHTML = expensesAmount;
    expensesRow.insertCell(2).innerHTML = expensesBudgetCategory;

    // Creates the delete budget row button and inserts in 4th column on budget table.     
    var deleteExpensesRowBttn = document.createElement('button');
    deleteExpensesRowBttn.type = "button";
    deleteExpensesRowBttn.className = "btn btn-danger";
    deleteExpensesRowBttn.textContent = "Delete Item";

    // Function for the delete budget row button. 
    deleteExpensesRowBttn.onclick = function () {deleteExpensesItem(this)};
    expensesRow.insertCell(3).appendChild(deleteExpensesRowBttn);

    // Adds the values to the local storage arrays. 
    if (localExpensesName == null) {
        localExpensesName = [expensesName];
        localExpensesAmount = [expensesAmount];
        localExpensesCategory = [expensesBudgetCategory];
    }
    else {

        // Adds in the data to the object Budget Table to be used for local storage. 
        localExpensesName.push(expensesName);
        localExpensesAmount.push(expensesAmount);
        localExpensesCategory.push(expensesBudgetCategory);
    }

    // Sets the expense arrays to local storage.
    localStorage.setItem("localExpensesName", JSON.stringify(localExpensesName));
    localStorage.setItem("localExpensesAmount", JSON.stringify(localExpensesAmount));
    localStorage.setItem("localExpensesCategory", JSON.stringify(localExpensesCategory));


    // This section subtracts the expense amount from the Budget Table Budget Amount Column. 
    let budgetCategoryIndex = findBudgetCategoryRow(budgetTable, expensesBudgetCategory);
    let budgetAmountLeft = Number(budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML) - Number(expensesAmount);
    budgetTable.rows[budgetCategoryIndex].cells[2].innerHTML = budgetAmountLeft;

    localBudgetAmountLeft[budgetCategoryIndex - 1] = budgetAmountLeft;
    localStorage.setItem("localBudgetAmountLeft", JSON.stringify(localBudgetAmountLeft));

    // Adds the Expense Amount to the Total Expenses Column, which adds all expenses together. 
    document.getElementById("totalExpenses").innerHTML = localExpensesAmount.reduce((accumulator, value) => { return accumulator + value}, 0);

    // Assigns form data to variables. 
    document.getElementById('expensesName').value = "";
    document.getElementById('expensesAmount').value = "";

    // Adds the Expenses Amount to the Total Income Cell in the Overview Table. 
    if (localExpensesAmount.length > 0) { 
        document.getElementById("totalExpenses").innerHTML = arraySum(localExpensesAmount);
    }

    // Calculates the total Balance for the overview table. 
    document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;

    // Checks if any Budget Category has gone over the limit. 
    if (localBudgetAmountLeft.length > 0) {
        for (let i=0; i < (localBudgetAmountLeft.length); i++) {
            console.log(localBudgetAmountLeft[i]);
            if (Number(localBudgetAmountLeft[i]) <= 0) {
                document.getElementById("budgetStatus").innerHTML = "No";
                break;
                }
            else {
                document.getElementById("budgetStatus").innerHTML = "Yes";
                }
            }
        }
})

// Deletes the Expenses Table and clears from local storage.  
document.getElementById('deleteExpensesTableButton').addEventListener('click', function() {

    // Alert pop-up to confirm deletion of the entire Expenses Table.
    if (confirm("Please confirm deletion of Expenses Table") == true) {
        localStorage.clear("localExpensesName");
        localStorage.clear("localExpensesAmount");
        localStorage.clear("localExpensesCategory");

        // Deletes table rows from Expense Table. 
        for (var i = 1; i < document.getElementById('expensesTable').rows.length; i++) {
            document.getElementById('expensesTable').deleteRow(i);
        }
    
        // Deletes all info the from local storage retrieved Expenses Table.
        localExpensesName = '';
        localExpensesAmount = '';
        localExpensesCategory = '';
    }

    // Sets the Expenses Table & Delete button display to none until Submit button is pressed.
    document.getElementById("expensesTable").style.display = "none";
    document.getElementById("deleteExpensesTableButton").style.display = "none";

    // Calculates the total Balance for the overview table. 
    document.getElementById("totalExpenses").innerHTML = arraySum(JSON.parse(localStorage.getItem("localExpensesAmount"))); 
    document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;
    document.getElementById("budgetStatus").innerHTML = "Yes";
})