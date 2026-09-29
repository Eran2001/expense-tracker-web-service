import { TransactionList } from "@/components/shared";
import { transactionItems } from "./data";

export function NotesView() {
  const notes = ["Trip to Ella", "Annual subscription", "Rent and utilities"];
  return (
    <div className="screen-stack grid min-w-0 content-start gap-4.5">
      {notes.map((note, index) => (
        <section className="note-group" key={note}>
          <div className="note-group-heading">
            <div>
              <h2 className="t-heading">{note}</h2>
              <span className="t-meta">
                {index === 0 ? "2 transactions" : "1 transaction"}
              </span>
            </div>
            <strong className="t-small-bold">
              {index === 0 ? "Rs. 18,200.00" : "Rs. 54,034.80"}
            </strong>
          </div>
          <TransactionList
            items={transactionItems.filter((item) => item.note === note)}
          />
        </section>
      ))}
    </div>
  );
}
