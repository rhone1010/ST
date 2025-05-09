<!-- === JavaScript (Dropdown + Estimation) === -->
document.addEventListener("DOMContentLoaded", () => {
  const smallInput = document.getElementById("smallBags");
  const largeInput = document.getElementById("largeBags");
  const taxState = document.getElementById("taxState");

  smallInput.addEventListener("click", () => showDropdown(smallInput, 8));
  largeInput.addEventListener("click", () => showDropdown(largeInput, 5));

  function showDropdown(input, max) {
    closeExistingDropdowns();

    const dropdown = document.createElement("div");
    dropdown.className = "custom-select-dropdown";
    dropdown.classList.add(input.id === "largeBags" ? "dropdown-position-large" : "dropdown-position-small");

    for (let i = 1; i <= max; i++) {
      const option = document.createElement("div");
      option.textContent = i;
      option.onclick = () => {
        input.value = i;
        dropdown.remove();
        updateEstimates();
      };
      dropdown.appendChild(option);
    }

    input.parentNode.appendChild(dropdown);

    setTimeout(() => {
      document.addEventListener("click", closeDropdown);
    }, 0);

    function closeDropdown(e) {
      if (!dropdown.contains(e.target) && e.target !== input) {
        dropdown.remove();
        document.removeEventListener("click", closeDropdown);
      }
    }
  }

  function closeExistingDropdowns() {
    document.querySelectorAll(".custom-select-dropdown").forEach(d => d.remove());
  }

  function updateEstimates() {
    const small = parseInt(smallInput.value) || 0;
    const large = parseInt(largeInput.value) || 0;
    const state = "CA"; // Currently hardcoded — later can be passed from user info

    const totalWeight = (small * 7) + (large * 15);
    const subtotal = totalWeight * 1.3;
    const minimumCharge = 30.00;

    const taxRates = {
      CA: 0.0925,
      NY: 0.088,
      TX: 0.0825,
      FL: 0.06,
      DEFAULT: 0.07
    };

    const taxRate = taxRates[state] !== undefined ? taxRates[state] : taxRates.DEFAULT;
    const taxed = subtotal * taxRate;
    const finalTotal = Math.max(subtotal + taxed, minimumCharge);

    document.getElementById("weightDisplay").textContent = `${totalWeight} lbs`;
    document.getElementById("priceDisplay").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("taxDisplay").textContent = `$${taxed.toFixed(2)}`;
    document.getElementById("taxState").textContent = state;
    document.getElementById("totalDisplay").textContent = `$${finalTotal.toFixed(2)}`;
  }

  updateEstimates();
});
// JavaScript Document