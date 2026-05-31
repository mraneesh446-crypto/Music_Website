export interface Transaction {
    id: string;
    date: string;
    amount: number;
    method: "Credit Card" | "eSewa" | "Cash on Delivery";
    status: "Paid" | "Unpaid" | "Pending";
    items: string;
    customer: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: "TXN-982341",
        date: "2026-03-01",
        amount: 250000,
        method: "Credit Card",
        status: "Paid",
        items: "Fender Stratocaster (Sale)",
        customer: "John Doe"
    },
    {
        id: "TXN-761298",
        date: "2026-03-02",
        amount: 5000,
        method: "eSewa",
        status: "Paid",
        items: "Yamaha Grand Piano (Rent - 2 Days)",
        customer: "Jane Smith"
    },
    {
        id: "TXN-654112",
        date: "2026-03-03",
        amount: 155000,
        method: "Cash on Delivery",
        status: "Unpaid",
        items: "Roland V-Drums (Sale)",
        customer: "Narbadha Thapa"
    },
    {
        id: "TXN-334991",
        date: "2026-03-04",
        amount: 85000,
        method: "Credit Card",
        status: "Pending",
        items: "Moog Subsequent 37 (Sale)",
        customer: "Alex Johnson"
    }
];
