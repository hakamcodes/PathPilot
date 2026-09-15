import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import CatalogueTable from "../components/CatalogueTable";

export default function Catalogue() {
  const [skills, setSkills] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!db) return undefined;
    const unsubSkills = onSnapshot(collection(db, "skills"), (snap) => {
      setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    const unsubResources = onSnapshot(collection(db, "resources"), (snap) => {
      setResources(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => {
      unsubSkills();
      unsubResources();
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-10">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">Library</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Skills and resources</h1>
        <p className="mt-2 text-navy/50 dark:text-white/55">Add, edit, or remove the catalogue the path generator can use.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CatalogueTable
          title="Skills"
          kind="skills"
          items={skills}
          onAdd={(data) => addDoc(collection(db, "skills"), data)}
          onUpdate={(id, data) => updateDoc(doc(db, "skills", id), data)}
          onDelete={(id) => deleteDoc(doc(db, "skills", id))}
        />
        <CatalogueTable
          title="Resources"
          kind="resources"
          items={resources}
          onAdd={(data) => addDoc(collection(db, "resources"), data)}
          onUpdate={(id, data) => updateDoc(doc(db, "resources", id), data)}
          onDelete={(id) => deleteDoc(doc(db, "resources", id))}
        />
      </div>
    </div>
  );
}
