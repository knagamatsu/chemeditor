let smilesCount = 0;

async function addCurrentStructure() {
    try {
        if (!ketcher) {
            alert('Ketcher is not initialized yet. Please wait...');
            return;
        }
        const smiles = await ketcher.getSmiles();
        if (smiles && validateSMILES(smiles)) {
            addSMILESToList(smiles, 'From Editor');
        } else {
            alert('Invalid or empty structure');
        }
    } catch (error) {
        console.error('Error getting SMILES:', error);
        alert('Error getting structure');
    }
}

function addManualSMILES() {
    const input = document.getElementById('smiles-input');
    const smiles = input.value.trim();
    
    if (!smiles) {
        alert('Please enter a SMILES string');
        return;
    }

    if (validateSMILES(smiles)) {
        addSMILESToList(smiles, 'Manual Input');
        input.value = '';
    } else {
        alert('Invalid SMILES string');
    }
}

function addSMILESToList(smiles, name = '') {
    smilesCount++;
    const tbody = document.getElementById('smiles-list');
    const row = tbody.insertRow();
    row.innerHTML = `
        <td>${smilesCount}</td>
        <td>${smiles}</td>
        <td>${name}</td>
        <td>
            <button onclick="removeSMILES(this)" class="secondary">Remove</button>
        </td>
    `;
    
    // Visualize the new molecule
    visualizeMolecule(smiles, name);
}

function removeSMILES(button) {
    const row = button.closest('tr');
    const tbody = row.parentElement;
    const smiles = row.cells[1].textContent;
    
    // Remove the row
    row.remove();
    
    // Refresh all visualizations
    clearVisualizations();
    Array.from(tbody.rows).forEach(row => {
        visualizeMolecule(row.cells[1].textContent, row.cells[2].textContent);
    });
}

function clearList() {
    document.getElementById('smiles-list').innerHTML = '';
    clearVisualizations();
    smilesCount = 0;
}

function addManualSMILES() {
    const input = document.getElementById('smiles-input');
    const lines = input.value.trim().split('\n');
    
    if (lines.length === 0 || (lines.length === 1 && lines[0] === '')) {
        alert('Please enter at least one SMILES string');
        return;
    }

    let successCount = 0;
    let errorCount = 0;

    lines.forEach(line => {
        // Split line into SMILES and optional name
        const parts = line.trim().split(/\s+/);
        const smiles = parts[0];
        const name = parts.slice(1).join(' ') || 'Manual Input';

        if (smiles && validateSMILES(smiles)) {
            addSMILESToList(smiles, name);
            successCount++;
        } else {
            console.error('Invalid SMILES:', smiles);
            errorCount++;
        }
    });

    // Report results
    if (errorCount > 0) {
        alert(`Processed ${successCount} valid SMILES strings.\n${errorCount} invalid entries were skipped.`);
    } else {
        alert(`Successfully added ${successCount} SMILES strings.`);
    }

    // Clear input area after processing
    if (successCount > 0) {
        input.value = '';
    }
}

function clearInput() {
    document.getElementById('smiles-input').value = '';
}