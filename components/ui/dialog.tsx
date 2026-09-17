"use client";

import { createContext, useContext, useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

type DialogContextValue = { open: boolean; onOpenChange: (open: boolean) => void };
const DialogContext = createContext<DialogContextValue | null>(null);

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }) {
  return <DialogContext.Provider value={{ open, onOpenChange }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  const context = useContext(DialogContext);
  return <span onClick={() => context?.onOpenChange(true)}>{children}</span>;
}

export function DialogClose({ children }: { children: ReactNode }) {
  const context = useContext(DialogContext);
  return <span onClick={() => context?.onOpenChange(false)}>{children}</span>;
}

export function DialogContent({ children, className = "", labelledBy = "dialog-title" }: HTMLAttributes<HTMLElement> & { children: ReactNode; labelledBy?: string }) {
  const context = useContext(DialogContext);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!context?.open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") context.onOpenChange(false); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("dialog-is-open");
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("dialog-is-open"); };
  }, [context]);
  if (!context?.open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) context.onOpenChange(false); }}>
      <section className={`bio-dialog ${className}`.trim()} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <button ref={closeRef} type="button" className="dialog-close" aria-label="Close dialog" onClick={() => context.onOpenChange(false)}>×</button>
        {children}
      </section>
    </div>
  );
}

export function DialogTitle({ children, id = "dialog-title", className = "", ...props }: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode; id?: string }) {
  return <h2 id={id} className={className} {...props}>{children}</h2>;
}

export function DialogDescription({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return <p className={className} {...props}>{children}</p>;
}
