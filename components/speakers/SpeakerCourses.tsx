"use client";

import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Speaker, SpeakerGroup } from "@/data/speakers";
import { SpeakerEntry } from "./SpeakerEntry";
import styles from "./Speakers.module.css";

interface SpeakerCoursesProps {
  speakers: readonly Speaker[];
  /** Courses in tab order. A course without speakers gets no tab. */
  groups: readonly SpeakerGroup[];
}

const coursesId = "courses";

export function SpeakerCourses({ speakers, groups }: SpeakerCoursesProps) {
  const [switched, setSwitched] = useState(false);
  const courses = useMemo(
    () =>
      groups
        .map(group => ({ ...group, items: speakers.filter(speaker => speaker.groups?.includes(group.id)).sort((a, b) => Number(b.role === "Moderator") - Number(a.role === "Moderator")) }))
        .filter(course => course.items.length),
    [groups, speakers],
  );
  const [value, setValue] = useState(courses[0]?.id);

  // Deep links such as /speakers/#rights-equity open that course (the agenda's "View speakers" links).
  // Unknown hashes are ignored, so the first course stays open. Not a visitor switch, so the panel does not animate.
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!courses.some(course => course.id === id)) return;
      setValue(id);
      document.getElementById(coursesId)?.scrollIntoView({ block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [courses]);

  return (
    <Tabs
      id={coursesId}
      value={value}
      onValueChange={next => {
        setValue(next);
        setSwitched(true);
      }}
      className={styles.courses}
      data-switched={switched || undefined}
    >
      <TabsList aria-label="Courses" className={styles.tabs}>
        {courses.map(course => <TabsTrigger key={course.id} value={course.id} className={styles.tab}>{course.label}</TabsTrigger>)}
      </TabsList>
      {courses.map(course => (
        <TabsContent key={course.id} value={course.id} className={styles.panel}>
          <header className={styles.panelHeader}>
            <p className="eyebrow">{course.items.length} {course.items.length === 1 ? "speaker" : "speakers"}</p>
            {course.title ? <h2>{course.title}</h2> : null}
          </header>
          <ul className={styles.grid} aria-label={course.label}>
            {course.items.map(speaker => <li key={speaker.id}><SpeakerEntry speaker={speaker} /></li>)}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
