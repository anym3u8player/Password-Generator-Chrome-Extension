// Function to generate a random password
function generatePassword(length, lowercase, uppercase, numbers, symbols) {
  // Character sets
  var lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  var upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numberChars = '0123456789';
  var symbolChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  
  var passwordChars = '';
  if (lowercase) passwordChars += lowerCaseChars;
  if (uppercase) passwordChars += upperCaseChars;
  if (numbers) passwordChars += numberChars;
  if (symbols) passwordChars += symbolChars;
  
  var password = '';
  for (let i = 0; i < length; i++) {
    var randNum = Math.floor(Math.random() * passwordChars.length);
    password += passwordChars[randNum];
  }
  return password;
}

// On DOM load
document.addEventListener('DOMContentLoaded', function() {
  // Load preferences
  var prefs = JSON.parse(localStorage.getItem('preferences') || '{}');
  document.getElementById('length').value = prefs.length || 8;
  document.getElementById('lowercase').checked = prefs.lowercase || false;
  document.getElementById('uppercase').checked = prefs.uppercase || false;
  document.getElementById('numbers').checked = prefs.numbers || false;
  document.getElementById('symbols').checked = prefs.symbols || false;
  
  // Save preferences
  document.getElementById('save').addEventListener('click', function() {
    var prefs = {
      length: document.getElementById('length').value,
      lowercase: document.getElementById('lowercase').checked,
      uppercase: document.getElementById('uppercase').checked,
      numbers: document.getElementById('numbers').checked,
      symbols: document.getElementById('symbols').checked
    };
    localStorage.setItem('preferences', JSON.stringify(prefs));
  });
  
  // Generate password
  document.getElementById('generate').addEventListener('click', function() {
    var length = parseInt(document.getElementById('length').value);
    var lowercase = document.getElementById('lowercase').checked;
    var uppercase = document.getElementById('uppercase').checked;
    var numbers = document.getElementById('numbers').checked;
    var symbols = document.getElementById('symbols').checked;
    var password = generatePassword(length, lowercase, uppercase, numbers, symbols);
    document.getElementById('password').value = password;
  });

  // Copy password to clipboard
  document.getElementById('copy').addEventListener('click', function() {
  var password = document.getElementById('password').value;
  navigator.clipboard.writeText(password).then(function() {
    // Success
    console.log('Password copied to clipboard!');
    
    // Display message
    var message = document.getElementById('message');
    message.style.display = 'block';
    message.textContent = 'Password copied to clipboard!';

    // Hide message after 3 seconds
    setTimeout(function() {
      message.style.display = 'none';
    }, 3000);
  }, function(err) {
    // Error
    console.error('Failed to copy password: ', err);
  });
});
});