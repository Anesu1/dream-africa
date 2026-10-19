export function whatsappLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function rentalQuoteMessage(vehicleName: string) {
  return `Hi, I'd like a quote for the ${vehicleName}.\nPick-up date:\nReturn date:\nPick-up location:\nCrossing any borders?`;
}
