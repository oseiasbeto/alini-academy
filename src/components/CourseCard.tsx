import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/mock-data";

export function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {course.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-bold text-card-foreground leading-tight">
          {course.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules} módulos
          </span>
        </div>
        <Link
          to="/register"
          search={{ course: course.id }}
          className="mt-5"
        >
          <Button variant="gold" className="w-full">
            Inscrever-se
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
