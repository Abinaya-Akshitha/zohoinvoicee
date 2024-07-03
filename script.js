document.querySelectorAll('.editable').forEach(element => {
    element.addEventListener('click', function() {
        this.contentEditable = true;
        this.focus();
    });
});

function updateTotals() {
    let subTotal = 0;
    document.querySelectorAll('#invoice-items tr').forEach(row => {
        const qty = parseFloat(row.children[1].innerText) || 0;
        const rate = parseFloat(row.children[2].innerText) || 0;
        const amount = qty * rate;
        row.children[6].innerText = amount.toFixed(2);
        subTotal += amount;
    });

    const sgst = subTotal * 0.06;
    const cgst = subTotal * 0.06;
    const total = subTotal + sgst + cgst;

    document.getElementById('sub-total').innerText = subTotal.toFixed(2);
    document.getElementById('sgst').innerText = sgst.toFixed(2);
    document.getElementById('cgst').innerText = cgst.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
}

document.querySelectorAll('#invoice-items td[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('input', updateTotals);
});

function addLineItem() {
    const table = document.getElementById('invoice-items');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td contenteditable="true" data-placeholder="Enter item name/description"></td>
        <td contenteditable="true" data-placeholder="1">1</td>
        <td contenteditable="true" data-placeholder="0.00">0.00</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0.00</td>
    `;
    newRow.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
        cell.addEventListener('input', updateTotals);
    });
}

