const loadingSpinner = document.querySelector('#loading');
const results = document.querySelector('#results');

// Hide loading spinner and results
loadingSpinner.style.display = 'none';
results.style.display = 'none';

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  loadingSpinner.style.display = 'block';
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    results.style.display = 'block';
    loadingSpinner.style.display = 'none';
  } else {
    showError('Please check you numbers');
  }
}

function showError(errMsg) {
  results.style.display = 'none';
  loadingSpinner.style.display = 'none';

  // Create a div
  const errDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errDiv.appendChild(document.createTextNode(errMsg));

  // Insert error above heading
  card.insertBefore(errDiv, heading);

  // Clear Error
  setTimeout(function() {
    errDiv.style.display = 'none';
  }, 3000);
}
