document.addEventListener("DOMContentLoaded", () => {
  const smallInput = document.getElementById("smallBags");
  const largeInput = document.getElementById("largeBags");
  const taxState = document.getElementById("taxState");
  const minOrderMessage = document.getElementById("minOrderMessage");

  smallInput.addEventListener("click", () => showDropdown(smallInput, 7, "small"));
  largeInput.addEventListener("click", () => showDropdown(largeInput, 5, "large"));

  function showDropdown(input, max, type) {
    closeExistingDropdowns();
    const dropdown = document.createElement("div");
    dropdown.className = "custom-select-dropdown";
    dropdown.classList.add(type === "large" ? "dropdown-position-large" : "dropdown-position-small");

    const values = [0, ...Array.from({ length: max }, (_, i) => i + 1)];
    for (let i of values) {
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
    const state = "CA";

    const totalWeight = (small * 7) + (large * 15);
    const subtotal = totalWeight * 1.3;

    const taxRates = {
      CA: 0.0925,
      NY: 0.088,
      TX: 0.0825,
      FL: 0.06,
      DEFAULT: 0.07
    };

    const taxRate = taxRates[state] !== undefined ? taxRates[state] : taxRates.DEFAULT;
    const taxed = subtotal * taxRate;
    const finalTotal = subtotal + taxed;

    document.getElementById("weightDisplay").textContent = `${totalWeight} lbs`;
    document.getElementById("priceDisplay").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("taxDisplay").textContent = `$${taxed.toFixed(2)}`;
    document.getElementById("taxState").textContent = state;
    document.getElementById("totalDisplay").textContent = `$${finalTotal.toFixed(2)}`;

    minOrderMessage.style.display = "none";
  }

  updateEstimates();

  document.getElementById("submitOrder").addEventListener("click", () => {
    const small = parseInt(smallInput.value) || 0;
    const large = parseInt(largeInput.value) || 0;
    const subtotal = ((small * 7) + (large * 15)) * 1.3;

    if (subtotal < 30) {
      minOrderMessage.style.display = "block";
    } else {
      minOrderMessage.style.display = "none";
      alert("Order ready to submit.");
    }
  });
});
