

// This function finds the Budget Category Row the specific Budget Category is in.
// If j = 0 then budget Category not found, if j = 1 budget category was found at row i.
export function findBudgetCategoryRow(table, specificBudgetCategory) {
    let j = 0;

    // For loop starts at i = 1 to skip the header. 
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

    for (let i = 0; i < objBudgetTable.budgetCategory.length; i++) {
         if (objBudgetTable.budgetCategory[i] == selectedRow.parentNode.parentNode.firstChild.innerHTML) {
            delete objBudgetTable.budgetCategory[i];
            delete objBudgetTable.budgetAmount[i];
            delete objBudgetTable.budgetAmountLeft[i];
         }
    }
}


//This function deletes the entire budget table and deletes the info from storage. 
export function deleteBudgetTable() {

    // Alert pop-up to confirm deletion of the entire Budget Table.
    if (confirm("Please confirm deletion of Budget Table") == true) {
        localStorage.clear("budgetTable");

        for (var i = 1; i < document.getElementById('budgetTable').rows.length; i++) {
            document.getElementById('budgetTable').deleteRow(i);
        }
    
        // Deletes all info the from local storage retrieved Budget Table.
        objBudgetTable.budgetCategory = '';
        objBudgetTable.budgetAmount = '';
        objBudgetTable.budgetAmountLeft =' ';
    }
}