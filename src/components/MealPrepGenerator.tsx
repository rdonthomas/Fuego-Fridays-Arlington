import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Shuffle, Clock, Flame, ChevronDown, ChevronUp, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  type Meal,
  type MealPlan,
  type Weekday,
  DAYS,
  generateMealPlan,
  swapMeal,
} from "@/data/mock-meals";

// ─── Tag colours ─────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, string> = {
  vegetarian:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  vegan:        "bg-green-50 text-green-700 border-green-200",
  "gluten-free":"bg-amber-50 text-amber-700 border-amber-200",
  "high-protein":"bg-blue-50 text-blue-700 border-blue-200",
  "dairy-free": "bg-purple-50 text-purple-700 border-purple-200",
  "low-carb":   "bg-rose-50 text-rose-700 border-rose-200",
};

const SLOT_LABELS = {
  breakfast: "Breakfast",
  lunch:     "Lunch",
  dinner:    "Dinner",
  snack:     "Snack",
} as const;

type Slot = keyof typeof SLOT_LABELS;

// ─── Weekly calorie / protein totals ─────────────────────────────────────────

function weeklyTotals(plan: MealPlan) {
  return DAYS.reduce(
    (acc, day) => {
      const slots = Object.values(plan[day]) as Meal[];
      slots.forEach((m) => {
        acc.calories += m.calories;
        acc.protein  += m.protein;
      });
      return acc;
    },
    { calories: 0, protein: 0 }
  );
}

