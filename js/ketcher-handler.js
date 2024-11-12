let ketcher = null;

// Initialize Ketcher reference
function initKetcher() {
    const ketcherFrame = document.getElementById('ifKetcher');
    try {
        if ('contentDocument' in ketcherFrame)
            ketcher = ketcherFrame.contentWindow.ketcher;
        else
            ketcher = document.frames['ifKetcher'].window.ketcher;
        console.log('Ketcher initialized:', ketcher);
    } catch (error) {
        console.error('Error initializing Ketcher:', error);
    }
}

// Wait for iframe to load
document.getElementById('ifKetcher').onload = function() {
    console.log('iframe loaded');
    setTimeout(initKetcher, 1000);
};

async function getMolfile() {
    try {
        if (!ketcher) {
            alert('Ketcher is not initialized yet. Please wait...');
            return;
        }
        const molfile = await ketcher.getMolfile();
        document.getElementById('output').value = molfile;
    } catch (error) {
        console.error('Error getting molfile:', error);
        alert('Error getting molecule structure');
    }
}

async function getSmiles() {
    try {
        if (!ketcher) {
            alert('Ketcher is not initialized yet. Please wait...');
            return;
        }
        const smiles = await ketcher.getSmiles();
        document.getElementById('output').value = smiles;
        return smiles;
    } catch (error) {
        console.error('Error getting SMILES:', error);
        alert('Error getting SMILES');
        return null;
    }
}

async function setExampleMolecule() {
    try {
        if (!ketcher) {
            alert('Ketcher is not initialized yet. Please wait...');
            return;
        }
        const benzene = `
  Ketcher 02261915492D 1   1.00000     0.00000     0

  6  6  0     0  0            999 V2000
    0.0000    1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.8660    0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.0000   -1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8660    0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  2  0     0  0
  2  3  1  0     0  0
  3  4  2  0     0  0
  4  5  1  0     0  0
  5  6  2  0     0  0
  6  1  1  0     0  0
M  END
        `;
        await ketcher.setMolecule(benzene);
    } catch (error) {
        console.error('Error setting molecule:', error);
        alert('Error loading example molecule');
    }
}