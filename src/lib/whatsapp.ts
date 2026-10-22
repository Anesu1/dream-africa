export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function rentalQuoteMessage(vehicleName: string) {
  return `Hi, I'd like a quote for the ${vehicleName}.\nPick-up date:\nReturn date:\nPick-up location:\nCrossing any borders?`;
}

/** Trip enquiry with the page URL, plus any details the traveller has already entered. */
export function tripQuoteMessage(tripName: string, pageUrl: string, details: [string, string][] = []) {
  const filled = details.filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value.trim()}`);
  return [
    `Hello Africa Dream Adventures, I'm interested in the ${tripName}: ${pageUrl}. Please help me confirm availability and a quote.`,
    ...filled,
  ].join("\n");
}
