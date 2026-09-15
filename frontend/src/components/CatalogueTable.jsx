import { useState } from "react";

const emptySkill = { name: "", category: "" };
const emptyResource = { title: "", url: "", type: "" };

export default function CatalogueTable({ title, items, onAdd, onUpdate, onDelete, kind }) {
  const blank = kind === "skills" ? emptySkill : emptyResource;
  const [draft, setDraft] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(blank);

  async function add(e) {
    e.preventDefault();
    await onAdd(draft);
    setDraft(blank);
  }

  const fields =
    kind === "skills"
      ? [
          { key: "name", placeholder: "Skill name" },
          { key: "category", placeholder: "Category" },
        ]
      : [
          { key: "title", placeholder: "Resource title" },
          { key: "url", placeholder: "https://…" },
          { key: "type", placeholder: "video / article / docs" },
        ];

  return (
    <section className="card p-6 dark:border-white/10 dark:bg-[#10263c]">
      <h2 className="text-xl font-bold">{title}</h2>
      <form onSubmit={add} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        {fields.map((field) => (
          <input
            key={field.key}
            className="text-input dark:border-white/10 dark:bg-white/5 dark:text-white"
            placeholder={field.placeholder}
            value={draft[field.key] || ""}
            onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
            required={field.key !== "type" && field.key !== "category"}
          />
        ))}
        <button className="btn-primary !rounded-2xl" type="submit">
          Add
        </button>
      </form>

      <ul className="mt-5 divide-y divide-navy/5 dark:divide-white/10">
        {items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-3 py-3">
            {editingId === item.id ? (
              <>
                {fields.map((field) => (
                  <input
                    key={field.key}
                    className="text-input max-w-[180px] dark:border-white/10 dark:bg-white/5 dark:text-white"
                    value={editValues[field.key] || ""}
                    onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                  />
                ))}
                <button
                  type="button"
                  className="text-sm font-semibold text-skybtn"
                  onClick={async () => {
                    await onUpdate(item.id, editValues);
                    setEditingId(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.name || item.title}</p>
                  <p className="truncate text-sm text-navy/45 dark:text-white/45">
                    {item.category || item.type || item.url}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-navy/50"
                  onClick={() => {
                    setEditingId(item.id);
                    setEditValues(item);
                  }}
                >
                  Edit
                </button>
                <button type="button" className="text-sm font-medium text-rose-500" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
        {!items.length && <li className="py-6 text-sm text-navy/40">Nothing here yet.</li>}
      </ul>
    </section>
  );
}
