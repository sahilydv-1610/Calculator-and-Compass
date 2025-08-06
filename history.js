const historyList = document.getElementById('history-list');
let calculationHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderHistory();
    
    // Clear history button
    document.getElementById('clear-history').addEventListener('click', clearHistory);
});

function addToHistory(calculation) {
    calculationHistory.unshift({
        calculation,
        timestamp: new Date().toLocaleString()
    });
    
    if (calculationHistory.length > 20) {
        calculationHistory = calculationHistory.slice(0, 20);
    }
    
    localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    
    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<div class="text-center text-gray-500 dark:text-gray-400 py-4">No history yet</div>';
        return;
    }
    
    calculationHistory.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer flex justify-between items-start';
        
        historyItem.innerHTML = `
            <div class="flex-1">
                <div class="font-medium dark:text-white">${item.calculation}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${item.timestamp}</div>
            </div>
            <button onclick="copyResult(${index})" class="ml-2 p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                <i class="fas fa-copy"></i>
            </button>
        `;
        
        historyItem.addEventListener('click', () => {
            // Extract the result from history item
            const result = item.calculation.split(' = ').pop();
            document.getElementById('calc-display').value = result;
            currentInput = result;
            
            // Switch to calculator
            document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.target === 'calculator') {
                    btn.classList.add('active');
                }
            });
            
            document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
            document.getElementById('calculator-section').classList.remove('hidden');
        });
        
        historyList.appendChild(historyItem);
    });
}

function clearHistory() {
    calculationHistory = [];
    localStorage.removeItem('calcHistory');
    renderHistory();
}

function copyResult(index) {
    const result = calculationHistory[index].calculation.split(' = ').pop();
    navigator.clipboard.writeText(result).then(() => {
        const copyBtn = historyList.children[index].querySelector('button');
        copyBtn.innerHTML = '<i class="fas fa-check text-green-500"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    });
}