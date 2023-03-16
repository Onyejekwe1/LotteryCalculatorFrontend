document.getElementById('lottery-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const numberOfBalls = document.getElementById('numberOfBalls').value;
    const ballsDrawn = document.getElementById('ballsDrawn').value;
    const apiUrl = `https://localhost:7043/LotteryOdds?numberOfBalls=${numberOfBalls}&ballsDrawn=${ballsDrawn}`;

    const response = await fetch(apiUrl);

    if (response.ok) {
        const odds = await response.json();
        displayResults(odds);
    } else {
        alert('Error fetching data from the API');
    }
});

function displayResults(odds) {
    const resultsDiv = document.getElementById('results');
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Numbers Matched</th>
                    <th>Calculated Odds</th>
                </tr>
            </thead>
            <tbody>
    `;

    Object.keys(odds).forEach((key) => {
        tableHTML += `
            <tr>
                <td>${key} Main Numbers</td>
                <td>1 in ${odds[key]}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    resultsDiv.innerHTML = tableHTML;
    resultsDiv.style.display = 'block';
}
