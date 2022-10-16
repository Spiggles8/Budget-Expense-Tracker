// Sets the Budget Table & Delete button display to none until Submit button is pressed.
document.getElementById("budgetTable").style.display = "none";
document.getElementById("deleteBudgetTable").style.display = "none";


// Checks if Budget Table is in local storage.
if (localStorage.getItem("budgetTable") !== null) {

    // Retrieves the Budget Table from local storage and sets as an object.
    var objBudgetTable = JSON.parse(localStorage.getItem("budgetTable"));
}
else {

    // Creates an empty Budget Table object since one was not found.
    var objBudgetTable = [];
        objBudgetTable.budgetCategory = "";
        objBudgetTable.budgetAmount = "";
        objBudgetTable.budgetAmountLeft = "";
    }

// Sets the Budget Table from DOM to an object. 
let budgetTable = document.getElementById("budgetTable");


// Checks to see if there is a budget table in local storage. 
if (objBudgetTable.budgetCategory != '') {

    // Adds in data to the Budget Table from the object from local storage.     
    for (let i = 0; i < (objBudgetTable.budgetCategory.length); i++) {
        budgetTable.insertRow(budgetTable.rows.length).insertCell(0).innerHTML = objBudgetTable.budgetCategory[i];
        budgetTable.insertRow(budgetTable.rows.length).insertCell(1).innerHTML = objBudgetTable.budgetAmount[i];
        budgetTable.insertRow(budgetTable.rows.length).insertCell(2).innerHTML = objBudgetTable.budgetAmountLeft[i];
        budgetTable.insertRow(budgetTable.rows.length).insertCell(3).innerHTML = "delete";
    }

    // Shows the Budget Table & Delete Budget Table button to display data.
    document.getElementById("budgetTable").style.display = "table";
    document.getElementById("deleteBudgetTable").style.display = "block";
}