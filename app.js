function findBudgetCategoryRow(table, specificBudgetCategory) {
    let j = 0;

    for (let i = 1; i < table.rows.length; i++) {
        let budgetRows = table.rows[i];
        let budgetCategoryCell = budgetRows.cells[0].innerHTML;

        if (budgetCategoryCell === specificBudgetCategory) {
            j = i;
        }
    }
    return j;
}


let budgetForm = document.getElementById('budgetForm');
budgetForm.addEventListener('submit', function(event){
    event.preventDefault();

    let newBudgetCategory = document.getElementById('budgetCategory').value;
    let newBudgetAmount = document.getElementById('budgetAmount').value;
    var budgetTable = document.getElementById("budgetTable");

    if (budgetTable.rows.length == 1) {
        let budgetRow = budgetTable.insertRow(1);
        let budgetCell1 = budgetRow.insertCell(0);
        let budgetCell2 = budgetRow.insertCell(1);
        let budgetCell3 = budgetRow.insertCell(2);
    
        budgetCell1.innerHTML = newBudgetCategory;
        budgetCell2.innerHTML = newBudgetAmount;
        budgetCell3.innerHTML = newBudgetAmount;

        let expensesBudgetCateogory = document.getElementById("expensesBudgetCategory");
        let newOption = document.createElement("option");
        newOption.text = String(newBudgetCategory);
        expensesBudgetCateogory.add(newOption);
    }

    else {
        
        if (findBudgetCategoryRow(budgetTable, newBudgetCategory) == 0) {
            let budgetRow = budgetTable.insertRow(budgetTable.rows.length);
            let budgetCell0 = budgetRow.insertCell(0);
            let budgetCell1 = budgetRow.insertCell(1);
            let budgetCell2 = budgetRow.insertCell(2);

            budgetCell0.innerHTML = newBudgetCategory;
            budgetCell1.innerHTML = newBudgetAmount;
            budgetCell2.innerHTML = newBudgetAmount;

            let expensesBudgetCateogory = document.getElementById("expensesBudgetCategory");
            let newOption = document.createElement("option");
            newOption.text = String(newBudgetCategory);
            expensesBudgetCateogory.add(newOption);
        }
    }
})


let expensesForm = document.getElementById('expensesForm');
expensesForm.addEventListener('submit', function(event){
    event.preventDefault();

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

