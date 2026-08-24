import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaCheck, FaTimes, FaWallet } from "react-icons/fa";

const currencies = {
  EUR: { symbol: "€", label: "Euro" },
  USD: { symbol: "$", label: "US Dollar" },
  INR: { symbol: "₹", label: "Indian Rupee" },
};

const BudgetModal = ({ isOpen, onClose, budget, currency, onSave }) => {
  const [draftBudget, setDraftBudget] = useState(budget);
  const [draftCurrency, setDraftCurrency] = useState(currency);

  useEffect(() => {
    if (isOpen) {
      setDraftBudget(budget);
      setDraftCurrency(currency);
    }
  }, [budget, currency, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = Object.values(draftBudget).reduce(
    (sum, value) => sum + Number(value || 0),
    0,
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraftBudget((current) => ({ ...current, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      budget: {
        stay: Number(draftBudget.stay || 0),
        food: Number(draftBudget.food || 0),
        fun: Number(draftBudget.fun || 0),
      },
      currency: draftCurrency,
    });
    onClose();
  };

  return createPortal(
    <div className="budget-modal-root">
      <button
        className="budget-modal-backdrop"
        type="button"
        aria-label="Close budget editor"
        onClick={onClose}
      />
      <section
        className="budget-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="budget-modal-title"
      >
        <div className="budget-modal-header">
          <div className="budget-modal-icon">
            <FaWallet />
          </div>
          <button
            className="budget-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <p className="eyebrow">Keep your plans comfortable</p>
        <h2 id="budget-modal-title">Edit trip budget</h2>
        <p className="budget-modal-description">
          Set your ideal spend for each part of the journey.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="currency-field">
            <span>Display currency</span>
            <select
              value={draftCurrency}
              onChange={(event) => setDraftCurrency(event.target.value)}
            >
              {Object.entries(currencies).map(([code, details]) => (
                <option key={code} value={code}>
                  {details.label} ({details.symbol})
                </option>
              ))}
            </select>
          </label>
          <div className="budget-inputs">
            {[
              ["stay", "Stay", "stay-dot"],
              ["food", "Food", "food-dot"],
              ["fun", "Fun", "fun-dot"],
            ].map(([name, label, dotClass]) => (
              <label key={name}>
                <span>
                  <i className={dotClass} /> {label}
                </span>
                <div className="budget-input-wrap">
                  <b>{currencies[draftCurrency].symbol}</b>
                  <input
                    name={name}
                    type="number"
                    min="0"
                    step="10"
                    value={draftBudget[name]}
                    onChange={handleChange}
                  />
                </div>
              </label>
            ))}
          </div>
          <div className="budget-modal-total">
            <span>New estimated total</span>
            <strong>
              {currencies[draftCurrency].symbol}
              {total.toLocaleString("en-GB")}
            </strong>
          </div>
          <div className="budget-modal-actions">
            <button className="secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" type="submit">
              <FaCheck /> Save budget
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body,
  );
};

export default BudgetModal;
