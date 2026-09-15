export const INTAKE_DEFAULTS = {
  goal: "",
  experienceLevel: "never_tried",
  device: "basic_laptop",
  timePerDay: "1_hour",
  internet: "reliable",
};

export const GOAL_CHIPS = [
  "Frontend developer",
  "Python/data",
  "AI/ML",
  "Design",
  "Not sure yet",
];

export const RADIO_GROUPS = [
  {
    key: "experienceLevel",
    label: "Where are you with this skill today?",
    options: [
      { value: "never_tried", title: "Never tried", hint: "Starting from zero is fine." },
      { value: "watched_tutorials", title: "Watched tutorials", hint: "You’ve seen it, not built it." },
      { value: "built_small_projects", title: "Built small projects", hint: "You’ve shipped little things." },
      { value: "comfortable_building", title: "Comfortable building", hint: "You can move without a map." },
    ],
  },
  {
    key: "device",
    label: "What will you learn on?",
    options: [
      { value: "phone", title: "Phone", hint: "Mobile-first resources." },
      { value: "basic_laptop", title: "Basic laptop", hint: "Browser + docs is enough." },
      { value: "dev_laptop", title: "Dev laptop", hint: "You can install tools." },
    ],
  },
  {
    key: "timePerDay",
    label: "How much time can you give most days?",
    options: [
      { value: "20_30_min", title: "20–30 min", hint: "Short, focused sessions." },
      { value: "1_hour", title: "1 hour", hint: "A solid daily block." },
      { value: "1_2_hours", title: "1–2 hours", hint: "Room to practice." },
      { value: "2_plus_hours", title: "2+ hours", hint: "We’ll give you more depth." },
    ],
  },
  {
    key: "internet",
    label: "How’s your internet?",
    options: [
      { value: "reliable", title: "Reliable", hint: "Video is OK." },
      { value: "limited", title: "Limited", hint: "We’ll keep downloads light." },
      { value: "slow", title: "Slow", hint: "Text-first resources." },
    ],
  },
];

export function IntakeFields({ values, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <label className="field-label dark:text-white" htmlFor="goal">
          What do you want to get good at?
        </label>
        <input
          id="goal"
          className="text-input dark:border-white/10 dark:bg-white/5 dark:text-white"
          value={values.goal}
          onChange={(e) => onChange({ ...values, goal: e.target.value })}
          placeholder="Frontend developer"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {GOAL_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => onChange({ ...values, goal: chip })}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                values.goal === chip
                  ? "bg-navy text-white"
                  : "bg-white text-navy/60 ring-1 ring-navy/10 dark:bg-white/5 dark:text-white/70 dark:ring-white/10"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {RADIO_GROUPS.map((group) => (
        <fieldset key={group.key}>
          <legend className="field-label dark:text-white">{group.label}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.options.map((opt) => {
              const selected = values[group.key] === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`cursor-pointer rounded-2xl border bg-white p-4 transition dark:bg-[#10263c] ${
                    selected ? "border-skybtn shadow-card" : "border-navy/10 dark:border-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={group.key}
                    value={opt.value}
                    checked={selected}
                    onChange={() => onChange({ ...values, [group.key]: opt.value })}
                  />
                  <p className="font-semibold">{opt.title}</p>
                  <p className="mt-1 text-sm text-navy/45 dark:text-white/45">{opt.hint}</p>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
