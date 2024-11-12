let rdkit = null;

// Initialize RDKit
window.initRDKitModule().then(function(RDKit) {
    rdkit = RDKit;
    console.log('RDKit initialized');
}).catch(function(error) {
    console.error('Error initializing RDKit:', error);
});

function visualizeMolecule(smiles, name = '') {
    if (!rdkit) {
        console.error('RDKit not initialized');
        return;
    }

    const container = document.getElementById('visualization-grid');
    const card = document.createElement('div');
    card.className = 'structure-card';
    
    try {
        const mol = rdkit.get_mol(smiles);
        if (mol) {
            // Get SVG without parameters first
            const svg = mol.get_svg();
            
            card.innerHTML = `
                <div class="name">${name || 'Structure'}</div>
                <div class="smiles">${smiles}</div>
                <div class="structure">
                    ${svg}
                </div>
            `;
            container.appendChild(card);
            mol.delete();
        }
    } catch (error) {
        console.error('Error visualizing molecule:', error);
        card.innerHTML = `
            <div class="error">
                Error visualizing molecule:<br>
                ${smiles}<br>
                ${error.message}
            </div>
        `;
        container.appendChild(card);
    }
}

function clearVisualizations() {
    const container = document.getElementById('visualization-grid');
    if (container) {
        container.innerHTML = '';
    }
}

function validateSMILES(smiles) {
    if (!rdkit) {
        console.error('RDKit not initialized');
        return false;
    }

    try {
        const mol = rdkit.get_mol(smiles);
        if (mol) {
            mol.delete();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Invalid SMILES:', error);
        return false;
    }
}