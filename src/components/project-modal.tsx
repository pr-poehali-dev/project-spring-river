import { useEffect } from "react"
import Icon from "@/components/ui/icon"

export interface Project {
  number: string
  title: string
  category: string
  year: string
  direction: string
  image: string
  description: string
  tags: string[]
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
  onConsult: () => void
}

export function ProjectModal({ project, onClose, onConsult }: ProjectModalProps) {
  const isOpen = !!project

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (isOpen) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-all duration-500 sm:items-center ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-t-3xl bg-[#0a0a0a] border border-foreground/10 transition-all duration-500 sm:rounded-3xl ${
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 transition-colors hover:bg-foreground/20"
        >
          <Icon name="X" size={16} className="text-foreground" />
        </button>

        <div className="overflow-y-auto" style={{ maxHeight: "90vh" }}>
          {/* Image */}
          {project && (
            <div className="relative h-56 w-full overflow-hidden sm:h-72">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-xs text-foreground/50">{project.number}</span>
              </div>
            </div>
          )}

          {/* Content */}
          {project && (
            <div className="px-6 pb-8 pt-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 font-mono text-xs text-foreground/50">
                  {project.year}
                </span>
                <span className="font-mono text-xs text-foreground/40">{project.category}</span>
              </div>

              <h2 className="mb-4 font-sans text-3xl font-semibold text-foreground sm:text-4xl">
                {project.title}
              </h2>

              <p className="mb-6 font-sans text-base leading-relaxed text-foreground/70">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-foreground/8 border border-foreground/10 px-3 py-1 font-mono text-xs text-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={onConsult}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground py-4 font-sans text-sm font-semibold text-background transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Получить консультацию
                <Icon name="ArrowRight" size={16} className="text-background" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
