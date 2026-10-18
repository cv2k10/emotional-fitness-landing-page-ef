export function recordConversion(eventName: string) {
  // Analytics placeholder: connect this custom event to the chosen analytics provider.
  window.dispatchEvent(
    new CustomEvent("emotional-fitness:conversion", { detail: { eventName } }),
  );
}

// Any element with `data-conversion="<event>"` records that event when clicked.
document.addEventListener("click", (event) => {
  const target = (event.target as Element | null)?.closest<HTMLElement>("[data-conversion]");
  if (target?.dataset.conversion) recordConversion(target.dataset.conversion);
});
