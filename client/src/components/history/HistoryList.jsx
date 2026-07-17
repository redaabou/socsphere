import EmptyHistory from "./EmptyHistory";
import HistoryCard from "./HistoryCard";

export default function HistoryList({ items, hasFilters, onDelete, onRerun }) {
  if (items.length === 0) {
    return <EmptyHistory filtered={hasFilters} />;
  }

  return (
    <section className="space-y-4" aria-label="IOC lookup history results">
      {items.map((item) => (
        <HistoryCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onRerun={onRerun}
        />
      ))}
    </section>
  );
}
