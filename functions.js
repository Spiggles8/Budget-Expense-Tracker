// This JavaScript file  handles all functions that are used for Page Load and Button Presses. 

// This function finds the Budget Category Row the specific Budget Category is in.
export function findBudgetCategoryRow(table, specificBudgetCategory) {
    let j = 0;

    // For loop starts at i = 1 to skip the header row.  
    for (let i = 1; i < table.rows.length; i++) {
        let budgetRows = table.rows[i];
        let budgetCategoryCell = budgetRows.cells[0].innerHTML;

        if (budgetCategoryCell === specificBudgetCategory) {
            j = i;
        }
    }
    return j;
}



// This function deletes a row in the budget table and deletes the specific category from local storage. 
export function deleteBudgetCategory(selectedRow) {
    var budgetTableRowNode= selectedRow.parentNode.parentNode;
    budgetTableRowNode.parentNode.removeChild(budgetTableRowNode);

    // Retrieves the Budget data from local storage. 
    var localBudgetCategories = JSON.parse(localStorage.getItem("localBudgetCategories"));
    var localBudgetAmount = JSON.parse(localStorage.getItem("localBudgetAmount"));
    var localBudgetAmountLeft = JSON.parse(localStorage.getItem("localBudgetAmountLeft"));

    // Deletes the local budget Arrays row by row. 
    if (localBudgetCategories.length > 0) {
        for (let i = 0; i < localBudgetCategories.length; i++) {
            if (localBudgetCategories[i] == selectedRow.parentNode.parentNode.firstChild.innerHTML) {
                localBudgetCategories.splice(i, 1);
                localBudgetAmount.splice(i, 1);
                localBudgetAmountLeft.splice(i, 1);
             }
        }
        
    // Saves the budget Table data to local storage. 
    localStorage.setItem("localBudgetCategories", JSON.stringify(localBudgetCategories));
    localStorage.setItem("localBudgetAmount", JSON.stringify(localBudgetAmount));
    localStorage.setItem("localBudgetAmountLeft", JSON.stringify(localBudgetAmountLeft));
    }

    // If there is no data in the Budget Table, the table & button are not shown. 
    if (localBudgetCategories.length === 0) {
        document.getElementById("budgetTable").style.display = "none";
        document.getElementById("deleteBudgetTableButton").style.display = "none";
    }

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

    document.getElementById("totalBudget").innerHTML = arraySum(JSON.parse(localStorage.getItem("localBudgetAmount"))); 
}



// This function deletes a row in the expenses table and deletes the specific category from local storage. 
export function deleteIncomeItem(selectedRow) {
    var incomeTableRowNode= selectedRow.parentNode.parentNode;
    incomeTableRowNode.parentNode.removeChild(incomeTableRowNode);

    // Retrieves the Income data from local storage.
    var localIncomeSource = JSON.parse(localStorage.getItem("localIncomeSource"));
    var localIncomeAmount = JSON.parse(localStorage.getItem("localIncomeAmount"));

    // Deletes the local income arrays row by row. 
    if (localIncomeSource.length > 0) {
        for (let i = 0; i < localIncomeSource.length; i++) {
            if (localIncomeSource[i] == selectedRow.parentNode.parentNode.firstChild.innerHTML) {
                localIncomeSource.splice(i, 1);
                localIncomeAmount.splice(i, 1);
            }
        }

    // Saves the income Table data to local storage. 
    localStorage.setItem("localIncomeSource", JSON.stringify(localIncomeSource));
    localStorage.setItem("localIncomeAmount", JSON.stringify(localIncomeAmount));    
    }

    // If there is no data in the Income Table, the table & button are not shown. 
    if (localIncomeSource.length === 0) {
        document.getElementById("incomeTable").style.display = "none";
        document.getElementById("deleteIncomeTableButton").style.display = "none";
    }

    // Calculates the total income & Balance for the overview table.
    document.getElementById("totalIncome").innerHTML = arraySum(JSON.parse(localStorage.getItem("localIncomeAmount"))); 
    document.getElementById("totalBalance").innerHTML = document.getElementById("totalIncome").innerHTML - document.getElementById("totalExpenses").innerHTML;    
}



// This function deletes a row in the expenses table and deletes the specific category from local storage. 
export function deleteExpensesItem(selectedRow) {
    var expensesTableRowNode= selectedRow.parentNode.parentNode;
    expensesTableRowNode.parentNode.removeChild(expensesTableRowNode);

    // Retrieves the expense data from local storage.
    var localExpensesName = JSON.parse(localStorage.getItem("localExpensesName"));
    var localExpensesAmount = JSON.parse(localStorage.getItem("localExpensesAmount"));
    var localExpensesCategory = JSON.parse(localStorage.getItem("localExpensesCategories"));

    // Deletes the local expense arrays row by row. 
    if (localExpensesName.length > 0) {
        for (let i = 0; i < localExpensesName.length; i++) {
            if (localExpensesName[i] == selectedRow.parentNode.parentNode.firstChild.innerHTML) {
                localExpensesName.splice(i, 1);
                localExpensesAmount.splice(i, 1);
                localExpensesCategory.splice(i, 1);
            }
        }

    // Saves the budget Table data to local storage. 
    localStorage.setItem("localExpensesName", JSON.stringify(localExpensesName));
    localStorage.setItem("localExpensesAmount", JSON.stringify(localExpensesAmount));
    localStorage.setItem("localExpensesCategory", JSON.stringify(localExpensesCategoy));     
    }

    // If there is no data in the Expense Table, the table & button are not shown. 
    if (localExpensesName.length === 0) {
        document.getElementById("expensesTable").style.display = "none";
        document.getElementById("deleteExpensesTableButton").style.display = "none";
    }

    // Calculates the total Balance for the overview table. 
    document.getElementById("totalExpenses").innerHTML = arraySum(JSON.parse(localStorage.getItem("localExpensesAmount"))); 
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
}

// Gives the summation of a Array. 
export function arraySum(array) {
    let arraySum = 0;
    
    for (let i=0; (i < array.length); i++) {
        arraySum = arraySum + Number(array[i]);
    }
    return arraySum;
}