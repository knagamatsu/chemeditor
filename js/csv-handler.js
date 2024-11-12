let csvData = null;
let headers = [];

function handleFileSelect(input) {
    const file = input.files[0];
    if (!file) return;

    // Update file name display
    document.getElementById('file-name').textContent = file.name;

    // Show CSV options
    document.getElementById('csv-options').style.display = 'block';

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            csvData = results.data;
            headers = results.meta.fields;
            
            // Update column select options
            const select = document.getElementById('smiles-column');
            select.innerHTML = '<option value="">Select SMILES column</option>';
            headers.forEach(header => {
                select.innerHTML += `<option value="${header}">${header}</option>`;
            });
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
            alert('Error parsing CSV file');
        }
    });
}

function processCSV() {
    if (!csvData) {
        alert('Please upload a CSV file first');
        return;
    }

    const smilesColumn = document.getElementById('smiles-column').value;
    if (!smilesColumn) {
        alert('Please select the SMILES column');
        return;
    }

    // Clear existing data
    clearList();

    // Process each row
    csvData.forEach(row => {
        const smiles = row[smilesColumn];
        if (smiles && validateSMILES(smiles)) {
            // Use another column as name if available, or row number
            const name = row.Name || row.ID || `Row ${smilesCount + 1}`;
            addSMILESToList(smiles, name);
        }
    });
}