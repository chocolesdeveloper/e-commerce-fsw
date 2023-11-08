export function formatToMoney(value: number): string {
  const price = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return price;
}