function dailyTotals(day: MealPlan[Weekday]) {
  const slots = Object.values(day) as Meal[];
  return slots.reduce(
    (acc, m) => ({ calories: acc.calories + m.calories, protein: acc.protein + m.protein }),
    { calories: 0, protein: 0 }
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function NutritionPill({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {label} <span className="font-semibold text-foreground">{value}{unit}</span>
    </span>
  );
}

interface MealCardProps {
  meal: Meal;
  slot: Slot;
  day: Weekday;
  onSwap: (day: Weekday, slot: Slot, currentId: string) => void;
}

function MealCard({ meal, slot, day, onSwap }: MealCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={meal.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
    >
      {/* Slot label bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-secondary/50 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {SLOT_LABELS[slot]}
        </span>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => onSwap(day, slot, meal.id)}
          title="Swap this meal"
          className="text-muted-foreground hover:text-foreground"
        >
          <Shuffle className="size-3" />
          <span className="sr-only">Swap {SLOT_LABELS[slot]}</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="px-3 py-2.5">
        <div className="flex items-start gap-2">
          <span className="text-xl leading-none mt-0.5" role="img" aria-label={meal.name}>
            {meal.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight text-foreground truncate">
              {meal.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {meal.prepMinutes} min
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Flame className="size-3" />
                {meal.calories} kcal
              </span>
              <span className="text-xs text-muted-foreground">
                {meal.protein}g protein
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {meal.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {meal.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                  TAG_STYLES[tag] ?? "bg-secondary text-secondary-foreground border-border"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Expandable details */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          {expanded ? "Hide details" : "Ingredients & tip"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-2 border-t border-border/60 pt-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Ingredients
                  </p>
                  <p className="text-xs text-foreground leading-relaxed">
                    {meal.ingredients.join(", ")}
                  </p>
                </div>
                <div className="rounded-lg bg-fuego-50 border border-fuego-200 px-2.5 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-fuego-600 mb-0.5">
                    Prep tip
                  </p>
                  <p className="text-xs text-fuego-900 leading-relaxed">{meal.tip}</p>
                </div>
                {/* Macros */}
                <div className="flex flex-wrap gap-1.5">
                  <NutritionPill label="Carbs" value={meal.carbs} unit="g" />
                  <NutritionPill label="Fat" value={meal.fat} unit="g" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Day column ───────────────────────────────────────────────────────────────

interface DayColumnProps {
  day: Weekday;
  meals: MealPlan[Weekday];
  onSwap: (day: Weekday, slot: Slot, currentId: string) => void;
}

function DayColumn({ day, meals, onSwap }: DayColumnProps) {
  const totals = dailyTotals(meals);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {/* Day header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-foreground">{day}</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{totals.calories} kcal</span>
        </div>
      </div>

      {/* Meal slots */}
      <AnimatePresence mode="popLayout">
        {(["breakfast", "lunch", "dinner", "snack"] as Slot[]).map((slot) => (
          <MealCard
            key={`${day}-${slot}-${meals[slot].id}`}
            meal={meals[slot]}
            slot={slot}
            day={day}
            onSwap={onSwap}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Grocery list ─────────────────────────────────────────────────────────────

function GroceryList({ plan }: { plan: MealPlan }) {
  const [open, setOpen] = useState(false);

  const ingredientSet = new Set<string>();
  DAYS.forEach((day) => {
    (Object.values(plan[day]) as Meal[]).forEach((meal) =>
      meal.ingredients.forEach((ing) => ingredientSet.add(ing))
    );
  });
  const sorted = Array.from(ingredientSet).sort();

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-foreground">Grocery List</span>
          <Badge variant="secondary" className="rounded-full text-xs">
            {sorted.length} items
          </Badge>
        </div>
        {open ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="grocery"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-5 pt-4">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-4">
                {sorted.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-fuego-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MealPrepGenerator() {
  const [plan, setPlan] = useState<MealPlan>(() => generateMealPlan());
  const [generating, setGenerating] = useState(false);

  const totals = weeklyTotals(plan);
  const dailyAvgCalories = Math.round(totals.calories / DAYS.length);
  const dailyAvgProtein  = Math.round(totals.protein / DAYS.length);

  const handleGenerate = useCallback(() => {
    setGenerating(true);
    // Small delay so the shimmer pulse is perceptible
    setTimeout(() => {
      setPlan(generateMealPlan());
      setGenerating(false);
    }, 400);
  }, []);

  const handleSwap = useCallback((day: Weekday, slot: Slot, currentId: string) => {
    setPlan((prev) => swapMeal(prev, day, slot, currentId));
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label="fire">🔥</span>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">
                Meal Prep Generator
              </h1>
              <p className="text-xs text-muted-foreground">
                Quick &amp; healthy meals for your week
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Weekly stats */}
            <div className="hidden items-center gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2 sm:flex">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Flame className="size-3.5 text-fuego-500" />
                <span>
                  <span className="font-semibold text-foreground">{dailyAvgCalories}</span> kcal/day
                </span>
              </span>
              <span className="h-3 w-px bg-border" />
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Zap className="size-3.5 text-blue-500" />
                <span>
                  <span className="font-semibold text-foreground">{dailyAvgProtein}g</span> protein/day
                </span>
              </span>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating}
              className={cn(
                "bg-thermal text-white shadow-sm font-semibold",
                "transition-all hover:-translate-y-0.5 hover:brightness-105",
                "disabled:opacity-70 disabled:translate-y-0"
              )}
            >
              <RefreshCw className={cn("size-4", generating && "animate-spin")} />
              {generating ? "Generating…" : "New week"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6">
        {/* Mobile stats row */}
        <div className="mb-5 flex items-center gap-3 sm:hidden">
          <NutritionPill label="Avg/day" value={dailyAvgCalories} unit=" kcal" />
          <NutritionPill label="Protein" value={dailyAvgProtein} unit="g" />
        </div>

        {/* Swap hint */}
        <p className="mb-5 text-sm text-muted-foreground">
          Hit <span className="font-medium text-foreground">New week</span> to regenerate everything, or tap{" "}
          <Shuffle className="inline size-3.5 align-text-bottom" /> on any meal to swap just that one.
        </p>

        {/* 5-day grid */}
        <motion.div
          className={cn(
            "grid gap-5",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          )}
          animate={generating ? { opacity: 0.5 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {DAYS.map((day) => (
            <DayColumn
              key={day}
              day={day}
              meals={plan[day]}
              onSwap={handleSwap}
            />
          ))}
        </motion.div>

        {/* Grocery list */}
        <div className="mt-8">
          <GroceryList plan={plan} />
        </div>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>All meals ≤ 30 min prep · No backend · Mock data only</span>
          <span>
            Weekly total:{" "}
            <span className="font-medium text-foreground">{totals.calories.toLocaleString()} kcal</span>
            {" · "}
            <span className="font-medium text-foreground">{totals.protein}g</span> protein
          </span>
        </div>
      </footer>
    </div>
  );
}
