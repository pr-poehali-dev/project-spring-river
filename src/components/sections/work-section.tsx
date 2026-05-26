import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import { ProjectModal, type Project } from "@/components/project-modal"
import Icon from "@/components/ui/icon"

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "СтройМастер",
    category: "Корпоративный сайт + SEO",
    year: "2025",
    direction: "left",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description:
      "Разработали многостраничный корпоративный сайт для строительной компании с портфолио объектов, калькулятором стоимости и онлайн-заявкой. Параллельно выстроили SEO-стратегию: через 3 месяца органический трафик вырос на 180%.",
    tags: ["Корпоративный сайт", "SEO", "React", "Калькулятор", "CMS"],
  },
  {
    number: "02",
    title: "ЮрСервис Групп",
    category: "Лендинг + контекстная реклама",
    year: "2025",
    direction: "right",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    description:
      "Создали высококонверсионный лендинг для юридической компании с акцентом на доверие и экспертность. Настроили рекламные кампании в Яндекс Директ — стоимость лида снизилась на 40% по сравнению с предыдущим подрядчиком.",
    tags: ["Лендинг", "Яндекс Директ", "A/B тест", "CRO", "Аналитика"],
  },
  {
    number: "03",
    title: "АвтоПарк 36",
    category: "Интернет-магазин + поддержка",
    year: "2024",
    direction: "left",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
    description:
      "Запустили интернет-магазин автозапчастей с каталогом из 15 000 позиций, фильтрацией по марке и модели автомобиля, интеграцией с 1С. Ведём техническую поддержку и обновление ассортимента.",
    tags: ["Интернет-магазин", "1С интеграция", "Каталог", "Поддержка", "API"],
  },
]

export function WorkSection({ onConsult }: { onConsult?: () => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section
        ref={ref}
        className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`mb-12 transition-all duration-700 md:mb-16 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Проекты
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Избранные работы</p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                index={i}
                isVisible={isVisible}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsult={() => {
          setSelectedProject(null)
          onConsult?.()
        }}
      />
    </>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
  onClick,
}: {
  project: Project
  index: number
  isVisible: boolean
  onClick: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between border-b border-foreground/10 py-6 text-left transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-foreground/30">
          <Icon name="ArrowUpRight" size={12} className="text-foreground/60" />
        </span>
      </div>
    </button>
  )
}
