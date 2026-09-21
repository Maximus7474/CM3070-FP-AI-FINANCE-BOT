This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
[src]/
  components/
    ui/
      avatar.tsx
      badge.tsx
      breadcrumb.tsx
      button.tsx
      card.tsx
      chart.tsx
      checkbox.tsx
      collapsible.tsx
      command.tsx
      dialog.tsx
      drawer.tsx
      dropdown-menu.tsx
      input-group.tsx
      input.tsx
      label.tsx
      popover.tsx
      scroll-area.tsx
      select.tsx
      separator.tsx
      sheet.tsx
      sidebar.tsx
      skeleton.tsx
      sonner.tsx
      table.tsx
      tabs.tsx
      textarea.tsx
      toggle-group.tsx
      toggle.tsx
      tooltip.tsx
    app-sidebar.tsx
    chat-markdown.tsx
    nav-main.tsx
    nav-user.tsx
    site-header.tsx
  hooks/
    use-channel.ts
    use-conversation.ts
    use-llm.ts
    use-mobile.ts
    use-pagename.ts
  lib/
    db/
      chat.ts
      client.ts
      learn.ts
      model.ts
      settings.ts
    data.ts
    llm-sync.ts
    utils.ts
  pages/
    learn/
      flashcards.tsx
      guide-view.tsx
      learn.tsx
    settings/
      index.tsx
      main-settings.tsx
      train-model.tsx
      view-models.tsx
    chat.tsx
    eval.tsx
    index.tsx
  App.css
  App.tsx
  main.tsx
  types.ts
  vite-env.d.ts

[src-py]/
  llm/
    __init__.py
    learn.py
    main.py
    providers.py
    retrieval.py
  rl_pipeline/
    __init__.py
    backtest.py
    data.py
    environment.py
    main.py
    rl_agent.py
  utils/
    __init__.py
    path.py
  app.spec
  build.bat
  config.py
  main.py
  recommendations.json
  requirements.txt

[src-tauri]/
  capabilities/
    default.json
  icons/
    128x128.png
    128x128@2x.png
    32x32.png
    icon.icns
    icon.ico
    icon.png
    Square107x107Logo.png
    Square142x142Logo.png
    Square150x150Logo.png
    Square284x284Logo.png
    Square30x30Logo.png
    Square310x310Logo.png
    Square44x44Logo.png
    Square71x71Logo.png
    Square89x89Logo.png
    StoreLogo.png
  output/
    poc_agent.zip
    ppo_trading_model.zip
    price_rsi.png
  src/
    lib.rs
    main.rs
    migrations.rs
  .gitignore
  build.rs
  Cargo.toml
  tauri.conf.json
````

# Files

## File: src/components/ui/avatar.tsx
````typescript
import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
````

## File: src/components/ui/badge.tsx
````typescript
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
````

## File: src/components/ui/breadcrumb.tsx
````typescript
import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
````

## File: src/components/ui/button.tsx
````typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
````

## File: src/components/ui/card.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
````

## File: src/components/ui/chart.tsx
````typescript
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
````

## File: src/components/ui/checkbox.tsx
````typescript
"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
````

## File: src/components/ui/collapsible.tsx
````typescript
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
````

## File: src/components/ui/command.tsx
````typescript
"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
````

## File: src/components/ui/dialog.tsx
````typescript
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
````

## File: src/components/ui/drawer.tsx
````typescript
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

type DrawerContextProps = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextProps | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & {
  showSwipeHandle?: boolean
}) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 min-h-dvh bg-black/10 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] select-none data-ending-style:pointer-events-none data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-snap-points:[--drawer-overlay-min-opacity:0.5] data-starting-style:opacity-0 data-swiping:duration-0 supports-backdrop-filter:backdrop-blur-xs supports-[-webkit-touch-callout:none]:absolute",
        className
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab transition-opacity duration-200 group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-[swipe-axis=x]/drawer-popup:h-full group-data-[swipe-axis=x]/drawer-popup:w-3 group-data-[swipe-axis=x]/drawer-popup:items-center group-data-[swipe-axis=y]/drawer-popup:h-3 group-data-[swipe-axis=y]/drawer-popup:w-full group-data-[swipe-axis=y]/drawer-popup:justify-center group-data-[swipe-direction=down]/drawer-popup:items-end group-data-[swipe-direction=left]/drawer-popup:order-last group-data-[swipe-direction=left]/drawer-popup:justify-start group-data-[swipe-direction=right]/drawer-popup:justify-end group-data-[swipe-direction=up]/drawer-popup:order-last group-data-[swipe-direction=up]/drawer-popup:items-start after:block after:shrink-0 after:rounded-full after:bg-muted group-data-[swipe-axis=x]/drawer-popup:after:h-24 group-data-[swipe-axis=x]/drawer-popup:after:w-1 group-data-[swipe-axis=y]/drawer-popup:after:h-1 group-data-[swipe-axis=y]/drawer-popup:after:w-24 active:cursor-grabbing",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none fixed inset-0 z-50 select-none data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            // Base.
            "group/drawer-popup pointer-events-auto fixed z-50 m-(--drawer-inset,0px) flex h-(--drawer-content-height) max-h-(--drawer-content-max-height,none) min-h-0 w-(--drawer-content-width,auto) transform-[translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] flex-col bg-popover text-sm text-popover-foreground transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform outline-none select-none [interpolate-size:allow-keywords] data-[swipe-direction=down]:rounded-t-xl data-[swipe-direction=down]:border-t data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:border-r data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:border-l data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:border-b",
            // Nested.
            "data-nested-drawer-open:overflow-hidden data-nested-drawer-open:brightness-95",
            // Bleed.
            "after:pointer-events-none after:absolute after:bg-(--drawer-bleed-background,var(--color-popover)) data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=x]:after:w-(--bleed) data-[swipe-axis=y]:after:inset-x-0 data-[swipe-axis=y]:after:h-(--bleed) data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full",
            // Sizing.
            "[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=y]:data-snap-points:[--drawer-content-height:100dvh] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem]",
            // Stack.
            "[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]",
            // Transitions.
            "data-ending-style:transform-(--closed-transform) data-ending-style:opacity-[0.9999] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-nested-drawer-swiping:duration-0 data-ending-style:data-nested-drawer-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:transform-(--closed-transform) data-swiping:duration-0 data-ending-style:data-swiping:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            // Axis: y.
            "data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-nested-drawer-open:h-(--stack-height)",
            // Axis: x.
            "data-[swipe-axis=x]:inset-y-0 data-[swipe-axis=x]:flex-row",
            // Direction: down.
            "data-[swipe-direction=down]:bottom-0 data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: up.
            "data-[swipe-direction=up]:top-0 data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))]",
            // Direction: left.
            "data-[swipe-direction=left]:left-0 data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))]",
            // Direction: right.
            "data-[swipe-direction=right]:right-0 data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))]",
            className
          )}
          {...props}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] select-text group-data-nested-drawer-open/drawer-popup:opacity-0 group-data-nested-drawer-swiping/drawer-popup:opacity-100 group-data-swiping/drawer-popup:select-none"
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[swipe-axis=y]/drawer-popup:text-center md:gap-0.5 md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
````

## File: src/components/ui/dropdown-menu.tsx
````typescript
import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
````

## File: src/components/ui/input-group.tsx
````typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
````

## File: src/components/ui/input.tsx
````typescript
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
````

## File: src/components/ui/label.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
````

## File: src/components/ui/popover.tsx
````typescript
import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
````

## File: src/components/ui/scroll-area.tsx
````typescript
import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
````

## File: src/components/ui/select.tsx
````typescript
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
````

## File: src/components/ui/separator.tsx
````typescript
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
````

## File: src/components/ui/sheet.tsx
````typescript
import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
````

## File: src/components/ui/sidebar.tsx
````typescript
"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelLeftIcon } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div"> & React.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-label",
      sidebar: "group-label",
    },
  })
}

function SidebarGroupAction({
  className,
  render,
  ...props
}: useRender.ComponentProps<"button"> & React.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  })
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar()
  const comp = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  })

  if (!tooltip) {
    return comp
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      {comp}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  render,
  showOnHover = false,
  ...props
}: useRender.ComponentProps<"button"> &
  React.ComponentProps<"button"> & {
    showOnHover?: boolean
  }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
          showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-action",
      sidebar: "menu-action",
    },
  })
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md"
    isActive?: boolean
  }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
````

## File: src/components/ui/skeleton.tsx
````typescript
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
````

## File: src/components/ui/sonner.tsx
````typescript
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
````

## File: src/components/ui/table.tsx
````typescript
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
````

## File: src/components/ui/tabs.tsx
````typescript
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
````

## File: src/components/ui/textarea.tsx
````typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
````

## File: src/components/ui/toggle-group.tsx
````typescript
import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
````

## File: src/components/ui/toggle.tsx
````typescript
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
````

## File: src/components/ui/tooltip.tsx
````typescript
"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
````

## File: src/components/app-sidebar.tsx
````typescript
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SendToBack } from "lucide-react"
import pages from "@/pages"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <SendToBack className="size-5!" />
              <span className="text-base font-semibold">Financial Advisor</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
````

## File: src/components/chat-markdown.tsx
````typescript
import { memo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { cn } from "@/lib/utils";

/**
 * Renders LLM/user message content as proper HTML:
 * - remark-breaks: single newlines become <br> (LLMs rarely emit blank lines
 *   between every sentence, so soft breaks must be preserved).
 * - remark-gfm: tables, strikethrough, task lists, autolinks.
 * - Every block element is explicitly styled so it looks right inside a
 *   chat bubble (and in dark mode) instead of using browser defaults.
 *
 * Only http(s)/mailto links are kept; every other URL scheme is stripped
 * so a crafted message can't produce javascript:/vbscript: links.
 */
const urlTransform = (url: string) =>
  /^(https?:|mailto:)/i.test(url) ? url : undefined;

const components: Components = {
  p: ({ children }) => (
    <p className="whitespace-normal last:mb-0 [&:not(:last-child)]:mb-2">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="mb-2 text-lg font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-3">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-1.5 text-base font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-1.5 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2.5">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-1 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h4>
  ),
  h5: ({ children }) => (
    <h5 className="mb-1 text-sm font-semibold leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h5>
  ),
  h6: ({ children }) => (
    <h6 className="mb-1 text-xs font-semibold uppercase tracking-wide leading-tight first:mt-0 [&:not(:first-child)]:mt-2">
      {children}
    </h6>
  ),
  ul: ({ children }) => (
    <ul className="my-1 list-disc space-y-0.5 pl-5 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-1 list-decimal space-y-0.5 pl-5 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="line-through opacity-70">{children}</del>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-1.5 border-l-2 border-border pl-3 opacity-80 last:mb-0 [&:not(:last-child)]:mb-1.5">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-2 border-border" />,
  table: ({ children }) => (
    <div className="my-1.5 max-w-full overflow-x-auto last:mb-0 [&:not(:last-child)]:mb-1.5">
      <table className="w-full border-collapse text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border/60 last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-2 py-1 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-2 py-1 align-top">{children}</td>
  ),
  code: ({ className, children }) => {
    const isBlock =
      typeof className === "string" && className.includes("language-");
    if (isBlock) {
      return (
        <code className="block overflow-x-auto bg-muted/70 p-2.5 font-mono text-xs leading-relaxed">
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-muted/70 px-1 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-1.5 max-w-full overflow-x-auto rounded-md border border-border bg-muted/40 p-0 last:mb-0 [&:not(:last-child)]:mb-1.5 [&_code]:block [&_code]:bg-transparent [&_code]:px-2.5 [&_code]:py-2 [&_code]:rounded-none [&_code]:text-xs">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="max-w-full rounded-md" />
  ),
  input: (props) => (
    <input {...props} disabled className="mr-1 align-middle" />
  ),
};

export const ChatMarkdown = memo(function ChatMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("text-sm leading-relaxed break-words", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        urlTransform={urlTransform}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
````

## File: src/components/nav-user.tsx
````typescript
import {
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LucideCog } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function NavUser() {
  const navigate = useNavigate();
  return (
    <SidebarMenu className="border-t pt-2">
      <SidebarMenuButton tooltip="Open settings" onClick={() => navigate('/settings')}>
        <LucideCog />
        <span>Settings</span>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}
````

## File: src/components/site-header.tsx
````typescript
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">Documents</h1>
      </div>
    </header>
  )
}
````

## File: src/hooks/use-channel.ts
````typescript
import { useState, useEffect, useCallback } from "react";
import { channelsRepo, type Channel } from "@/lib/db/chat";

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);

  const refresh = useCallback(async () => {
    setChannels(await channelsRepo.list());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createChannel = useCallback(
    async (name: string) => {
      await channelsRepo.create(name);
      await refresh();
    },
    [refresh]
  );

  const deleteChannel = useCallback(
    async (id: string) => {
      await channelsRepo.delete(id);
      await refresh();
    },
    [refresh]
  );

  return { channels, createChannel, deleteChannel };
}
````

## File: src/hooks/use-conversation.ts
````typescript
import { useState, useEffect, useCallback } from "react";
import {
  conversationsRepo,
  messagesRepo,
  type Conversation,
  type StoredMessage,
} from "@/lib/db/chat";

export function useConversation(channelId: string) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const convo = await conversationsRepo.getOrCreateLatest(channelId);
      const history = await messagesRepo.listByConversation(convo.id);
      if (!cancelled) {
        setConversation(convo);
        setMessages(history);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [channelId]);

  const appendMessage = useCallback(
    async (role: StoredMessage["role"], content: string) => {
      if (!conversation) return;
      const saved = await messagesRepo.insert(conversation.id, role, content);
      setMessages((prev) => [...prev, saved]);
      return saved;
    },
    [conversation]
  );

  const clearHistory = useCallback(async () => {
    if (!conversation) return;
    await messagesRepo.clear(conversation.id);
    setMessages([]);
  }, [conversation]);

  return { conversation, messages, loading, appendMessage, clearHistory };
}
````

## File: src/hooks/use-mobile.ts
````typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
````

## File: src/hooks/use-pagename.ts
````typescript

````

## File: src/lib/db/client.ts
````typescript
import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:app.db");
  }
  return dbInstance;
}
````

## File: src/lib/db/learn.ts
````typescript
import { generateId } from "../utils";
import { getDb } from "./client";
import type {
  Deck,
  Flashcard,
  FlashcardProgress,
  Guide,
  GuideSource,
  GuideStep,
  StoredDeck,
  StoredGuide,
} from "@/types";

function parseGuide(row: StoredGuide): Guide {
  const safeParse = <T,>(json: string, fallback: T): T => {
    try {
      return JSON.parse(json) as T;
    } catch {
      return fallback;
    }
  };
  return {
    id: row.id,
    topic: row.topic,
    title: row.title,
    summary: row.summary,
    steps: safeParse<GuideStep[]>(row.steps, []),
    keyTakeaways: safeParse<string[]>(row.key_takeaways, []),
    sources: safeParse<GuideSource[]>(row.sources, []),
    grounded: row.grounded === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const guidesRepo = {
  async list(): Promise<Guide[]> {
    const db = await getDb();
    const rows = await db.select<StoredGuide[]>(
      "SELECT * FROM guides ORDER BY created_at DESC"
    );
    return rows.map(parseGuide);
  },

  async get(id: string): Promise<Guide | null> {
    const db = await getDb();
    const rows = await db.select<StoredGuide[]>(
      "SELECT * FROM guides WHERE id = ?",
      [id]
    );
    return rows[0] ? parseGuide(rows[0]) : null;
  },

  async create(input: {
    topic: string;
    title: string;
    summary: string;
    steps: GuideStep[];
    keyTakeaways: string[];
    sources: GuideSource[];
    grounded: boolean;
  }): Promise<Guide> {
    const db = await getDb();
    const now = Date.now();
    const guide: Guide = {
      id: generateId(),
      topic: input.topic,
      title: input.title,
      summary: input.summary,
      steps: input.steps,
      keyTakeaways: input.keyTakeaways,
      sources: input.sources,
      grounded: input.grounded,
      createdAt: now,
      updatedAt: now,
    };
    await db.execute(
      `INSERT INTO guides (id, topic, title, summary, steps, key_takeaways, sources, grounded, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        guide.id,
        guide.topic,
        guide.title,
        guide.summary,
        JSON.stringify(guide.steps),
        JSON.stringify(guide.keyTakeaways),
        JSON.stringify(guide.sources),
        guide.grounded ? 1 : 0,
        guide.createdAt,
        guide.updatedAt,
      ]
    );
    return guide;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM guides WHERE id = ?", [id]);
  },
};

// ---------------------------------------------------------------------------
// Flashcard decks
// ---------------------------------------------------------------------------

function parseDeck(row: StoredDeck): Deck {
  let cards: Flashcard[] = [];
  try {
    cards = JSON.parse(row.cards) as Flashcard[];
  } catch {
    cards = [];
  }
  return { id: row.id, topic: row.topic, cards, createdAt: row.created_at };
}

export const decksRepo = {
  async list(): Promise<Deck[]> {
    const db = await getDb();
    const rows = await db.select<StoredDeck[]>(
      "SELECT * FROM flashcard_decks ORDER BY created_at DESC"
    );
    return rows.map(parseDeck);
  },

  async create(topic: string, cards: Flashcard[]): Promise<Deck> {
    const db = await getDb();
    const deck: Deck = {
      id: generateId(),
      topic,
      cards,
      createdAt: Date.now(),
    };
    await db.execute(
      "INSERT INTO flashcard_decks (id, topic, cards, created_at) VALUES (?, ?, ?, ?)",
      [deck.id, deck.topic, JSON.stringify(deck.cards), deck.createdAt]
    );
    return deck;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    // plugin-sql migrations don't guarantee PRAGMA foreign_keys=ON, so
    // cascade manually.
    await db.execute("DELETE FROM flashcard_progress WHERE deck_id = ?", [id]);
    await db.execute("DELETE FROM flashcard_decks WHERE id = ?", [id]);
  },
};

// ---------------------------------------------------------------------------
// Flashcard review progress (Leitner boxes)
// ---------------------------------------------------------------------------

// Box intervals in hours: box 0 -> today, box 1 -> ~1 day, box 2 -> ~3 days.
const BOX_INTERVALS_HOURS = [0.25, 24, 72];
export const MAX_BOX = BOX_INTERVALS_HOURS.length - 1;

function dueAtForBox(box: number): number {
  return Date.now() + BOX_INTERVALS_HOURS[box] * 3600 * 1000;
}

export const progressRepo = {
  /** All progress rows for a deck. */
  async listForDeck(deckId: string): Promise<FlashcardProgress[]> {
    const db = await getDb();
    return db.select<FlashcardProgress[]>(
      "SELECT * FROM flashcard_progress WHERE deck_id = ?",
      [deckId]
    );
  },

  /** Card indices due for review now (box 0 cards are always due). */
  async dueCardIds(deckId: string): Promise<string[]> {
    const db = await getDb();
    const rows = await db.select<Pick<FlashcardProgress, "card_id">[]>(
      "SELECT card_id FROM flashcard_progress WHERE deck_id = ? AND (box_level = 0 OR due_at <= ?)",
      [deckId, Date.now()]
    );
    return rows.map((r) => r.card_id);
  },

  /** Number of cards not yet due (for "N cards scheduled later" UI). */
  async scheduledCount(deckId: string): Promise<number> {
    const db = await getDb();
    const rows = await db.select<{ n: number }[]>(
      "SELECT COUNT(*) as n FROM flashcard_progress WHERE deck_id = ? AND box_level > 0 AND due_at > ?",
      [deckId, Date.now()]
    );
    return rows[0]?.n ?? 0;
  },

  /**
   * Record a review: 'got_it' promotes the box (and due date);
   * 'again' resets to box 0 (due immediately).
   */
  async record(
    deckId: string,
    cardId: string,
    gotIt: boolean
  ): Promise<void> {
    const db = await getDb();
    const rows = await db.select<Pick<FlashcardProgress, "box_level">[]>(
      "SELECT box_level FROM flashcard_progress WHERE deck_id = ? AND card_id = ?",
      [deckId, cardId]
    );
    const current = rows[0]?.box_level ?? 0;
    const nextBox = gotIt ? Math.min(current + 1, MAX_BOX) : 0;
    const now = Date.now();

    await db.execute(
      `INSERT INTO flashcard_progress (deck_id, card_id, box_level, due_at, last_reviewed_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(deck_id, card_id) DO UPDATE SET
         box_level = excluded.box_level,
         due_at = excluded.due_at,
         last_reviewed_at = excluded.last_reviewed_at`,
      [deckId, cardId, nextBox, dueAtForBox(nextBox), now]
    );
  },
};
````

## File: src/lib/data.ts
````typescript
export const API_BASE_URL = "http://127.0.0.1:8721";

export const TICKER_OPTIONS = [
  { label: "Apple (AAPL)", value: "AAPL" },
  { label: "Microsoft (MSFT)", value: "MSFT" },
  { label: "Google (GOOGL)", value: "GOOGL" },
  { label: "NVIDIA (NVDA)", value: "NVDA" },
  { label: "Tesla (TSLA)", value: "TSLA" },
  { label: "Amazon (AMZN)", value: "AMZN" },
  { label: "Meta (META)", value: "META" },
];
````

## File: src/lib/llm-sync.ts
````typescript
import { API_BASE_URL } from "@/lib/data";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";
import { DEFAULT_LLM_MODEL, DEFAULT_LLM_PROVIDER } from "@/hooks/use-llm";

/**
 * On app launch, re-apply the user's saved LLM provider/model to the
 * backend. The backend keeps its active selection in memory, so this
 * covers sidecar restarts that would otherwise reset it to the default.
 *
 * Fire-and-forget: failures are logged and never block app startup.
 */
export async function syncLlmSettingsOnLaunch(): Promise<void> {
  try {
    const [provider, model] = await Promise.all([
      settingsRepo.get(SETTINGS_KEYS.llmProvider),
      settingsRepo.get(SETTINGS_KEYS.llmModel),
    ]);

    if (!model) return; // nothing saved yet -> keep backend defaults

    const activeRes = await fetch(`${API_BASE_URL}/llm/providers`);
    if (!activeRes.ok) return;
    const activeData = await activeRes.json();
    const activeProvider = activeData?.active?.provider ?? DEFAULT_LLM_PROVIDER;
    const activeModel = activeData?.active?.model ?? DEFAULT_LLM_MODEL;

    const savedProvider = provider ?? DEFAULT_LLM_PROVIDER;
    if (savedProvider === activeProvider && model === activeModel) return;

    const res = await fetch(`${API_BASE_URL}/llm/model`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: savedProvider, model }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      console.warn(
        "Saved LLM model could not be re-applied:",
        data?.detail ?? res.status
      );
    }
  } catch (e) {
    console.warn("LLM settings sync skipped:", e);
  }
}
````

## File: src/pages/learn/flashcards.tsx
````typescript
import { useCallback, useEffect, useState } from "react";
import {
  Check,
  Layers,
  Loader2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMarkdown } from "@/components/chat-markdown";
import { cn } from "@/lib/utils";
import { decksRepo, progressRepo } from "@/lib/db/learn";
import { TopicSuggestions, generateFlashcardsApi } from "./learn";
import { Deck } from "@/types";

interface FlashcardsTabProps {
  decks: Deck[];
  onRefresh: () => Promise<void>;
}

interface SessionCard {
  cardId: string; // index within the deck as string
  front: string;
  back: string;
}

export function FlashcardsTab({ decks, onRefresh }: FlashcardsTabProps) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studying, setStudying] = useState<{
    deck: Deck;
    cards: SessionCard[];
  } | null>(null);

  /** Open a study session with the due-first queue for this deck. */
  const startSession = useCallback(async (deck: Deck) => {
    const cards = await buildQueue(deck);
    setStudying({ deck, cards });
  }, []);

  async function handleGenerate(t: string) {
    const trimmed = t.trim();
    if (!trimmed || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const { cards } = await generateFlashcardsApi(trimmed, 10);
      const deck = await decksRepo.create(trimmed, cards);
      await onRefresh();
      await startSession(deck);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate flashcards.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id: string) {
    await decksRepo.delete(id);
    setStudying((s) => (s && s.deck.id === id ? null : s));
    await onRefresh();
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate(topic)}
          placeholder="Enter a topic to build a flashcard deck, e.g. MACD..."
          disabled={generating}
          className="flex-1"
        />
        <Button onClick={() => handleGenerate(topic)} disabled={generating || !topic.trim()}>
          {generating ? (
            <Loader2 className="size-4 animate-spin mr-1.5" />
          ) : (
            <Sparkles className="size-4 mr-1.5" />
          )}
          {generating ? "Generating..." : "Generate deck"}
        </Button>
      </div>

      <TopicSuggestions onPick={(t) => { setTopic(t); handleGenerate(t); }} />

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {studying ? (
        <StudySession
          deck={studying.deck}
          queue={studying.cards}
          onClose={() => setStudying(null)}
        />
      ) : (
        <DeckLibrary decks={decks} onStudy={startSession} onDelete={handleDelete} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Deck library
// ---------------------------------------------------------------------------

function DeckLibrary({
  decks,
  onStudy,
  onDelete,
}: {
  decks: Deck[];
  onStudy: (deck: Deck) => void | Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [dueCounts, setDueCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        decks.map(async (d) => [d.id, (await progressRepo.dueCardIds(d.id)).length] as const)
      );
      if (!cancelled) setDueCounts(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
  }, [decks]);

  if (decks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        <Layers className="mx-auto size-8 opacity-40 mb-2" />
        Generate a deck above — cards are graded with spaced repetition so
        tricky concepts come back until they stick.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => {
        const due = dueCounts[deck.id] ?? 0;
        return (
          <div key={deck.id} className="group rounded-lg border p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium text-sm truncate">{deck.topic}</h4>
              <button
                type="button"
                onClick={() => onDelete(deck.id)}
                title="Delete deck"
                className="flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {deck.cards.length} cards
              {due > 0 ? ` · ${due} due now` : " · nothing due"}
            </p>
            <Button
              size="sm"
              variant={due > 0 ? "default" : "outline"}
              onClick={() => onStudy(deck)}
            >
              Study
            </Button>
          </div>
        );
      })}
    </div>
  );
}

// Session queue policy: due cards first (in deck order), then cards with no
// progress yet, then everything else. Simple + predictable, boxes handle the
// long-term scheduling.
async function buildQueue(deck: Deck): Promise<SessionCard[]> {
  const [dueIds, progressRows] = await Promise.all([
    progressRepo.dueCardIds(deck.id),
    progressRepo.listForDeck(deck.id),
  ]);
  const seen = new Set(progressRows.map((r) => r.card_id));

  const due = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => dueIds.includes(id));
  const fresh = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => !seen.has(id));
  const later = deck.cards
    .map((c, i) => ({ card: c, id: String(i) }))
    .filter(({ id }) => !dueIds.includes(id) && seen.has(id));

  const toCard = ({ card, id }: { card: { front: string; back: string }; id: string }) => ({
    cardId: id,
    front: card.front,
    back: card.back,
  });
  return [...due, ...fresh, ...later].map(toCard);
}

function StudySession({
  deck,
  queue: initialQueue,
  onClose,
}: {
  deck: Deck;
  queue: SessionCard[];
  onClose: () => void;
}) {
  const [queue] = useState<SessionCard[]>(initialQueue);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [gotIt, setGotIt] = useState(0);
  const [done, setDone] = useState(false);

  const card = queue[current];
  const total = queue.length;

  const grade = useCallback(
    async (ok: boolean) => {
      if (!card) return;
      await progressRepo.record(deck.id, card.cardId, ok);
      setReviewed((r) => r + 1);
      if (ok) setGotIt((g) => g + 1);
      setFlipped(false);
      if (current + 1 >= total) {
        setDone(true);
      } else {
        setCurrent((c) => c + 1);
      }
    },
    [card, current, total, deck.id]
  );

  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  if (done) {
    return (
      <div className="rounded-lg border p-8 text-center space-y-3">
        <Check className="mx-auto size-10 text-primary" />
        <h3 className="text-lg font-semibold">Session complete!</h3>
        <p className="text-sm text-muted-foreground">
          {gotIt} of {reviewed} cards marked as known
          {reviewed - gotIt > 0
            ? ` — the other ${reviewed - gotIt} will come back soon.`
            : "."}
        </p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={onClose}>
            Back to decks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">{deck.topic}</h3>
          <p className="text-xs text-muted-foreground">
            Card {current + 1} of {total} · {reviewed} reviewed
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="size-4" /> End session
        </Button>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "w-full rounded-lg border-2 p-8 text-left min-h-44 flex flex-col justify-center transition-colors cursor-pointer",
          flipped ? "border-primary/40 bg-primary/5" : "hover:bg-accent/40"
        )}
      >
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
          {flipped ? "Answer" : "Question — click or press Space to flip"}
        </span>
        {flipped ? (
          <ChatMarkdown content={card.back} className="text-base" />
        ) : (
          <span className="text-lg font-medium">{card.front}</span>
        )}
      </button>

      {flipped && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            onClick={() => grade(false)}
          >
            <X className="size-4 mr-1.5" /> Review again
          </Button>
          <Button className="flex-1" onClick={() => grade(true)}>
            <Check className="size-4 mr-1.5" /> Got it
          </Button>
        </div>
      )}
    </div>
  );
}
````

## File: src/pages/learn/guide-view.tsx
````typescript
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Lightbulb,
  ListChecks,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMarkdown } from "@/components/chat-markdown";
import { cn } from "@/lib/utils";
import { guidesRepo } from "@/lib/db/learn";
import { TopicSuggestions, generateGuideApi } from "./learn";
import { Guide } from "@/types";

interface GuideTabProps {
  guides: Guide[];
  onRefresh: () => Promise<void>;
}

export function GuideTab({ guides, onRefresh }: GuideTabProps) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  async function handleGenerate(t: string) {
    const trimmed = t.trim();
    if (!trimmed || generating) return;
    setGenerating(true);
    setError(null);
    try {
      const guide = await generateGuideApi(trimmed);
      const saved = await guidesRepo.create({
        topic: trimmed,
        title: guide.title,
        summary: guide.summary,
        steps: guide.steps,
        keyTakeaways: guide.key_takeaways ?? [],
        sources: guide.sources ?? [],
        grounded: !!guide.grounded,
      });
      setActiveGuide(saved);
      await onRefresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate the guide.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id: string) {
    await guidesRepo.delete(id);
    setActiveGuide((g) => (g && g.id === id ? null : g));
    await onRefresh();
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Topic input row */}
      <div className="flex gap-2">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate(topic)}
          placeholder="Enter a topic to learn, e.g. RSI or dollar-cost averaging..."
          disabled={generating}
          className="flex-1"
        />
        <Button onClick={() => handleGenerate(topic)} disabled={generating || !topic.trim()}>
          {generating ? (
            <Loader2 className="size-4 animate-spin mr-1.5" />
          ) : (
            <Sparkles className="size-4 mr-1.5" />
          )}
          {generating ? "Generating..." : "Generate guide"}
        </Button>
      </div>

      <TopicSuggestions onPick={(t) => { setTopic(t); handleGenerate(t); }} />

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        {/* Reader / placeholder */}
        <div className="min-w-0">
          {generating && <GeneratingNotice />}
          {!generating && activeGuide && <GuideReader guide={activeGuide} />}
          {!generating && !activeGuide && (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              <BookOpen className="mx-auto size-8 opacity-40 mb-2" />
              Pick a topic above and the guide will appear here —
              grounded in Wikipedia sources and taught step by step.
            </div>
          )}
        </div>

        {/* Library */}
        <GuideLibrary
          guides={guides}
          activeId={activeGuide?.id ?? null}
          onOpen={(g) => setActiveGuide(g)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

function GeneratingNotice() {
  return (
    <div className="rounded-lg border p-6 space-y-2" aria-busy="true">
      <p className="text-sm font-medium flex items-center gap-2">
        <Loader2 className="size-4 animate-spin" /> Fetching reference material and
        writing your guide...
      </p>
      <p className="text-xs text-muted-foreground">
        Large local models can take a minute or two on the first run.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stepper reader
// ---------------------------------------------------------------------------

function GuideReader({ guide }: { guide: Guide }) {
  const [stepIndex, setStepIndex] = useState(0);
  const total = guide.steps.length;

  const next = useCallback(
    () => setStepIndex((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  // Keyboard navigation: <- / -> moves between steps.
  const handleKey = useRef<(e: KeyboardEvent) => void>(() => {});
  handleKey.current = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => handleKey.current(e);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Reset to the first step when switching guides.
  useEffect(() => {
    setStepIndex(0);
  }, [guide.id]);

  const isLast = stepIndex === total - 1;
  const pct = total > 1 ? (stepIndex / (total - 1)) * 100 : 100;
  const grounded = guide.grounded;
  const sources = guide.sources ?? [];

  return (
    <article className="rounded-lg border p-5">
      {/* Header */}
      <header className="mb-4">
        <h3 className="text-xl font-semibold leading-tight">{guide.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{guide.summary}</p>
        {!grounded && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <TriangleAlert className="size-3.5" />
            Reference sources could not be fetched — this guide relies on the
            model's own knowledge, so double-check specific figures.
          </p>
        )}
      </header>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>
            Step {stepIndex + 1} of {total}
          </span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Step rail + content */}
      <div className="flex gap-4">
        <ol className="flex flex-col gap-1 shrink-0 w-36" aria-label="Guide steps">
          {guide.steps.map((s, i) => {
            const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setStepIndex(i)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors cursor-pointer",
                    state === "current"
                      ? "bg-primary text-primary-foreground font-medium"
                      : state === "done"
                        ? "text-muted-foreground hover:bg-accent"
                        : "text-muted-foreground/60 hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
                      state === "done"
                        ? "border-primary/40 text-primary"
                        : state === "current"
                          ? "border-primary-foreground/40"
                          : "border-border"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0 flex-1 rounded-md bg-muted/40 p-4">
          <h4 className="font-semibold text-sm mb-2">
            {stepIndex + 1}. {guide.steps[stepIndex].title}
          </h4>
          <ChatMarkdown content={guide.steps[stepIndex].content} className="text-sm" />
        </div>
      </div>

      {/* Prev / Next */}
      <div className="mt-4 flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={prev} disabled={stepIndex === 0}>
          <ChevronLeft className="size-4 mr-1" /> Previous
        </Button>
        {isLast ? (
          <Button size="sm" onClick={() => setStepIndex(0)}>
            <RefreshCw className="size-4 mr-1" /> Start over
          </Button>
        ) : (
          <Button size="sm" onClick={next}>
            Next <ChevronRight className="size-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Key takeaways */}
      {guide.keyTakeaways.length > 0 && (
        <section className="mt-5 rounded-md border border-primary/25 bg-primary/5 p-4">
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
            <Lightbulb className="size-4" /> Key takeaways
          </h4>
          <ul className="space-y-1 text-sm">
            {guide.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-2">
                <ListChecks className="size-4 mt-0.5 shrink-0 text-primary/70" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <section className="mt-4">
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2">
            <Globe className="size-4" /> Sources
          </h4>
          <ul className="space-y-1">
            {sources.map((s, i) => (
              <li key={i} className="text-xs">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 inline-flex items-center gap-1"
                >
                  [{i + 1}] {s.title} <ExternalLink className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Library sidebar
// ---------------------------------------------------------------------------

function GuideLibrary({
  guides,
  activeId,
  onOpen,
  onDelete,
}: {
  guides: Guide[];
  activeId: string | null;
  onOpen: (g: Guide) => void;
  onDelete: (id: string) => Promise<void>;
}) {
  if (guides.length === 0) {
    return (
      <aside className="rounded-lg border p-4 text-xs text-muted-foreground h-fit">
        <h4 className="font-medium text-foreground mb-1">Your guides</h4>
        Guides you generate are saved here for quick access.
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border h-fit">
      <h4 className="font-medium text-sm px-3 pt-3 pb-1">Your guides</h4>
      <ScrollArea className="max-h-[420px]">
        <ul className="p-1.5 space-y-0.5">
          {guides.map((g) => (
            <li
              key={g.id}
              className={cn(
                "group flex items-center gap-1 rounded-md text-xs",
                g.id === activeId && "bg-accent"
              )}
            >
              <button
                type="button"
                onClick={() => onOpen(g)}
                className="flex-1 text-left px-2 py-1.5 min-w-0 cursor-pointer"
              >
                <span className="block truncate font-medium">{g.title}</span>
                <span className="block truncate text-muted-foreground">
                  {g.topic} · {g.steps.length} steps
                </span>
              </button>
              <button
                type="button"
                onClick={() => onDelete(g.id)}
                title="Delete guide"
                className="mr-1 flex size-6 items-center justify-center rounded text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </aside>
  );
}
````

## File: src/pages/learn/learn.tsx
````typescript
import { useCallback, useEffect, useState } from "react";
import { GraduationCap, Layers, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { API_BASE_URL } from "@/lib/data";
import {
  decksRepo,
  guidesRepo,
} from "@/lib/db/learn";
import type { Deck, GeneratedGuide, Guide } from "@/types";
import { GuideTab } from "./guide-view";
import { FlashcardsTab } from "./flashcards";

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const detail =
      (data && (typeof data.detail === "string" ? data.detail : data.detail?.detail)) ||
      `Request failed (${res.status})`;
    throw new ApiError(res.status, detail);
  }
  return data as T;
}

/** Fire a guide generation request against the sidecar. */
export function generateGuideApi(topic: string): Promise<GeneratedGuide> {
  return postJson<GeneratedGuide>("/learn/guide", { topic });
}

/** Fire a flashcards generation request against the sidecar. */
export function generateFlashcardsApi(
  topic: string,
  count = 10
): Promise<{ topic: string; cards: { front: string; back: string }[] }> {
  return postJson<{ topic: string; cards: { front: string; back: string }[] }>(
    "/learn/flashcards",
    { topic, count }
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

const TOPIC_SUGGESTIONS = [
  "RSI",
  "MACD",
  "Bollinger Bands",
  "ETFs",
  "P/E ratio",
  "Diversification",
  "Dollar-cost averaging",
  "Stop-loss",
];

export function TopicSuggestions({ onPick }: { onPick: (topic: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TOPIC_SUGGESTIONS.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onPick(t)}
          className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// Page

export default function Learn() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);

  const refreshGuides = useCallback(async () => {
    try {
      setGuides(await guidesRepo.list());
    } catch (e) {
      console.error("Failed to load guides:", e);
    }
  }, []);

  const refreshDecks = useCallback(async () => {
    try {
      setDecks(await decksRepo.list());
    } catch (e) {
      console.error("Failed to load decks:", e);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all([refreshGuides(), refreshDecks()]);
      setLibraryLoading(false);
    })();
  }, [refreshGuides, refreshDecks]);

  if (libraryLoading) {
    return (
      <div className="space-y-4">
        <LearnHeader />
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LearnHeader />

      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guides">
            <BookOpen className="size-4 mr-1.5" /> Guides
          </TabsTrigger>
          <TabsTrigger value="flashcards">
            <Layers className="size-4 mr-1.5" /> Flashcards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <GuideTab guides={guides} onRefresh={refreshGuides} />
        </TabsContent>

        <TabsContent value="flashcards">
          <FlashcardsTab decks={decks} onRefresh={refreshDecks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LearnHeader() {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
        <GraduationCap className="size-6" /> Learn
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        Step-by-step lessons grounded in reference sources, plus flashcards to make
        the concepts stick.
      </p>
    </div>
  );
}
````

## File: src/pages/settings/index.tsx
````typescript
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainSettings } from "./main-settings";
import { TrainModel } from "./train-model";
import { ViewModels } from "./view-models";

export default function Settings() {
  return (
    <div className="space-y-6 container mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure application preferences, train reinforcement learning agents, and view trained models.
        </p>
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="main">Main Settings</TabsTrigger>
          <TabsTrigger value="train">Train Agent</TabsTrigger>
          <TabsTrigger value="models">View Trained Models</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <MainSettings />
        </TabsContent>

        <TabsContent value="train">
          <TrainModel />
        </TabsContent>

        <TabsContent value="models">
          <ViewModels />
        </TabsContent>
      </Tabs>
    </div>
  );
}
````

## File: src/pages/settings/view-models.tsx
````typescript
import { useEffect, useState } from "react";
import { modelsRepo, TrainedModel } from "@/lib/db/model";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ViewModels = () => {
  const [models, setModels] = useState<TrainedModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  async function loadModels() {
    setLoadingModels(true);
    try {
      const data = await modelsRepo.list();
      setModels(data);
    } catch (e) {
      console.error("Failed to load models", e);
    } finally {
      setLoadingModels(false);
    }
  }

  async function handleDeleteModel(id: string) {
    try {
      await modelsRepo.delete(id);
      await loadModels();
    } catch (e) {
      console.error("Failed to delete model", e);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trained Models Database</CardTitle>
        <CardDescription>
          List of trained reinforcement learning models stored on this device.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingModels ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading models...</p>
        ) : models.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No models found in database.</p>
        ) : (
          <div className="space-y-3">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="space-y-1">
                  <p className="font-medium text-sm">{model.model_name}</p>
                  <p className="text-xs text-muted-foreground">
                    Tickers: <span className="text-foreground font-mono">{model.tickers}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Range: {model.start_date} to {model.end_date}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Created: {new Date(model.created_at).toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteModel(model.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
````

## File: src-py/llm/__init__.py
````python

````

## File: src-py/llm/learn.py
````python
"""
Learn feature: LLM-driven educational content generation.

- generate_guide: a step-by-step guide grounded in retrieved reference
  material (RAG-style) for accuracy and low divergence between runs.
- generate_flashcards: question/answer pairs for a topic

DISCLAIMER: Core functionality was created using Generative AI due to
time constraints following the delayed user surveys. This permits more
appropriate evaluation and fulfilling of the goals set forth in the
project's scope.
"""

import json
import re
from typing import Any

from llm.main import chat
from llm.retrieval import fetch_reference_material, format_reference_block

# Low temperature: grounding + low temperature = minimal divergence between regenerations
GUIDE_TEMPERATURE = 0.3
FLASHCARD_TEMPERATURE = 0.5

GUIDE_SYSTEM_PROMPT = """You are a financial education author writing short, step-by-step lessons.
You will receive a topic and numbered reference material.

Rules:
- Teach STEP BY STEP: each step introduces ONE idea, in the order a beginner needs it.
- Use ONLY facts present in the reference material. Do not invent numbers, dates, or formulas.
- If the reference material is insufficient for some part, cover what you can and note the gap in that step's content.
- Define any jargon the first time it appears.
- Prefer concrete examples over abstract statements.
- Keep language simple: the reader is not a finance expert.
- Output ONLY valid JSON. No markdown fences, no commentary.

JSON shape (all keys required):
{
  "title": "short lesson title",
  "summary": "2-3 sentence overview",
  "steps": [
    {"title": "step title", "content": "3-8 sentences teaching this step. May use markdown lists/bold for readability."}
  ],
  "key_takeaways": ["short takeaway 1", "short takeaway 2", "..."],
  "grounded": true/false
}
Set "grounded" to true only if the steps rely on the reference material; false if you had to rely on your own knowledge."""

FLASHCARD_SYSTEM_PROMPT = """You are a financial education author creating study flashcards.
Rules:
- Each card tests ONE concept: a definition, an interpretation, or a common pitfall.
- Fronts are short questions or prompts; backs are concise answers (1-3 sentences).
- Output ONLY valid JSON. No markdown fences, no commentary.

JSON shape:
{"cards": [{"front": "question", "back": "answer"}, ...]}"""


def _extract_json(text: str) -> str:
    """
    Pull a JSON object/array out of an LLM reply.
    """
    text = text.strip()
    # Prefer fenced blocks when present.
    fence = re.search(r"```(?:json)?\s*(.*?)```", text, flags=re.DOTALL)
    if fence:
        text = fence.group(1).strip()

    for opener, closer in (("{", "}"), ("[", "]")):
        start = text.find(opener)
        if start == -1:
            continue
        depth = 0
        in_string = False
        escape = False
        for i in range(start, len(text)):
            ch = text[i]
            if escape:
                escape = False
                continue
            if ch == "\\":
                escape = True
                continue
            if ch == '"':
                in_string = not in_string
                continue
            if in_string:
                continue
            if ch == opener:
                depth += 1
            elif ch == closer:
                depth -= 1
                if depth == 0:
                    return text[start : i + 1]
        # Unbalanced - try the next opener type.
    raise ValueError("The model did not return valid JSON. Try again or pick another model.")


def _parse_json_reply(raw: str) -> Any:
    try:
        return json.loads(_extract_json(raw))
    except json.JSONDecodeError as e:
        raise ValueError(
            f"The model's reply was not parseable JSON ({e}). Try again or pick another model."
        ) from e


def _validate_guide(data: Any) -> dict[str, Any]:
    if not isinstance(data, dict):
        raise TypeError("Guide JSON must be an object.")
    steps = data.get("steps")
    if not isinstance(steps, list) or len(steps) == 0:
        raise ValueError("Guide JSON must contain a non-empty 'steps' array.")

    cleaned_steps = []
    for s in steps:
        if not isinstance(s, dict) or not s.get("title") or not s.get("content"):
            raise ValueError("Each guide step needs 'title' and 'content'.")
        cleaned_steps.append(
            {"title": str(s["title"]), "content": str(s["content"])}
        )

    takeaways = data.get("key_takeaways", [])
    if not isinstance(takeaways, list):
        takeaways = []

    return {
        "title": str(data.get("title") or "Untitled guide"),
        "summary": str(data.get("summary") or ""),
        "steps": cleaned_steps,
        "key_takeaways": [str(t) for t in takeaways if str(t).strip()],
        "grounded": bool(data.get("grounded", False)),
    }


def generate_guide(
    topic: str,
    reference_material: list[dict[str, Any]] | None = None,
    model: str | None = None,
    provider_id: str | None = None,
) -> dict[str, Any]:
    """
    Generate a step-by-step guide for a topic, grounded in reference material.
    """
    topic = (topic or "").strip()
    if not topic:
        raise ValueError("Topic is required.")

    sources = (
        reference_material
        if reference_material is not None
        else fetch_reference_material(topic)
    )
    reference_block = format_reference_block(sources)

    if reference_block:
        user_prompt = f"""Topic: {topic}

Reference material:
{reference_block}

Write the step-by-step lesson for this topic based on the reference material above.
Output only the JSON object."""
    else:
        user_prompt = f"""Topic: {topic}

No reference material could be retrieved. Write the lesson from your own knowledge,
be conservative: stick to well-established concepts and avoid specific figures.
Output only the JSON object."""

    raw = chat(
        GUIDE_SYSTEM_PROMPT,
        user_prompt,
        model=model,
        provider_id=provider_id,
        temperature=GUIDE_TEMPERATURE,
    )
    guide = _validate_guide(_parse_json_reply(raw))

    # Fallback: if the model claims grounded but retrieval failed (or vice
    # versa), trust the retrieval result for the flag we show the user.
    guide["grounded"] = bool(sources) and bool(guide["grounded"])
    guide["sources"] = sources
    return guide


def _validate_flashcards(data: Any) -> list[dict[str, str]]:
    cards = data.get("cards") if isinstance(data, dict) else data
    if not isinstance(cards, list) or len(cards) == 0:
        raise ValueError("Flashcard JSON must contain a non-empty 'cards' array.")
    cleaned = []
    for c in cards:
        if not isinstance(c, dict) or not c.get("front") or not c.get("back"):
            raise ValueError("Each flashcard needs 'front' and 'back'.")
        cleaned.append({"front": str(c["front"]), "back": str(c["back"])})
    return cleaned


def generate_flashcards(
    topic: str,
    count: int = 10,
    model: str | None = None,
    provider_id: str | None = None,
) -> list[dict[str, str]]:
    """Generate `count` question/answer flashcards for a topic."""
    topic = (topic or "").strip()
    if not topic:
        raise ValueError("Topic is required.")
    count = max(3, min(int(count or 10), 25))

    user_prompt = f"""Topic: {topic}

Create {count} flashcards for studying this topic.
Mix question types: definitions, how-to-interpret, and common mistakes.
Output only the JSON object."""

    raw = chat(
        FLASHCARD_SYSTEM_PROMPT,
        user_prompt,
        model=model,
        provider_id=provider_id,
        temperature=FLASHCARD_TEMPERATURE,
    )
    return _validate_flashcards(_parse_json_reply(raw))
````

## File: src-py/llm/providers.py
````python
"""
LLM provider abstraction layer.

Every backend the app can talk to implements `LLMProvider` and is
registered in `PROVIDER_REGISTRY`. The FastAPI layer and the frontend
only ever see provider ids, so adding a new backend (e.g. hosted
providers like OpenAI or Anthropic) means implementing one class and
registering it - no API or UI rework needed.

Currently implemented:
- ollama: local, free models via a local Ollama server.

Planned (stubs, registered but disabled):
- openai / anthropic: paid hosted providers, requiring API keys.
"""

import os
import shutil
import subprocess
import sys
import time
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Dict, List

import requests

OLLAMA_BASE = "http://localhost:11434"
DEFAULT_OLLAMA_MODEL = "0xroyce/plutus"


# ---------------------------------------------------------------------------
# Provider contract
# ---------------------------------------------------------------------------
class LLMProvider(ABC):
    """Contract shared by every LLM backend (local or hosted)."""

    id: str = ""
    display_name: str = ""
    # Whether the backend is wired up and selectable in the UI right now.
    available: bool = False
    # Shown in the UI when the provider is not available yet.
    setup_hint: str = ""

    def start(self) -> None:
        """Ensure the backend is ready to serve requests.

        No-op by default; local providers override this to launch their server.
        """

    @abstractmethod
    def is_available(self) -> bool:
        """Whether this provider can currently serve requests."""

    @abstractmethod
    def list_models(self) -> List[Dict[str, Any]]:
        """Models this provider can currently serve."""

    def has_model(self, model: str) -> bool:
        """Whether a specific model is usable right now.

        Providers that cannot check cheaply return True and let the
        request fail with a meaningful error instead.
        """
        return True

    @abstractmethod
    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        """Run a single chat completion and return the reply text."""


# ---------------------------------------------------------------------------
# Ollama (local, free) - fully implemented
# ---------------------------------------------------------------------------
def _get_base_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent


def get_ollama_binary_path() -> Path:
    base = _get_base_dir()
    binary_name = "ollama.exe" if sys.platform == "win32" else "ollama"
    return base / "ollama" / binary_name


def get_models_dir() -> Path:
    models_dir = _get_base_dir() / "ollama" / "models"
    models_dir.mkdir(parents=True, exist_ok=True)
    return models_dir


def _find_ollama_binary() -> Path | None:
    """Prefer the vendored binary, fall back to a system-wide install on PATH."""
    vendored = get_ollama_binary_path()
    if vendored.exists():
        return vendored
    found = shutil.which("ollama")
    return Path(found) if found else None


def ensure_ollama_running(timeout: int = 20, base_url: str = OLLAMA_BASE) -> None:
    """
    Start an Ollama server if one isn't already running.

    Tries the vendored binary first, then a system-wide `ollama` install.
    Raises FileNotFoundError when no binary can be found.
    """
    try:
        requests.get(base_url, timeout=2)
        return  # already running
    except requests.exceptions.ConnectionError:
        pass

    ollama_path = _find_ollama_binary()
    if ollama_path is None:
        raise FileNotFoundError(
            f"No running Ollama server found at {base_url} and no ollama "
            "binary found (vendored or on PATH). Install Ollama from "
            "https://ollama.com and make sure it is running."
        )

    print(f"[Ollama] Starting server from {ollama_path} ...")
    env = os.environ.copy()
    env["OLLAMA_MODELS"] = str(get_models_dir())

    creationflags = subprocess.CREATE_NO_WINDOW if sys.platform == "win32" else 0
    subprocess.Popen(
        [str(ollama_path), "serve"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        env=env,
        creationflags=creationflags,
    )

    for _ in range(timeout):
        try:
            requests.get(base_url, timeout=2)
            print("[Ollama] Server is up.")
            return
        except requests.exceptions.ConnectionError:
            time.sleep(1)

    raise RuntimeError("Ollama server did not start in time.")


class OllamaProvider(LLMProvider):
    id = "ollama"
    display_name = "Ollama (local)"
    available = True
    setup_hint = ""

    def __init__(self, base_url: str = OLLAMA_BASE):
        self.base_url = base_url
        self._started = False

    def start(self) -> None:
        """Ensure a local Ollama server is running. Safe to call repeatedly."""
        if self._started and self.is_available():
            return
        ensure_ollama_running(base_url=self.base_url)
        self._started = True

    def is_available(self) -> bool:
        try:
            requests.get(self.base_url, timeout=2)
            return True
        except requests.exceptions.ConnectionError:
            return False

    def list_models(self) -> List[Dict[str, Any]]:
        resp = requests.get(f"{self.base_url}/api/tags", timeout=5)
        resp.raise_for_status()
        models: List[Dict[str, Any]] = []
        for m in resp.json().get("models", []):
            details = m.get("details") or {}
            models.append(
                {
                    "name": m.get("name"),
                    "size": m.get("size"),
                    "parameter_size": details.get("parameter_size"),
                    "quantization_level": details.get("quantization_level"),
                    "family": details.get("family"),
                }
            )
        return models

    def has_model(self, model: str) -> bool:
        names = [m["name"] for m in self.list_models()]
        return any(model == n or n.startswith(f"{model}:") for n in names)

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        payload = {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "options": {"temperature": temperature},
            "stream": stream,
        }
        response = requests.post(
            f"{self.base_url}/api/chat", json=payload, timeout=120
        )
        response.raise_for_status()
        return response.json()["message"]["content"]


# ---------------------------------------------------------------------------
# Hosted providers - planned for a future release (stubs)
# ---------------------------------------------------------------------------
class _RemoteProviderStub(LLMProvider):
    """
    Placeholder for a hosted provider.

    To enable one: implement list_models() and chat() (API-key handling
    included), flip `available` to True, and the registry/UI pick it up
    automatically.
    """

    def __init__(self, provider_id: str, display_name: str, setup_hint: str):
        self.id = provider_id
        self.display_name = display_name
        self.setup_hint = setup_hint
        self.available = False

    def is_available(self) -> bool:
        return False

    def list_models(self) -> List[Dict[str, Any]]:
        raise NotImplementedError(
            f"{self.display_name} support is planned for a future release."
        )

    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        model: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        raise NotImplementedError(
            f"{self.display_name} support is planned for a future release."
        )


class OpenAIProvider(_RemoteProviderStub):
    def __init__(self):
        super().__init__(
            "openai",
            "OpenAI (ChatGPT)",
            "Requires an OpenAI API key - coming soon.",
        )


class AnthropicProvider(_RemoteProviderStub):
    def __init__(self):
        super().__init__(
            "anthropic",
            "Anthropic (Claude)",
            "Requires an Anthropic API key - coming soon.",
        )


# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------
PROVIDER_REGISTRY: Dict[str, LLMProvider] = {
    "ollama": OllamaProvider(),
    "openai": OpenAIProvider(),
    "anthropic": AnthropicProvider(),
}


def get_provider(provider_id: str) -> LLMProvider:
    provider = PROVIDER_REGISTRY.get(provider_id)
    if provider is None:
        raise KeyError(f"Unknown LLM provider: '{provider_id}'")
    return provider


def list_providers() -> List[Dict[str, Any]]:
    """Serialized provider descriptors for the API/frontend."""
    return [
        {
            "id": p.id,
            "name": p.display_name,
            "available": p.available,
            "status": p.is_available() if p.available else False,
            "setup_hint": p.setup_hint,
        }
        for p in PROVIDER_REGISTRY.values()
    ]
````

## File: src-py/llm/retrieval.py
````python
"""
Retrieval layer for the Learn page.

Fetches external reference material (currently Wikipedia) so that LLM
guide generation can be grounded in real sources instead of pure model
memory. This keeps step-by-step guides accurate and reduces divergence
between regenerations of the same topic.

DISCLAIMER: Core functionality was created using Generative AI due to
time constraints following the delayed user surveys. This permits more
appropriate evaluation and fulfilling of the goals set forth in the
project's scope.
"""

import re
from typing import Any

import requests

WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php"
USER_AGENT = "FinancialAdvisorApp/0.1 (learn feature; local desktop app)"

# Per-source and total character budgets (keeps context small-model friendly).
PER_SOURCE_CHAR_BUDGET = 2_000
TOTAL_CHAR_BUDGET = 6_000

MAX_SOURCES = 3

# Finance topics are often known by acronym - map common ones to the
# article titles Wikipedia actually uses.
TOPIC_QUERY_OVERRIDES: dict[str, str] = {
    "rsi": "Relative strength index",
    "macd": "MACD",
    "bollinger bands": "Bollinger Bands",
    "bb": "Bollinger Bands",
    "p/e": "Price–earnings ratio",
    "pe ratio": "Price–earnings ratio",
    "p/e ratio": "Price–earnings ratio",
    "dca": "Dollar cost averaging",
    "dollar-cost averaging": "Dollar cost averaging",
    "etf": "Exchange-traded fund",
    "etfs": "Exchange-traded fund",
    "ema": "Moving average",
    "sma": "Moving average",
    "cagr": "Compound annual growth rate",
    "div yield": "Dividend yield",
    "eps": "Earnings per share",
    "yolo": "Year-over-year",
}

_WIKI_URL_CACHE: dict[str, str] = {}


def _clean_extract(text: str) -> str:
    """Strip typical Wikipedia boilerplate noise from a plain-text extract."""
    # Collapse excessive whitespace/newlines.
    text = re.sub(r"\n{2,}", "\n", text or "")
    text = re.sub(r"[ \t]{2,}", " ", text)
    # Drop common list/annotation artifacts.
    text = re.sub(r"^\s*[•\-]\s*", "", text, flags=re.MULTILINE)
    return text.strip()


def _search_titles(query: str, limit: int = MAX_SOURCES + 2) -> list[str]:
    """Opensearch: returns titles best matching the query."""
    resp = requests.get(
        WIKIPEDIA_API,
        params={
            "action": "opensearch",
            "search": query,
            "limit": limit,
            "namespace": 0,
            "format": "json",
        },
        headers={"User-Agent": USER_AGENT},
        timeout=8,
    )
    resp.raise_for_status()
    data = resp.json()
    # opensearch returns [query, [titles], [descriptions], [urls]]
    titles = data[1] if len(data) > 1 else []
    return list(titles)


def _fetch_extract(title: str) -> dict[str, Any] | None:
    """Plain-text extract for a single article title."""
    resp = requests.get(
        WIKIPEDIA_API,
        params={
            "action": "query",
            "prop": "extracts",
            "explaintext": 1,
            "redirects": 1,
            "titles": title,
            "format": "json",
            "formatversion": 2,
        },
        headers={"User-Agent": USER_AGENT},
        timeout=8,
    )
    resp.raise_for_status()
    pages = resp.json().get("query", {}).get("pages", [])
    if not pages:
        return None
    page = pages[0]
    if page.get("missing") or not page.get("extract"):
        return None

    title = page.get("title", title)
    extract = _clean_extract(page["extract"])
    url = _WIKI_URL_CACHE.get(title) or (
        f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
    )
    return {"title": title, "url": url, "extract": extract}


def fetch_reference_material(topic: str) -> list[dict[str, Any]]:
    """
    Retrieve reference material for a topic.

    Returns an empty list on any failure
    """
    topic = (topic or "").strip()
    if not topic:
        return []

    query = TOPIC_QUERY_OVERRIDES.get(topic.lower(), topic)

    try:
        titles = _search_titles(query)
    except Exception:  # noqa: BLE001 - retrieval must never crash generation
        return []

    sources: list[dict[str, Any]] = []
    used_chars = 0

    for title in titles:
        if len(sources) >= MAX_SOURCES or used_chars >= TOTAL_CHAR_BUDGET:
            break
        try:
            source = _fetch_extract(title)
        except Exception:  # noqa: BLE001 - skip broken sources, keep going
            continue
        if not source:
            continue

        remaining_budget = TOTAL_CHAR_BUDGET - used_chars
        extract = source["extract"][: min(PER_SOURCE_CHAR_BUDGET, remaining_budget)]
        if len(extract) < 120:
            continue  # skip trivially short extracts

        source["extract"] = extract
        used_chars += len(extract)
        sources.append(source)

    return sources


def format_reference_block(sources: list[dict[str, Any]]) -> str:
    """Render retrieved sources as a numbered reference block for the prompt."""
    if not sources:
        return ""
    parts = []
    for i, s in enumerate(sources, start=1):
        parts.append(f'[{i}] "{s["title"]}"\n{s["extract"]}')
    return "\n\n".join(parts)
````

## File: src-py/rl_pipeline/__init__.py
````python

````

## File: src-py/rl_pipeline/backtest.py
````python
import math
import numpy as np
import backtrader as bt
import matplotlib.pyplot as plt

from config import LOOKBACK, COMMISSION, MAX_WEIGHT, BUDGET, OUTPUT_DIR, EVAL_START, EVAL_END

class RLStrategy(bt.Strategy):
    params = (
        ("model", None),
        ("feat", None),
        ("closes", None),
        ("tickers", None)
    )

    def __init__(self):
        self._bar = 0
        self._dmap = { d._name: d for d in self.datas }

    def _build_obs(self) -> np.ndarray | None:
        if self._bar < LOOKBACK:
            return None

        windows = []

        for t in self.p.tickers:
            w = self.p.feat[t][self._bar - LOOKBACK: self._bar]
            mn, mx = w.min(0, keepdims=True), w.max(0, keepdims=True)
            windows.append(((w - mn) / (mx - mn + 1e-9)).flatten())

        prices = np.array([self.p.closes[t][self._bar] for t in self.p.tickers], np.float32)
        shares = np.array([self.getposition(self._dmap[t]).size for t in self.p.tickers], np.float32)
        total = self.broker.getvalue()
        wts = (shares * prices) / (total + 1e-9)
        cash_r = np.array([self.broker.getcash() / (total + 1e-9)], np.float32)

        return np.concatenate(windows + [wts, cash_r]).astype(np.float32)

    def next(self):
        obs = self._build_obs()
        if obs is None:
            self._bar += 1
            return

        action, _ = self.p.model.predict(obs, deterministic=True)
        for i, ticker in enumerate(self.p.tickers):
            d = self._dmap.get(ticker)

            if d is None: continue

            a = float(action[i])

            if a > 0.05:
                self.order_target_percent(d, target=min(a, MAX_WEIGHT))

            elif a < -0.05 and self.getposition(d).size > 0:
                cur = self.getposition(d).size
                self.order_target_size(d, target=max(cur * (1 + a), 0))

        self._bar += 1

class BuyAndHold(bt.Strategy):
    def __init__(self): self._done = False

    def next(self):
        if not self._done:
            for d in self.datas:
                self.order_target_percent(d, target=1.0 / len(self.datas))

            self._done = True

def run_backtest_suite(model, eval_data: dict, tickers: list, eval_feat: dict, eval_closes: dict):
    """
    Executes execution tracking and builds final metric comparisons.
    """
    def setup_cerebro():
        c = bt.Cerebro(stdstats=False)
        c.broker.setcash(BUDGET)
        c.broker.setcommission(commission=COMMISSION)

        for ticker, df in eval_data.items():
            ohlcv = df[["Open","High","Low","Close","Volume"]].copy()
            ohlcv.columns = ["open","high","low","close","volume"]
            ohlcv["openinterest"] = 0.0
            c.adddata(bt.feeds.PandasData(dataname=ohlcv, name=ticker))

        c.addanalyzer(bt.analyzers.SharpeRatio, _name="sr", riskfreerate=0.05/252, annualize=True)
        c.addanalyzer(bt.analyzers.DrawDown, _name="dd")
        c.addanalyzer(bt.analyzers.TradeAnalyzer, _name="ta")
        c.addanalyzer(bt.analyzers.TimeReturn, _name="tr")

        return c

    # agent engine execution
    c_rl = setup_cerebro()
    c_rl.addstrategy(RLStrategy, model=model, feat=eval_feat, closes=eval_closes, tickers=tickers)
    rl_strat = c_rl.run()[0]

    # benchmark execution run
    c_bh = setup_cerebro()
    c_bh.addstrategy(BuyAndHold)
    bh_strat = c_bh.run()[0]

    return extract_performance_data(rl_strat, bh_strat, c_rl.broker.getvalue(), c_bh.broker.getvalue())

def extract_performance_data(rl_strat, bh_strat, rl_end, bh_end):
    """
    Processes historical metrics from structural return paths.
    """
    sr = rl_strat.analyzers.sr.get_analysis().get("sharperatio") or 0.0
    dd = rl_strat.analyzers.dd.get_analysis().max.drawdown
    ta = rl_strat.analyzers.ta.get_analysis()
    tr_rl = rl_strat.analyzers.tr.get_analysis()
    tr_bh = bh_strat.analyzers.tr.get_analysis()

    n_trades = int(ta.get("total", {}).get("closed", 0))
    n_won = int(ta.get("won", {}).get("total", 0))
    rl_ret_pct = (rl_end - BUDGET) / BUDGET * 100
    bh_ret_pct = (bh_end - BUDGET) / BUDGET * 100
    vol_ann = np.array(list(tr_rl.values()), dtype=np.float64).std() * math.sqrt(252) * 100

    # save equity curve graph (used in prototyping)
    # save_equity_curve(tr_rl, tr_bh)

    return {
        # RL agent return metrics
        "rl_return_pct": rl_ret_pct,    # (%) total percentage return
        "rl_end_val": rl_end,           # ($) final portfolio dollar value

        # Buy & Hold return metrics
        "bh_return_pct": bh_ret_pct,    # (%) total percentage return
        "bh_end_val": bh_end,           # ($) final portfolio dollar value

        "max_drawdown": dd,             # (%) worst peak-to-trough drop - biggest decline following a climb
        "volatility": vol_ann,          # (%) annualized portfolio volatility (~risk) based on daily standard deviation

        "sharpe": sr,                   #     sharpe ratio (risk-adjusted return metric; higher is better)
        "trades": n_trades,             #     total number of round-trip trades completed and closed by the agent
        "won": n_won,                   #     total number of completed trades that resulted in a positive financial profit
        "tr_rl": tr_rl                  #     dict mapping daily dates to raw returns, used for equity path construction
    }

def save_equity_curve(tr_rl, tr_bh):
    """
    Renders visual baseline tracking comparisons.
    """
    def to_eq(tr_dict):
        v, d_out, v_out = BUDGET, [], []

        for d, r in sorted(tr_dict.items()):
            v *= (1 + r)
            d_out.append(d); v_out.append(v)

        return d_out, v_out

    rl_d, rl_v = to_eq(tr_rl)
    bh_d, bh_v = to_eq(tr_bh)

    fig, ax = plt.subplots(figsize=(12, 5))
    ax.plot(rl_d, rl_v, label="RL Agent", linewidth=1.5)
    ax.plot(bh_d, bh_v, label="Buy-and-Hold", linewidth=1.5, linestyle="--")
    ax.axhline(BUDGET, color="grey", linewidth=0.8, linestyle=":")
    ax.set_title(f"Equity Curve - {EVAL_START} to {EVAL_END}")
    ax.set_ylabel("Portfolio Value ($)")
    ax.legend(); ax.grid(alpha=0.3)

    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "equity_curve.png", dpi=120)
    plt.close()
````

## File: src-py/rl_pipeline/environment.py
````python
import math
import gymnasium as gym
import numpy as np
import pandas as pd
from gymnasium import spaces

from config import BUDGET, LOOKBACK, N_FEAT, FEATURE_COLS, COMMISSION, MAX_WEIGHT

class TradingEnv(gym.Env):
    """
    Custom standard multi-stock operational environment tracking cash vectors.
    """
    def __init__(self, data: dict[str, pd.DataFrame], budget: float = BUDGET):
        super().__init__()
        self.tickers = list(data.keys())
        self.n = len(self.tickers)
        self.budget = budget

        idx = None
        for df in data.values():
            idx = df.index if idx is None else idx.intersection(df.index)
            
        self.dates = sorted(idx)

        self.feat = {t: data[t].loc[self.dates, FEATURE_COLS].values.astype(np.float32) for t in self.tickers}
        self.closes = {t: data[t].loc[self.dates, "Close"].values.astype(np.float32) for t in self.tickers}

        obs_size = self.n * LOOKBACK * N_FEAT + self.n + 1
        self.observation_space = spaces.Box(-np.inf, np.inf, (obs_size,), np.float32)
        self.action_space = spaces.Box(-1.0, 1.0, (self.n,), np.float32)
        self._reset_state()

    def _reset_state(self):
        self._i = LOOKBACK
        self._shares = np.zeros(self.n, np.float32)
        self._cash = float(self.budget)
        self._prev_v = float(self.budget)

    def _value(self, i: int) -> float:
        prices = np.array([self.closes[t][i] for t in self.tickers])
        
        return float(self._cash + self._shares @ prices)

    def _obs(self) -> np.ndarray:
        windows = []
        for t in self.tickers:
            w = self.feat[t][self._i - LOOKBACK: self._i]
            mn = w.min(0, keepdims=True)
            mx = w.max(0, keepdims=True)
            windows.append(((w - mn) / (mx - mn + 1e-9)).flatten())

        prices = np.array([self.closes[t][self._i] for t in self.tickers])
        v = self._value(self._i)
        weights = (self._shares * prices) / (v + 1e-9)
        cash_r = np.array([self._cash / (v + 1e-9)], np.float32)
        
        return np.concatenate(windows + [weights, cash_r]).astype(np.float32)

    def reset(self, *, seed=None, options=None):
        super().reset(seed=seed)
        self._reset_state()
        
        return self._obs(), {}

    def step(self, action):
        prices = np.array([self.closes[t][self._i] for t in self.tickers])
        total = self._value(self._i)

        for i, a in enumerate(action):
            if a < -0.05 and self._shares[i] > 0:
                sell = self._shares[i] * abs(float(a))
                self._cash += (sell * prices[i]) * (1 - COMMISSION)
                self._shares[i] -= sell

        for i, a in enumerate(action):
            if a > 0.05:
                target = min(float(a), MAX_WEIGHT) * total
                current = self._shares[i] * prices[i]
                spend = min(max(target - current, 0), self._cash * 0.99)
                self._shares[i] += spend / (prices[i] + 1e-9)
                self._cash -= spend * (1 + COMMISSION)

        self._cash = max(self._cash, 0.0)
        self._i += 1
        new_v = self._value(self._i)
        reward = math.log(new_v / (self._prev_v + 1e-9))
        self._prev_v = new_v

        done = self._i >= len(self.dates) - 1

        return self._obs(), reward, done, False, {}
````

## File: src-py/utils/__init__.py
````python

````

## File: src-py/app.spec
````
# -*- mode: python ; coding: utf-8 -*-
from PyInstaller.utils.hooks import collect_all

datas, binaries, hiddenimports = collect_all('stable_baselines3')

a = Analysis(
    ['main.py'],
    pathex=[],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports,
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='app',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
````

## File: src-py/recommendations.json
````json
{
  "budget": 5000.0,
  "cash_remaining": 4171.08,
  "eval_period": "2025-01-01 -> 2026-06-01",
  "backtest_summary": {
    "rl_return_pct": 40.08,
    "bh_return_pct": 40.12,
    "sharpe": 1.45,
    "max_drawdown_pct": 17.88
  },
  "allocations": [
    {
      "ticker": "NVDA",
      "action": "BUY",
      "price": 210.89,
      "shares": 3.9305,
      "dollar_value": 828.92,
      "pct_of_budget": 16.6,
      "rsi": 46.3,
      "macd_hist": -2.1629,
      "bb_pct": 0.391
    },
    {
      "ticker": "AAPL",
      "action": "SELL",
      "price": 312.06,
      "shares": 0.0,
      "dollar_value": 0.0,
      "pct_of_budget": 0.0,
      "rsi": 84.3,
      "macd_hist": 0.6151,
      "bb_pct": 0.843
    },
    {
      "ticker": "MSFT",
      "action": "SELL",
      "price": 450.24,
      "shares": 0.0,
      "dollar_value": 0.0,
      "pct_of_budget": 0.0,
      "rsi": 71.7,
      "macd_hist": 1.7733,
      "bb_pct": 1.366
    }
  ]
}
````

## File: src/components/nav-main.tsx
````typescript
import { useState } from "react";
import { ChevronRight, Plus, MoreHorizontal, Trash2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavElement } from "@/types";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useChannels } from "@/hooks/use-channel";

export function NavMain({
  items,
}: {
  items: NavElement[]
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            if (item.hidenav) return null;
            const isActive = location.pathname === item.url;

            if (item.expandable) {
              return (
                <ChatNavItem
                  key={item.title}
                  item={item}
                  isActive={isActive}
                />
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => navigate(item.url)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ChatNavItem({
  item,
  isActive,
}: {
  item: NavElement;
  isActive: boolean;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { channels, createChannel, deleteChannel } = useChannels();

  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(isActive);

  const activeChannelId = searchParams.get("channel") ?? "general";

  function submitNewChannel() {
    const name = newName.trim();
    if (name) createChannel(name);
    setNewName("");
    setCreating(false);

    navigate(`${item.url}?channel=${encodeURIComponent(name)}`);
  }

  async function handleDeleteChannel(id: string) {
    if (!deleteChannel) return;

    await deleteChannel(id);

    if (activeChannelId === id) {
      const remainingChannels = channels.filter((c) => c.id !== id);
      const fallbackId = remainingChannels[0]?.id ?? "general";
      navigate(`${item.url}?channel=${fallbackId}`);
    }
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="group/collapsible w-full"
      >
        <SidebarMenuButton
          tooltip={item.title}
          isActive={isActive}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {item.icon}
          <span>{item.title}</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>

        <CollapsibleContent>
          <SidebarMenuSub>
            {channels?.map((subItem) => {
              const isSubItemActive = isActive && activeChannelId === subItem.id;

              return (
                <SidebarMenuSubItem
                  key={subItem.id}
                  className="group/subitem relative flex items-center"
                >
                  <SidebarMenuSubButton
                    isActive={isSubItemActive}
                    onClick={() => navigate(`${item.url}?channel=${subItem.id}`)}
                    className="w-full pr-8" /* pr-8 ensures long names don't overlap the action icon */
                  >
                    <span className="truncate">{subItem.name}</span>
                  </SidebarMenuSubButton>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-1 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover/subitem:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-opacity"
                        title="Channel Options"
                      >
                        <MoreHorizontal className="size-3.5" />
                        <span className="sr-only">More options</span>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChannel(subItem.id);
                        }}
                      >
                        <Trash2 className="size-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuSubItem>
              );
            })}

            <SidebarSeparator className="my-1" />

            <SidebarMenuSubItem>
              {creating ? (
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitNewChannel();
                    if (e.key === "Escape") setCreating(false);
                  }}
                  onBlur={submitNewChannel}
                  placeholder="Channel name..."
                  className="w-full px-2 py-1 mt-1 text-xs rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              ) : (
                <SidebarMenuSubButton
                  onClick={() => setCreating(true)}
                  className="text-muted-foreground mt-1"
                >
                  <Plus className="size-3.5 mr-1" />
                  <span>New channel</span>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
````

## File: src/hooks/use-llm.ts
````typescript
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/data";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";
import type { LlmProviderInfo, OllamaModelInfo } from "@/types";

export type { LlmProviderInfo, OllamaModelInfo } from "@/types";

export const DEFAULT_LLM_PROVIDER = "ollama";
export const DEFAULT_LLM_MODEL = "0xroyce/plutus";

/** Humanize a byte size, e.g. 4_700_000_000 -> "4.4 GB". */
export function humanizeSize(bytes: number | null): string {
  if (bytes == null || Number.isNaN(bytes)) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export function useLlm() {
  const [providers, setProviders] = useState<LlmProviderInfo[]>([]);
  const [models, setModels] = useState<OllamaModelInfo[]>([]);
  const [activeProvider, setActiveProvider] = useState<string>(DEFAULT_LLM_PROVIDER);
  const [activeModel, setActiveModel] = useState<string>(DEFAULT_LLM_MODEL);
  const [ollamaRunning, setOllamaRunning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const [provRes, modelRes] = await Promise.all([
        fetch(`${API_BASE_URL}/llm/providers`),
        fetch(`${API_BASE_URL}/llm/models?provider=${DEFAULT_LLM_PROVIDER}`),
      ]);

      if (provRes.ok) {
        const data = await provRes.json();
        setProviders(data.providers ?? []);
        if (data.active?.provider) setActiveProvider(data.active.provider);
        if (data.active?.model) setActiveModel(data.active.model);
      }

      if (modelRes.ok) {
        const data = await modelRes.json();
        setModels(data.models ?? []);
        setOllamaRunning(Boolean(data.ollama_running));
        if (data.current_model) setActiveModel(data.current_model);
      } else if (modelRes.status === 503) {
        const data = await modelRes.json().catch(() => null);
        setOllamaRunning(false);
        setModels([]);
        if (data?.detail) setError(data.detail);
      }
    } catch {
      setError("Could not reach the analysis backend. Is the app running its sidecar?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /** Persist + apply a provider/model selection. Returns an error message or null. */
  const setProviderModel = useCallback(
    async (provider: string, model: string): Promise<string | null> => {
      try {
        const res = await fetch(`${API_BASE_URL}/llm/model`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, model }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          return data?.detail ?? `Failed to switch model (HTTP ${res.status}).`;
        }
        await settingsRepo.set(SETTINGS_KEYS.llmProvider, provider);
        await settingsRepo.set(SETTINGS_KEYS.llmModel, model);
        setActiveProvider(provider);
        setActiveModel(model);
        return null;
      } catch (e: any) {
        return e?.message ?? "Failed to reach the backend.";
      }
    },
    []
  );

  return {
    providers,
    models,
    activeProvider,
    activeModel,
    ollamaRunning,
    loading,
    error,
    refresh,
    setProviderModel,
  };
}
````

## File: src/lib/db/chat.ts
````typescript
import { generateId } from "../utils";
import { getDb } from "./client";
import type { Channel, Conversation, StoredMessage } from "@/types";

export const channelsRepo = {
  async list(): Promise<Channel[]> {
    const db = await getDb();
    return db.select<Channel[]>("SELECT * FROM channels ORDER BY created_at ASC");
  },

  async create(name: string): Promise<Channel> {
    const db = await getDb();
    const channel: Channel = { id: generateId(), name, created_at: Date.now() };
    await db.execute(
      "INSERT INTO channels (id, name, created_at) VALUES (?, ?, ?)",
      [channel.id, channel.name, channel.created_at]
    );
    return channel;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute(
      "DELETE FROM channels WHERE id = ?",
      [id]
    );
  },
};

export const conversationsRepo = {
  async listByChannel(channelId: string): Promise<Conversation[]> {
    const db = await getDb();
    return db.select<Conversation[]>(
      "SELECT * FROM conversations WHERE channel_id = ? ORDER BY created_at DESC",
      [channelId]
    );
  },

  async create(channelId: string, title?: string): Promise<Conversation> {
    const db = await getDb();
    const convo: Conversation = {
      id: generateId(),
      channel_id: channelId,
      title: title ?? null,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO conversations (id, channel_id, title, created_at) VALUES (?, ?, ?, ?)",
      [convo.id, convo.channel_id, convo.title, convo.created_at]
    );
    return convo;
  },

  /** Convenience: get the most recent conversation for a channel, or create one. */
  async getOrCreateLatest(channelId: string): Promise<Conversation> {
    const existing = await this.listByChannel(channelId);
    if (existing.length > 0) return existing[0];
    return this.create(channelId);
  },
};

export const messagesRepo = {
  async listByConversation(conversationId: string): Promise<StoredMessage[]> {
    const db = await getDb();
    return db.select<StoredMessage[]>(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversationId]
    );
  },

  async insert(
    conversationId: string,
    role: StoredMessage["role"],
    content: string
  ): Promise<StoredMessage> {
    const db = await getDb();
    const msg: StoredMessage = {
      id: generateId(),
      conversation_id: conversationId,
      role,
      content,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO messages (id, conversation_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)",
      [msg.id, msg.conversation_id, msg.role, msg.content, msg.created_at]
    );
    return msg;
  },

  async clear(conversationId: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM messages WHERE conversation_id = ?", [conversationId]);
  },
};
````

## File: src/lib/db/model.ts
````typescript
import { generateId } from "../utils";
import { getDb } from "./client";
import type { TrainedModel } from "@/types";

export const modelsRepo = {
  async list(): Promise<TrainedModel[]> {
    const db = await getDb();
    return db.select<TrainedModel[]>(
      "SELECT * FROM trained_models ORDER BY created_at DESC"
    );
  },

  async create(data: Omit<TrainedModel, "id" | "created_at">): Promise<TrainedModel> {
    const db = await getDb();
    const model: TrainedModel = {
      id: generateId(),
      ...data,
      created_at: Date.now(),
    };
    await db.execute(
      "INSERT INTO trained_models (id, model_name, tickers, start_date, end_date, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [model.id, model.model_name, model.tickers, model.start_date, model.end_date, model.created_at]
    );
    return model;
  },

  async delete(id: string): Promise<void> {
    const db = await getDb();
    await db.execute("DELETE FROM trained_models WHERE id = ?", [id]);
  },

  async existsByName(modelName: string): Promise<boolean> {
    const db = await getDb();
    const results = await db.select<TrainedModel[]>(
      "SELECT id FROM trained_models WHERE LOWER(model_name) = LOWER(?) LIMIT 1",
      [modelName.trim()]
    );
    return results.length > 0;
  },
};
````

## File: src/lib/db/settings.ts
````typescript
import { getDb } from "./client";
import type { AppSetting } from "@/types";

export const SETTINGS_KEYS = {
  llmProvider: "llm_provider",
  llmModel: "llm_model",
} as const;

export const settingsRepo = {
  async get(key: string): Promise<string | null> {
    const db = await getDb();
    const rows = await db.select<(AppSetting & { value: string | null })[]>(
      "SELECT key, value, updated_at FROM app_settings WHERE key = ?",
      [key]
    );
    return rows.length > 0 ? rows[0].value : null;
  },

  async set(key: string, value: string): Promise<void> {
    const db = await getDb();
    await db.execute(
      `INSERT INTO app_settings (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      [key, value, Date.now()]
    );
  },
};
````

## File: src/lib/utils.ts
````typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return crypto.randomUUID();
}
````

## File: src/pages/settings/main-settings.tsx
````typescript
import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { humanizeSize, useLlm } from "@/hooks/use-llm";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export const MainSettings = () => {
  const {
    providers,
    models,
    activeProvider,
    activeModel,
    ollamaRunning,
    loading,
    error,
    refresh,
    setProviderModel,
  } = useLlm();

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  const availableProviders = providers.filter((p) => p.available);
  const comingSoonProviders = providers.filter((p) => !p.available);
  const activeProviderInfo = providers.find((p) => p.id === activeProvider);

  async function handleProviderChange(providerId: string | null) {
    if (!providerId || providerId === activeProvider) return;
    const info = providers.find((p) => p.id === providerId);
    if (!info?.available) {
      setStatus({
        type: "info",
        message: info?.setup_hint || "This provider is not available yet.",
      });
      return;
    }
    setStatus({
      type: "info",
      message: `Switching provider to ${info.name}. Pick a model to apply it.`,
    });
    await refresh();
  }

  async function handleModelChange(modelName: string | null) {
    if (saving || !modelName) return;
    if (modelName === activeModel) return;
    setSaving(true);
    setStatus({ type: "info", message: `Switching model to ${modelName}...` });
    const err = await setProviderModel(activeProvider, modelName);
    if (err) {
      setStatus({ type: "error", message: err });
    } else {
      setStatus({
        type: "success",
        message: `Model switched to ${modelName}. New chats will use it immediately.`,
      });
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            LLM Provider
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={loading}
              title="Reload providers and downloaded models"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Choose which AI provider and model powers chat and recommendation
            explanations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="llm-provider">Provider</Label>
            <Select
              value={activeProvider}
              onValueChange={handleProviderChange}
              disabled={loading || availableProviders.length === 0}
            >
              <SelectTrigger id="llm-provider" className="w-full">
                <SelectValue placeholder={loading ? "Loading..." : "Select a provider"} />
              </SelectTrigger>
              <SelectContent>
                {availableProviders.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{p.name}</span>
                      {p.id === activeProvider && (
                        <span className="text-xs text-muted-foreground">active</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
                {comingSoonProviders.map((p) => (
                  <SelectItem key={p.id} value={p.id} disabled>
                    <div className="flex items-center justify-between gap-4">
                      <span>{p.name}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        Coming soon
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeProviderInfo && !activeProviderInfo.available && (
              <p className="text-xs text-muted-foreground">{activeProviderInfo.setup_hint}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="llm-model">Model</Label>
            <Select
              value={activeModel}
              onValueChange={handleModelChange}
              disabled={loading || saving || !ollamaRunning || models.length === 0}
            >
              <SelectTrigger id="llm-model" className="w-full">
                <SelectValue
                  placeholder={
                    loading
                      ? "Loading models..."
                      : !ollamaRunning
                      ? "Ollama is not running"
                      : models.length === 0
                      ? "No models downloaded"
                      : "Select a model"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.name} value={m.name}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {[
                          m.parameter_size,
                          m.quantization_level,
                          humanizeSize(m.size),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {models.length === 0 && !loading && (
              <p className="text-xs text-destructive">
                No models downloaded yet, see the instructions below.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${
                ollamaRunning ? "bg-emerald-500" : "bg-destructive"
              }`}
            />
            {ollamaRunning
              ? "Ollama server is running (localhost:11434)"
              : "Ollama server is not reachable, start Ollama and refresh"}
          </div>

          {error && (
            <div className="p-4 rounded-lg border text-sm bg-destructive/10 text-destructive border-destructive/20 whitespace-pre-wrap">
              {error}
            </div>
          )}

          {status && (
            <div
              className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
                status.type === "info"
                  ? "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                  : status.type === "success"
                  ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
                  : "bg-destructive/10 text-destructive border-destructive/20"
              }`}
            >
              {status.message}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Downloading more models</CardTitle>
          <CardDescription>
            Add models from the Ollama library, then pick them above.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Browse available models at{" "}
              <a
                href="https://ollama.com/library"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2"
              >
                ollama.com/library
              </a>
              .
            </li>
            <li>
              Open a terminal and pull the one you want:
              <pre className="mt-1 rounded bg-muted px-3 py-2 text-xs text-foreground overflow-x-auto">
                ollama pull {"<model-name>"}
              </pre>
            </li>
            <li>Click the refresh button above, the new model appears in the list.</li>
          </ol>
          <p>
            The default model is{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
              0xroyce/plutus
            </code>
            . Models stay on disk until removed with{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs text-foreground">
              ollama rm {"<model-name>"}
            </code>
            .
          </p>
          <p>
            Support for hosted providers such as OpenAI (ChatGPT) and Anthropic
            (Claude) is planned for a future release.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
````

## File: src/pages/settings/train-model.tsx
````typescript
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { API_BASE_URL, TICKER_OPTIONS } from "@/lib/data";
import { modelsRepo } from "@/lib/db/model";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

function generateName() {
  return `ppo_trading_model_${Date.now()}`
}

export const TrainModel = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [modelName, setModelName] = useState("");
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [openTickerSelect, setOpenTickerSelect] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

    function toggleTicker(tickerValue: string) {
      setSelectedTickers((prev) =>
        prev.includes(tickerValue)
          ? prev.filter((t) => t !== tickerValue)
          : [...prev, tickerValue]
      );
    }

  async function handleTrain(e: React.SubmitEvent) {
    e.preventDefault();
    if (loading) return;

    const finalModelName = modelName.trim().length === 0 ? generateName() : modelName.trim();

    try {
      const isDuplicate = await modelsRepo.existsByName(finalModelName);
      if (isDuplicate) {
        setStatus({
          type: "error",
          message: `A model named "${finalModelName}" already exists. Please choose a unique model name.`,
        });
        return;
      }
    } catch (err) {
      console.error("Failed to check duplicate model name", err);
    }

    if (selectedTickers.length === 0) {
      setStatus({
        type: "error",
        message: "Please select at least one ticker before starting training.",
      });
      return;
    }

    setLoading(true);
    setStatus({
      type: "info",
      message: "Initiating model training... This may take a few minutes.",
    });

    try {
      const payload = {
        model_name: finalModelName,
        tickers: selectedTickers,
        train_start: startDate,
        train_end: endDate,
      };

      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const validTickersStr = Array.isArray(data.valid_tickers)
          ? data.valid_tickers.join(", ")
          : selectedTickers.join(", ");

        await modelsRepo.create({
          model_name: finalModelName,
          tickers: validTickersStr,
          start_date: startDate,
          end_date: endDate,
        });

        setStatus({
          type: "success",
          message: `${data.message || "Training complete!"}\nModel: ${finalModelName}\nValid Tickers: ${validTickersStr}`,
        });
      } else {
        throw new Error(data.detail || "Unknown backend error");
      }
    } catch (e: any) {
      console.error("Training failed", e);
      setStatus({
        type: "error",
        message: `Training failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Train New Agent</CardTitle>
        <CardDescription>
          Specify parameters to trigger a new PPO training execution.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrain} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name</Label>
            <Input
              id="model-name"
              placeholder="e.g. PPO_v1_AAPL"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Tickers Selection<span className="text-red-500">*</span></Label>
            <Popover open={openTickerSelect} onOpenChange={setOpenTickerSelect}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTickerSelect}
                  className="w-full justify-between h-auto min-h-10 py-2 px-3 text-left font-normal"
                >
                  {selectedTickers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {selectedTickers.map((ticker) => (
                        <Badge
                          key={ticker}
                          variant="secondary"
                          className="text-xs font-mono flex items-center gap-1 pr-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTicker(ticker);
                          }}
                        >
                          {ticker}
                          <X className="h-3 w-3 hover:text-destructive cursor-pointer" />
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select ticker(s)...</span>
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search ticker..." />
                  <CommandList>
                    <CommandEmpty>No ticker found.</CommandEmpty>
                    <CommandGroup>
                      {TICKER_OPTIONS.map((option) => {
                        const isSelected = selectedTickers.includes(option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => toggleTicker(option.value)}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className="h-3 w-3" />
                            </div>
                            <span>{option.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Training..." : "Start Training"}
          </Button>
        </form>

        {status && (
          <div
            className={`mt-4 p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
              status.type === "info"
                ? "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                : status.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {status.message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
````

## File: src-py/rl_pipeline/data.py
````python
import pandas as pd
import yfinance as yf
import matplotlib
import matplotlib.pyplot as plt

from config import LOOKBACK, OUTPUT_DIR, bcolors

matplotlib.use("Agg")

def add_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Appends RSI, MACD, Bollinger Bands, and ATR technical features to the dataset.
    """
    c, h, l, v = df["Close"], df["High"], df["Low"], df["Volume"]

    # RSI-14
    delta = c.diff()
    df["rsi"] = 100 - 100 / (
        1 + delta.clip(lower=0).rolling(14).mean()
        / (-delta.clip(upper=0)).rolling(14).mean().replace(0, 1e-9)
    )

    # MACD histogram
    ema12 = c.ewm(span=12, adjust=False).mean()
    ema26 = c.ewm(span=26, adjust=False).mean()
    macd = ema12 - ema26
    df["macd_hist"] = macd - macd.ewm(span=9, adjust=False).mean()

    # Bollinger Band position (20-day, 2σ)
    sma = c.rolling(20).mean()
    std = c.rolling(20).std()
    df["bb_pct"] = (c - (sma - 2*std)) / (4*std + 1e-9)

    # ATR-14
    tr = pd.concat([h-l, (h-c.shift()).abs(), (l-c.shift()).abs()], axis=1).max(axis=1)
    df["atr"] = tr.rolling(14).mean()

    return df.dropna()

def download_market_data(tickers: list[str], start: str, end: str) -> dict[str, pd.DataFrame]:
    """
    Downloads time-series data and appends indicator columns.
    """
    datasets: dict[str, pd.DataFrame] = {}

    # print(f"  [{bcolors.OKCYAN}Data{bcolors.ENDC}] Downloading market data ({start} -> {end})")

    for ticker in tickers:
        raw = yf.download(ticker, start=start, end=end, progress=False, auto_adjust=True)
        if isinstance(raw.columns, pd.MultiIndex):
            raw.columns = raw.columns.get_level_values(0)

        if len(raw) < LOOKBACK + 30:
            continue

        df = add_indicators(raw.copy())
        datasets[ticker] = df

        # print(f"    - {ticker}: {len(df)} rows, "
        #       f"price range ${df['Close'].min():.0f}–${df['Close'].max():.0f}")

    return datasets

def save_diagnostic_chart(train_data: dict[str, pd.DataFrame], target_ticker: str):
    """
    Saves close price and RSI analytics for observation verification.
    """
    if target_ticker not in train_data:
        return

    df_vis = train_data[target_ticker]
    fig, axes = plt.subplots(2, 1, figsize=(12, 6), sharex=True)

    axes[0].plot(df_vis.index, df_vis["Close"], linewidth=1)
    axes[0].set_title(f"{target_ticker} - Closing Price (training period)")
    axes[0].set_ylabel("Price ($)")

    axes[1].plot(df_vis.index, df_vis["rsi"], color="orange", linewidth=1)
    axes[1].axhline(70, color="red", linestyle="--", linewidth=0.8, label="Overbought 70")
    axes[1].axhline(30, color="green", linestyle="--", linewidth=0.8, label="Oversold 30")
    axes[1].set_title("RSI-14")
    axes[1].set_ylabel("RSI")
    axes[1].legend()

    plt.tight_layout()
    chart_path = OUTPUT_DIR / "price_rsi.png"
    plt.savefig(chart_path, dpi=120)
    plt.close()
    print(f"  [{bcolors.OKCYAN}Data{bcolors.ENDC}] Diagnostic chart saved → {chart_path}")
````

## File: src-py/rl_pipeline/rl_agent.py
````python
from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

from rl_pipeline.environment import TradingEnv

from config import TIMESTEPS, OUTPUT_DIR, bcolors

def train_ppo_agent(train_data: dict) -> PPO:
    """
    Initializes and trains the Stable-Baselines3 model vectorization framework.
    """
    vec_env = make_vec_env(lambda: TradingEnv(train_data), n_envs=1)

    model = PPO(
        "MlpPolicy",
        vec_env,
        learning_rate = 3e-4,
        n_steps       = 256,
        batch_size    = 64,
        n_epochs      = 10,
        gamma         = 0.99,
        ent_coef      = 0.01,
        verbose       = 0,
        policy_kwargs = dict(net_arch=[128, 64]),
    )

    # print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Beginning network policy optimization optimization updates...\n")
    model.learn(total_timesteps=TIMESTEPS, progress_bar=True)

    model_path = OUTPUT_DIR / "poc_agent"
    model.save(model_path)
    # print()
    # print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Policy model weights binary serialized out to: {model_path}.zip")

    return model
````

## File: src-py/utils/path.py
````python
import argparse
from pathlib import Path

class StorageManager:
    base_dir: Path | None = None

    @classmethod
    def initialize(cls, path_str: str):
        """Call this exactly once when your sidecar boots up."""
        cls.base_dir = Path(path_str).resolve()
        cls.base_dir.mkdir(parents=True, exist_ok=True)

    @classmethod
    def get_path(cls, relative_path: str) -> Path:
        """
        Polishes a relative path, making it absolute against the base directory.
        """
        if cls.base_dir is None:
            raise RuntimeError("StorageManager not initialized. Call initialize() first.")

        target_path = (cls.base_dir / relative_path).resolve()

        if not target_path.is_relative_to(cls.base_dir):
            raise PermissionError(f"Path traversal attempt blocked: {relative_path}")

        return target_path


parser = argparse.ArgumentParser()
parser.add_argument('--data-dir', type=str, required=True)
args, _ = parser.parse_known_args()
StorageManager.initialize(args.data_dir)
````

## File: src-py/config.py
````python
import warnings

from utils.path import StorageManager

warnings.filterwarnings("ignore")

# assets & capital
TICKERS = ["AAPL", "MSFT", "NVDA"]
BUDGET = 5_000.0
# maximum share of portfolio capital per stock (40%)
MAX_WEIGHT = 0.40
# 0.1% per trade transaction execution
COMMISSION = 0.001

# time frames
TRAIN_START = "2021-01-01"
TRAIN_END = "2023-12-31"
EVAL_START = "2025-01-01"
EVAL_END = "2026-06-01"

# parameters
LOOKBACK = 20
TIMESTEPS = 30_000
FEATURE_COLS = ["Close", "rsi", "macd_hist", "bb_pct", "atr"]
N_FEAT = len(FEATURE_COLS)

# putput paths
OUTPUT_DIR = StorageManager.get_path("output")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Source - https://stackoverflow.com/a/287944
# Posted by joeld, modified by community. See post "Timeline" for change history
# Retrieved 2026-06-23, License - CC BY-SA 4.0

class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
````

## File: src/pages/index.tsx
````typescript
import { LayoutDashboardIcon, MessageCircleMore, Cog, ChartCandlestickIcon, GraduationCap } from "lucide-react"
import Chat from "./chat";
import Evaluation from "./eval";
import Learn from "./learn/learn";
import type { NavElement } from "@/types";
import Settings from "./settings";

export default [
  {
    title: "Dashboard",
    url: "/",
    icon: (
      <LayoutDashboardIcon />
    ),
    page: (
      <p>Nothing yet</p>
    ),
  },
  {
    title: "Chat",
    url: "/chat",
    icon: (
      <MessageCircleMore />
    ),
    page: (
      <Chat />
    ),
    expandable: true,
  },
  {
    title: "Evaluate",
    url: "/eval",
    icon: (
      <ChartCandlestickIcon />
    ),
    page: (
      <Evaluation />
    ),
  },
  {
    title: "Learn",
    url: "/learn",
    icon: (
      <GraduationCap />
    ),
    page: (
      <Learn />
    ),
  },
  {
    title: "Settings",
    url: "/settings",
    hidenav: true,
    icon: (
      <Cog />
    ),
    page: (
      <Settings />
    )
  },
] satisfies NavElement[];
````

## File: src/pages/eval.tsx
````typescript
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/lib/data";
import { modelsRepo, TrainedModel } from "@/lib/db/model";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Activity, ShieldAlert, Award } from "lucide-react";

interface Allocation {
  ticker: string;
  action: "BUY" | "SELL" | "HOLD";
  price: number;
  shares: number;
  dollar_value: number;
  pct_of_budget: number;
  rsi: number;
  macd_hist: number;
  bb_pct: number;
}

interface BacktestSummary {
  rl_return_pct: number;
  bh_return_pct: number;
  alpha_margin: number;
  sharpe: number;
  max_drawdown_pct: number;
}

interface EvaluationResult {
  budget: number;
  cash_remaining: number;
  eval_period: string;
  backtest_summary: BacktestSummary;
  allocations: Allocation[];
}

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Evaluation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [models, setModels] = useState<TrainedModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  async function loadModels() {
    setLoadingModels(true);
    try {
      const data = await modelsRepo.list();
      setModels(data);
      if (data.length > 0) {
        setSelectedModel(data[0].model_name);
      }
    } catch (e) {
      console.error("Failed to load models", e);
    } finally {
      setLoadingModels(false);
    }
  }

  async function handleEvaluate() {
    if (loading) return;

    if (!selectedModel) {
      setStatus({
        type: "error",
        message: "Please select a model to evaluate.",
      });
      return;
    }

    const modelObj = models.find((m) => m.model_name === selectedModel);
    const tickersList = modelObj?.tickers
      ? modelObj.tickers.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    setLoading(true);
    setStatus({ type: "info", message: `Evaluating model "${selectedModel}"...` });

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model_name: selectedModel,
          tickers: tickersList,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setEvalResult(data.data);
        setStatus({
          type: "success",
          message: `Evaluation Complete!\nRecommendations saved to:\n${data.json_path}`,
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
      }
    } catch (e: any) {
      console.error("Evaluation failed", e);
      setStatus({
        type: "error",
        message: `Evaluation failed: ${e.message}`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <ScrollArea className="min-h-0 px-3">
      <div className="space-y-6 container mx-auto pb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Evaluate Model
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Run the model against historical timeframes to generate backtest metrics and recommendations.
          </p>
        </div>

        <div className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="model-select">Select Trained Model</Label>
            <Select
              value={selectedModel}
              onValueChange={(value) => setSelectedModel(value ?? models[0]?.model_name)}
              disabled={loadingModels || loading || models.length === 0}
            >
              <SelectTrigger id="model-select" className="w-full">
                <SelectValue
                  placeholder={
                    loadingModels
                      ? "Loading models..."
                      : models.length === 0
                      ? "No models available"
                      : "Select a model"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.model_name}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">{m.model_name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({m.tickers})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {models.length === 0 && !loadingModels && (
              <p className="text-xs text-destructive">
                No trained models found. Train a model in settings first.
              </p>
            )}
          </div>

          <Button
            onClick={handleEvaluate}
            disabled={loading || loadingModels || !selectedModel}
            className="transition-colors bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? "Processing..." : "Generate Recommendations"}
          </Button>
        </div>

        {status && (
          <div
            className={`p-4 rounded-lg border text-sm whitespace-pre-wrap transition-all ${
              status.type === "info"
                ? "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800"
                : status.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {status.message}
          </div>
        )}

        {evalResult && (
          <div className="space-y-6 mt-6">
            {/* OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Evaluation Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${evalResult.budget.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Cash Remaining
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${evalResult.cash_remaining.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Evaluation Period
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-mono">{evalResult.eval_period}</div>
                </CardContent>
              </Card>
            </div>

            {/* BACKTEST PERFORMANCE METRICS */}
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">
                Backtest Performance Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      RL Model Return
                    </CardTitle>
                    {evalResult.backtest_summary.rl_return_pct >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-xl font-bold ${
                        evalResult.backtest_summary.rl_return_pct >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }`}
                    >
                      {evalResult.backtest_summary.rl_return_pct >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.rl_return_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Benchmark (B&H)
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {evalResult.backtest_summary.bh_return_pct >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.bh_return_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Alpha Margin
                    </CardTitle>
                    <Award className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-xl font-bold ${
                        evalResult.backtest_summary.alpha_margin >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-destructive"
                      }`}
                    >
                      {evalResult.backtest_summary.alpha_margin >= 0 ? "+" : ""}
                      {evalResult.backtest_summary.alpha_margin.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Sharpe Ratio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {evalResult.backtest_summary.sharpe.toFixed(3)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Max Drawdown
                    </CardTitle>
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-destructive">
                      {evalResult.backtest_summary.max_drawdown_pct.toFixed(2)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* RECOMMENDED ALLOCATIONS TABLE */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Allocations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>% Budget</TableHead>
                      <TableHead>RSI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evalResult.allocations.map((alloc) => (
                      <TableRow key={alloc.ticker}>
                        <TableCell className="font-bold">{alloc.ticker}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alloc.action === "BUY"
                                ? "default"
                                : alloc.action === "SELL"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {alloc.action}
                          </Badge>
                        </TableCell>
                        <TableCell>${alloc.price.toFixed(2)}</TableCell>
                        <TableCell>{alloc.shares}</TableCell>
                        <TableCell>${alloc.dollar_value.toLocaleString()}</TableCell>
                        <TableCell>{alloc.pct_of_budget}%</TableCell>
                        <TableCell>{alloc.rsi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
````

## File: src/types.ts
````typescript
import { ReactNode } from "react";

// Navigation

export type NavElement = {
  title: string;
  url: string;
  icon: ReactNode;
  page: ReactNode;
  hidenav?: boolean;
  expandable?: boolean;
}

// LLM providers

export interface LlmProviderInfo {
  id: string;
  name: string;
  available: boolean;
  status: boolean;
  setup_hint: string;
}

export interface OllamaModelInfo {
  name: string;
  size: number | null;
  parameter_size: string | null;
  quantization_level: string | null;
  family: string | null;
}

// Chat

export interface Channel {
  id: string;
  name: string;
  created_at: number;
}

export interface Conversation {
  id: string;
  channel_id: string;
  title: string | null;
  created_at: number;
}

export interface StoredMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: number;
}

// Trained models

export interface TrainedModel {
  id: string;
  model_name: string;
  tickers: string;
  start_date: string;
  end_date: string;
  created_at: number;
}

// App settings

export interface AppSetting {
  key: string;
  value: string | null;
  updated_at: number;
}

// guides + flashcards

export interface StoredGuide {
  id: string;
  topic: string;
  title: string;
  summary: string;
  steps: string; // JSON: [{title, content}]
  key_takeaways: string; // JSON: string[]
  sources: string; // JSON: [{title, url, extract}]
  grounded: number; // 0 | 1
  created_at: number;
  updated_at: number;
}

export interface GuideStep {
  title: string;
  content: string;
}

export interface GuideSource {
  title: string;
  url: string;
  extract: string;
}

/** Parsed shape used by the UI (JSON fields decoded). */
export interface Guide {
  id: string;
  topic: string;
  title: string;
  summary: string;
  steps: GuideStep[];
  keyTakeaways: string[];
  sources: GuideSource[];
  grounded: boolean;
  createdAt: number;
  updatedAt: number;
}

/** Guide payload returned by POST /learn/guide. */
export interface GeneratedGuide {
  title: string;
  summary: string;
  steps: GuideStep[];
  key_takeaways: string[];
  grounded: boolean;
  sources: GuideSource[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface StoredDeck {
  id: string;
  topic: string;
  cards: string; // JSON: Flashcard[]
  created_at: number;
}

export interface Deck {
  id: string;
  topic: string;
  cards: Flashcard[];
  createdAt: number;
}

export interface FlashcardProgress {
  deck_id: string;
  card_id: string; // index of the card within the deck, as string
  box_level: number; // 0..2 Leitner box
  due_at: number; // epoch ms
  last_reviewed_at: number | null;
}
````

## File: src/vite-env.d.ts
````typescript
/// <reference types="vite/client" />
````

## File: src-py/requirements.txt
````
absl-py==2.4.0
ale-py==0.12.0
altgraph==0.17.5
annotated-doc==0.0.4
annotated-types==0.7.0
anyio==4.14.0
backtrader==1.9.78.123
beautifulsoup4==4.15.0
certifi==2026.6.17
cffi==2.0.0
charset-normalizer==3.4.7
click==8.4.1
cloudpickle==3.1.2
colorama==0.4.6
contourpy==1.3.3
curl_cffi==0.15.0
cycler==0.12.1
distro==1.9.0
docstring_parser==0.18.0
Farama-Notifications==0.0.6
fastapi==0.137.2
filelock==3.29.4
fonttools==4.63.0
fsspec==2026.6.0
grpcio==1.81.1
gymnasium==1.3.0
h11==0.16.0
httpcore==1.0.9
httpx==0.28.1
idna==3.18
Jinja2==3.1.6
jiter==0.15.0
kiwisolver==1.5.0
Markdown==3.10.2
markdown-it-py==4.2.0
MarkupSafe==3.0.3
matplotlib==3.11.0
mdurl==0.1.2
mpmath==1.3.0
multitasking==0.0.13
networkx==3.6.1
numpy==2.5.0
ollama==0.6.2
opencv-python==4.13.0.92
packaging==26.2
pandas==3.0.3
peewee==4.1.0
pefile==2024.8.26
pillow==12.2.0
platformdirs==4.10.0
protobuf==7.35.1
psutil==7.2.2
pycparser==3.0
pydantic==2.13.4
pydantic_core==2.46.4
pygame-ce==2.5.7
Pygments==2.20.0
pyinstaller==6.21.0
pyinstaller-hooks-contrib==2026.6
pyparsing==3.3.2
python-dateutil==2.9.0.post0
pytz==2026.2
pywin32-ctypes==0.2.3
requests==2.34.2
rich==15.0.0
setuptools==81.0.0
six==1.17.0
sniffio==1.3.1
soupsieve==2.8.4
stable_baselines3==2.9.0
starlette==1.3.1
sympy==1.14.0
tensorboard==2.20.0
tensorboard-data-server==0.7.2
torch==2.12.1
tqdm==4.68.3
typing-inspection==0.4.2
typing_extensions==4.15.0
tzdata==2026.2
urllib3==2.7.0
uvicorn==0.49.0
websockets==16.0
Werkzeug==3.1.8
yfinance==1.4.1
````

## File: src-tauri/src/lib.rs
````rust
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
````

## File: src-tauri/src/migrations.rs
````rust
use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_core_chat_tables",
            sql: "
                CREATE TABLE channels (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE conversations (
                    id TEXT PRIMARY KEY,
                    channel_id TEXT NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
                    title TEXT,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE messages (
                    id TEXT PRIMARY KEY,
                    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
                    role TEXT NOT NULL CHECK(role IN ('user','assistant','system')),
                    content TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE INDEX idx_conversations_channel ON conversations(channel_id);
                CREATE INDEX idx_messages_conversation ON messages(conversation_id);

                INSERT INTO channels (id, name, created_at) VALUES ('general', 'General', unixepoch());
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_trained_models_table",
            sql: "
                CREATE TABLE trained_models (
                    id TEXT PRIMARY KEY,
                    model_name TEXT NOT NULL,
                    tickers TEXT NOT NULL,
                    start_date TEXT NOT NULL,
                    end_date TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE INDEX idx_trained_models_created_at ON trained_models(created_at DESC);
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_app_settings_table",
            sql: "
                CREATE TABLE app_settings (
                    key TEXT PRIMARY KEY,
                    value TEXT,
                    updated_at INTEGER NOT NULL
                );
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_learn_tables",
            sql: "
                CREATE TABLE guides (
                    id TEXT PRIMARY KEY,
                    topic TEXT NOT NULL,
                    title TEXT NOT NULL,
                    summary TEXT NOT NULL,
                    steps TEXT NOT NULL,
                    key_takeaways TEXT NOT NULL,
                    sources TEXT NOT NULL,
                    grounded INTEGER NOT NULL DEFAULT 0,
                    created_at INTEGER NOT NULL,
                    updated_at INTEGER NOT NULL
                );

                CREATE TABLE flashcard_decks (
                    id TEXT PRIMARY KEY,
                    topic TEXT NOT NULL,
                    cards TEXT NOT NULL,
                    created_at INTEGER NOT NULL
                );

                CREATE TABLE flashcard_progress (
                    deck_id TEXT NOT NULL REFERENCES flashcard_decks(id) ON DELETE CASCADE,
                    card_id TEXT NOT NULL,
                    box_level INTEGER NOT NULL DEFAULT 0,
                    due_at INTEGER NOT NULL DEFAULT 0,
                    last_reviewed_at INTEGER,
                    PRIMARY KEY (deck_id, card_id)
                );

                CREATE INDEX idx_guides_created ON guides(created_at DESC);
                CREATE INDEX idx_flashcard_decks_created ON flashcard_decks(created_at DESC);
                CREATE INDEX idx_flashcard_progress_due ON flashcard_progress(due_at);
            ",
            kind: MigrationKind::Up,
        },
    ]
}
````

## File: src-tauri/.gitignore
````
# Generated by Cargo
# will have compiled files and executables
/target/

# Generated by Tauri
# will have schema files for capabilities auto-completion
/gen/schemas
````

## File: src-tauri/build.rs
````rust
fn main() {
    tauri_build::build()
}
````

## File: src/main.tsx
````typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
````

## File: src-py/llm/main.py
````python
import json
from typing import Any, Dict, List, Optional

from config import OUTPUT_DIR
from llm.providers import (
    DEFAULT_OLLAMA_MODEL,
    get_provider,
)

# Default active provider/model (used until the user picks something else
# in settings, or the frontend re-applies a saved choice at launch).
DEFAULT_PROVIDER = "ollama"

# Runtime state for the active provider/model.
active_provider_id: str = DEFAULT_PROVIDER
active_model: str = DEFAULT_OLLAMA_MODEL


def initialize_ollama() -> None:
    """
    Best-effort startup for the default provider.

    Never raises: a missing/down Ollama server must not crash the app,
    the settings UI reports availability and the user manages models
    from there.
    """
    try:
        provider = get_provider(DEFAULT_PROVIDER)
        provider.start()
        print(f"[LLM] Provider '{provider.display_name}' is ready.")
    except Exception as e:  # noqa: BLE001 - startup must not crash the app
        print(f"[LLM] Provider '{DEFAULT_PROVIDER}' unavailable at startup: {e}")


def get_active() -> Dict[str, str]:
    """Currently selected provider and model."""
    return {"provider": active_provider_id, "model": active_model}


def set_active(provider_id: str, model: str) -> Dict[str, str]:
    """
    Switch the active provider/model at runtime.

    Raises KeyError for unknown providers, ValueError for providers that
    are not wired up yet, LookupError when the model is not downloaded.
    """
    global active_provider_id, active_model

    provider = get_provider(provider_id)  # KeyError
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")

    # Try to make sure the backend is reachable before validating the model.
    provider.start()  # may raise FileNotFoundError/RuntimeError

    if not provider.has_model(model):  # may raise ConnectionError
        raise LookupError(
            f"Model '{model}' is not downloaded. Run: ollama pull {model}"
        )

    active_provider_id = provider_id
    active_model = model
    return get_active()


def list_models(provider_id: str = DEFAULT_PROVIDER) -> List[Dict[str, Any]]:
    """Models available for a given provider (raises for stub providers)."""
    provider = get_provider(provider_id)
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")
    return provider.list_models()


def _resolve_provider(provider_id: Optional[str]):
    pid = provider_id or active_provider_id
    provider = get_provider(pid)
    if not provider.available:
        hint = f" {provider.setup_hint}" if provider.setup_hint else ""
        raise ValueError(f"Provider '{provider.display_name}' is not available yet.{hint}")
    return pid, provider


def chat(
    system_prompt: str,
    user_prompt: str,
    model: Optional[str] = None,
    provider_id: Optional[str] = None,
    temperature: float = 0.7,
    stream: bool = False,
) -> str:
    """
    Route a single chat request through the active (or explicitly chosen)
    provider/model.
    """
    pid, provider = _resolve_provider(provider_id)
    if pid == active_provider_id:
        mdl = model or active_model
    else:
        mdl = model

    if not mdl:
        raise ValueError("No model selected. Pick one in Settings -> LLM Provider.")

    # Make sure the backend is reachable (no-op / cheap when it already is).
    provider.start()  # may raise FileNotFoundError/RuntimeError

    return provider.chat(
        system_prompt=system_prompt,
        user_prompt=user_prompt,
        model=mdl,
        temperature=temperature,
        stream=stream,
    )


# ---------------------------------------------------------------------------
# Guidance helper, prompts the system with rules and conditions it needs
# to follow. Helps us avoid out of context or inaccuracies
# ---------------------------------------------------------------------------
SYSTEM_PROMPTS = {
    "RECOMMENDATIONS": """You are a financial explanation assistant embedded in a
self-hosted advisor app. Your job is to explain WHY a stock recommendation
was made, using ONLY the data provided to you in the user message.

Rules:
- Do not invent numbers or facts not present in the supplied data.
- Be clear and concise; assume the user is not a finance expert.
- Utilize the Technical Indicators provided (RSI, MACD Histogram, Bollinger Bands % or bb_pct) to explain the trading signals.
- Always mention key risks or counterpoints, not just the bullish case.
- Never present this as guaranteed financial advice.
- If the supplied data is insufficient to justify the recommendation,
    say so explicitly rather than filling gaps with assumptions.
""",
    "CHAT": """You are a financial education assistant.
Your role is to help users understand investing and stock market concepts. Teach like an experienced tutor: adapt explanations to the user's knowledge level, define unfamiliar terms, explain concepts step by step, and use analogies and examples when helpful.
You may explain topics including stocks, ETFs, market mechanics, technical analysis, fundamental analysis, indicators, chart patterns, valuation metrics, risk management, and portfolio concepts.

When explaining technical indicators:
- Explain what the indicator measures.
- Explain how traders commonly interpret it.
- Explain its limitations.
- Emphasize that no single indicator should be used in isolation.

When discussing a specific stock:
- Explain what available indicators or financial metrics may suggest.
- Describe common interpretations used by investors.
- Present bullish and bearish perspectives when appropriate.
- Never recommend buying, selling, or holding.
- Never predict future prices or returns.
- Never provide personalized financial advice.

If asked for investment advice, explain that you can teach the concepts, interpret market data, and discuss strategies, but investment decisions are the user's responsibility.
If information is missing or uncertain, say so instead of guessing.
Your goal is to help users become informed and independent learners.
""",
}


def build_user_prompt(allocation_data: dict, portfolio_context: dict) -> str:
    """
    Formats technical metrics and overarching portfolio data for the LLM.
    """
    combined_data = {
        "ticker_metrics": allocation_data,
        "portfolio_context": portfolio_context
    }

    data_block = json.dumps(combined_data, indent=2)

    return f"""Stock: {allocation_data['ticker']}
Recommendation: {allocation_data['action']}

Supporting data and portfolio context:
{data_block}

Explain this recommendation to the user in plain language, explicitly referencing
the technical indicator data points (like RSI, MACD history, or Bollinger Bands) and how they
justify the action within the overall portfolio budget strategy."""

class Explanation:
    def __init__(self, ticker: str, action: str, justification: str):
        self.ticker = ticker
        self.action = action
        self.justification = justification

    def to_dict(self) -> Dict[str, str]:
        return {
            "ticker": self.ticker,
            "action": self.action,
            "justification": self.justification,
        }

class Recommendation:
    def __init__(self, budget: int, cash_remaining: int, eval_period: int, backtest_summary: Dict[str, int], allocations: List[Explanation]):
        self.budget = budget
        self.cash_remaining = cash_remaining
        self.eval_period = eval_period
        self.backtest_summary = backtest_summary
        self.allocations = allocations

    def to_dict(self) -> Dict[str, Any]:
        return {
            "budget": self.budget,
            "cash_remaining": self.cash_remaining,
            "eval_period": self.eval_period,
            "backtest_summary": self.backtest_summary,
            "allocations": [alloc.to_dict() for alloc in self.allocations],
        }

def generate_explanation(file_name: str) -> Recommendation:
    json_path = OUTPUT_DIR / file_name

    if not json_path.exists():
        raise FileNotFoundError(f"Error: Could not find JSON file at: {json_path}")

    with open(json_path, "r") as f:
        recommendations_data = json.load(f) # as JsonRecommendation

    # extract global metrics to provide context to the agent
    portfolio_context = {
        "total_budget": recommendations_data.get("budget"),
        "cash_remaining": recommendations_data.get("cash_remaining"),
        "eval_period": recommendations_data.get("eval_period"),
        "backtest_summary": recommendations_data.get("backtest_summary")
    }

    # print(f"\n--- Generating Explanations from {file_name} ---\n")

    response = []

    for allocation in recommendations_data.get("allocations", []):
        ticker = allocation.get("ticker")
        action = allocation.get("action")

        print(f"Processing explanation for {ticker} ({action})...")

        user_prompt = build_user_prompt(allocation, portfolio_context)
        explanation = chat(SYSTEM_PROMPTS["RECOMMENDATIONS"], user_prompt)

        response.append(Explanation(ticker, action, explanation))

    data = recommendations_data.copy()
    data["allocations"] = response

    return Recommendation(**data)

def handle_chat_interaction(
    user_question: str,
    model: Optional[str] = None,
    provider_id: Optional[str] = None,
) -> str:
    """
    Receives questions from a user and processes them using the CHAT rules.
    """
    return chat(
        SYSTEM_PROMPTS["CHAT"],
        user_question,
        model=model,
        provider_id=provider_id,
    )
````

## File: src-py/build.bat
````batch
@echo off
setlocal enabledelayedexpansion

REM Always operate relative to this script's own location (src-py/)
pushd "%~dp0"

REM Create the venv if it doesn't exist yet
if not exist ".venv\Scripts\activate.bat" (
    echo Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo Failed to create virtual environment.
        popd
        exit /b 1
    )
)

REM Activate the venv
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo Failed to activate virtual environment.
    popd
    exit /b 1
)

REM Install/update dependencies
if exist "requirements.txt" (
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Failed to install dependencies.
        call .venv\Scripts\deactivate.bat
        popd
        exit /b 1
    )
) else (
    echo WARNING: requirements.txt not found, skipping dependency install.
)

REM Make sure pyinstaller itself is available
pip show pyinstaller >nul 2>&1
if errorlevel 1 (
    echo Installing PyInstaller...
    pip install pyinstaller
)

REM Verify that the spec file actually exists before building
if not exist "app.spec" (
    echo ERROR: app.spec not found! Please ensure your spec file is in this directory.
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

REM Build the Python executable using the spec file
echo Building Python sidecar via PyInstaller spec file...
pyinstaller --clean app.spec
if errorlevel 1 (
    echo PyInstaller build failed.
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

REM Detect the Rust target triple for this machine
for /f "tokens=2" %%i in ('rustc -Vv ^| findstr "host:"') do set HOST_TRIPLE=%%i

if "%HOST_TRIPLE%"=="" (
    echo Could not detect Rust host triple. Is rustc installed and on PATH?
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

echo Detected target triple: %HOST_TRIPLE%

REM Ensure the destination folder exists
if not exist "..\src-tauri\binaries" mkdir "..\src-tauri\binaries"

REM Copy the built executable with the required sidecar naming convention
copy /Y "dist\app.exe" "..\src-tauri\binaries\app-%HOST_TRIPLE%.exe"
if errorlevel 1 (
    echo Failed to copy built executable.
    call .venv\Scripts\deactivate.bat
    popd
    exit /b 1
)

timeout /t 3 /nobreak >nul

echo Done. Sidecar binary placed at ..\src-tauri\binaries\app-%HOST_TRIPLE%.exe

call .venv\Scripts\deactivate.bat
popd
endlocal
````

## File: src-tauri/capabilities/default.json
````json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "opener:default",
    "shell:allow-execute",
    { "identifier": "shell:allow-spawn", "allow": [{ "name": "binaries/app", "sidecar": true }] },
    "sql:default",
    "sql:allow-load",
    "sql:allow-execute",
    "sql:allow-select",
    "sql:allow-close"
  ]
}
````

## File: src-tauri/tauri.conf.json
````json
{
  "$schema": "https://schema.tauri.app/config/2",
  "productName": "financial-advisor-app",
  "version": "0.1.0",
  "identifier": "com.maxsc.financial-advisor-app",
  "build": {
    "devUrl": "http://localhost:1420",
    "beforeDevCommand": "bun run dev:frontend",
    "beforeBuildCommand": "bun run build:sidecar && bun run build:frontend",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "financial-advisor-app",
        "width": 800,
        "height": 600
      }
    ],
    "security": {
      "csp": null
    }
  },
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": [
      "icons/32x32.png",
      "icons/128x128.png",
      "icons/128x128@2x.png",
      "icons/icon.icns",
      "icons/icon.ico"
    ],
    "externalBin": ["binaries/app"]
  }
}
````

## File: src/App.css
````css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@custom-variant dark (&:is(.dark *));

@theme inline {
    --font-heading: var(--font-sans);
    --font-sans: 'Geist Variable', sans-serif;
    --color-sidebar-ring: var(--sidebar-ring);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar: var(--sidebar);
    --color-chart-5: var(--chart-5);
    --color-chart-4: var(--chart-4);
    --color-chart-3: var(--chart-3);
    --color-chart-2: var(--chart-2);
    --color-chart-1: var(--chart-1);
    --color-ring: var(--ring);
    --color-input: var(--input);
    --color-border: var(--border);
    --color-destructive: var(--destructive);
    --color-accent-foreground: var(--accent-foreground);
    --color-accent: var(--accent);
    --color-muted-foreground: var(--muted-foreground);
    --color-muted: var(--muted);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-secondary: var(--secondary);
    --color-primary-foreground: var(--primary-foreground);
    --color-primary: var(--primary);
    --color-popover-foreground: var(--popover-foreground);
    --color-popover: var(--popover);
    --color-card-foreground: var(--card-foreground);
    --color-card: var(--card);
    --color-foreground: var(--foreground);
    --color-background: var(--background);
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0);
    --muted: oklch(0.97 0 0);
    --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0);
    --accent-foreground: oklch(0.205 0 0);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0);
    --input: oklch(0.922 0 0);
    --ring: oklch(0.708 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --radius: 0.625rem;
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
}

.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.205 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --primary-foreground: oklch(0.205 0 0);
    --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0 0);
    --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.269 0 0);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.556 0 0);
    --chart-1: oklch(0.87 0 0);
    --chart-2: oklch(0.556 0 0);
    --chart-3: oklch(0.439 0 0);
    --chart-4: oklch(0.371 0 0);
    --chart-5: oklch(0.269 0 0);
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
    }
  body {
    @apply bg-background text-foreground;
    }
  html {
    @apply font-sans;
    }
}
````

## File: src/pages/chat.tsx
````typescript
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ChatMarkdown } from "@/components/chat-markdown";
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/use-conversation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/data";
import { SETTINGS_KEYS, settingsRepo } from "@/lib/db/settings";
import { DEFAULT_LLM_PROVIDER } from "@/hooks/use-llm";

const ROLE_STYLES = {
  user: {
    align: "items-end",
    bubble: "bg-primary text-primary-foreground",
  },
  system: {
    align: "items-center",
    bubble: "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800",
  },
  assistant: {
    align: "items-start",
    bubble: "bg-muted text-foreground",
  },
} as const;

export default function Chat() {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const { messages, loading: historyLoading, appendMessage } = useConversation(searchParams.get("channel") ?? "general");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  async function send() {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    setSending(true);

    await appendMessage("user", text);

    try {
      const history = messages.slice(-10).map(({ role, content }) => ({ role, content }));
      const [savedModel, savedProvider] = await Promise.all([
        settingsRepo.get(SETTINGS_KEYS.llmModel),
        settingsRepo.get(SETTINGS_KEYS.llmProvider),
      ]);
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
          model: savedModel ?? undefined,
          provider: savedProvider ?? DEFAULT_LLM_PROVIDER,
        }),
      });
      const data = await res.json();
      await appendMessage("assistant", data.reply);
    } catch (e) {
      console.error("Chat request failed:", e);
      await appendMessage("system", "Error: Failed to connect to the chat endpoint.");
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col min-h-0 overflow-hidden">
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden box-border">
          <ScrollArea className="flex-1 min-h-0 pr-4">
            <div className="space-y-3 pb-4">
              {historyLoading && (
                <div className="text-center text-muted-foreground mt-10 text-sm">Loading history...</div>
              )}
              {!historyLoading && messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-10 text-sm">
                  Start a conversation with the LLM.
                </div>
              )}

              {messages.map((msg, i) => {
                const roleStyle = ROLE_STYLES[msg.role as keyof typeof ROLE_STYLES] || ROLE_STYLES.assistant;

                return (
                  <div key={msg.id || i} className={cn("flex flex-col", roleStyle.align)}>
                    <div className={cn("px-3 py-2 rounded-lg text-sm max-w-[85%] md:max-w-[75%]", roleStyle.bubble)}>
                      <ChatMarkdown content={msg.content} />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}

              {sending && (
                <div className="text-sm text-muted-foreground italic animate-pulse">
                  Working...
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2 items-end border-t pt-3 p-1 shrink-0 mt-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={3}
              disabled={sending}
              className="flex-1 resize-none min-h-20"
            />
            <div className="flex flex-col gap-1.5 h-full">
              <Button
                onClick={send}
                disabled={sending || !input.trim()}
                className="flex-1 w-18 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}
````

## File: src-tauri/Cargo.toml
````toml
[package]
name = "financial-advisor-app"
version = "0.1.0"
description = "A Financial advisor that teaches you trading stocks"
authors = ["Max Screawn"]
edition = "2024"
build = "build.rs"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
# The `_lib` suffix may seem redundant but it is necessary
# to make the lib name unique and wouldn't conflict with the bin name.
# This seems to be only an issue on Windows, see https://github.com/rust-lang/cargo/issues/8519
name = "financial_advisor_app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2", features = [] }

[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tauri-plugin-shell = "2.3.5"
tauri-plugin-sql = { version = "2", features = ["sqlite"] }
````

## File: src-py/rl_pipeline/main.py
````python
import json
from pathlib import Path
import numpy as np
from stable_baselines3 import PPO
from dataclasses import dataclass

from rl_pipeline.data import download_market_data
from rl_pipeline.environment import TradingEnv
from rl_pipeline.rl_agent import train_ppo_agent
from rl_pipeline.backtest import run_backtest_suite

from config import TICKERS, BUDGET, TRAIN_START, TRAIN_END, EVAL_START, EVAL_END, FEATURE_COLS, MAX_WEIGHT, OUTPUT_DIR, bcolors

@dataclass
class Allocation:
    ticker: str; action: str; price: float; shares: float
    dollar_value: float; pct_of_budget: float
    rsi: float; macd_hist: float; bb_pct: float

@dataclass
class JsonRecommendation:
    budget: int;
    cash_remaining: int;
    eval_period: str;
    backtest_summary: dict;
    allocations: list[Allocation];

def _calculate_allocations(model, eval_data: dict, tickers: list, budget: float) -> list[Allocation]:
    """
    Internal helper: Generates execution signals for the final evaluation timestamp.
    """
    env = TradingEnv(eval_data, budget=budget)
    env._i = len(env.dates) - 1
    action, _ = model.predict(env._obs(), deterministic=True)

    allocations = []

    for i, ticker in enumerate(tickers):
        a = float(action[i])
        latest = eval_data[ticker].iloc[-1]
        price = float(latest["Close"])

        if a > 0.05:
            weight = min(a, MAX_WEIGHT)
            dollars = budget * weight
            shares = dollars / price
            act = "BUY"

        elif a < -0.05:
            weight = dollars = shares = 0.0; act = "SELL"

        else:
            weight = dollars = shares = 0.0; act = "HOLD"

        allocations.append(Allocation(
            ticker=ticker, action=act, price=round(price, 2), shares=round(shares, 4),
            dollar_value=round(dollars, 2), pct_of_budget=round(weight * 100, 1),
            rsi=round(float(latest["rsi"]), 1), macd_hist=round(float(latest["macd_hist"]), 4),
            bb_pct=round(float(latest["bb_pct"]), 3)
        ))

    allocations.sort(key=lambda x: -x.dollar_value)
    return allocations


def train_model(
    tickers: list = TICKERS,
    train_start: str = TRAIN_START,
    train_end: str = TRAIN_END,
    model_name: str = "ppo_trading_model"
):
    """
    Downloads training data, trains the RL model, and saves it to disk.
    """
    # print(f"\n[{bcolors.OKBLUE}Train{bcolors.ENDC}] Downloading market data: {train_start} -> {train_end}")

    train_raw = download_market_data(tickers, train_start, train_end)

    valid_tickers = [t for t in tickers if t in train_raw]
    train_data = {t: train_raw[t] for t in valid_tickers}

    if len(valid_tickers) < 1 or len(train_data.keys()) < 1:
        raise ValueError(
            f"No market data found for tickers {tickers} between {train_start} and {train_end}. "
            "Please select a wider date range or check network/yfinance connectivity."
        )

    # print(f"[{bcolors.OKBLUE}Train{bcolors.ENDC}] Training PPO agent...")
    model = train_ppo_agent(train_data)

    # Store and make accessible all trained models
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    model_path = OUTPUT_DIR / model_name

    # Assuming the model has a standard save method (like Stable Baselines 3)
    if hasattr(model, "save"):
        model.save(str(model_path))
        # print(f"[{bcolors.OKGREEN}Train{bcolors.ENDC}] Model saved to -> {model_path}.zip")

    return model, valid_tickers

def generate_recommendations(
    model,
    valid_tickers: list,
    eval_start: str = EVAL_START,
    eval_end: str = EVAL_END,
    budget: float = BUDGET,
    output_filename: str = "recommendations.json"
) -> tuple[Path, dict]:
    """
    Evaluates the model, generates allocations, formats the payload,
    saves to JSON, and returns the absolute path of the JSON file.
    """
    # print(f"\n[{bcolors.OKBLUE}Eval{bcolors.ENDC}] Downloading eval data: {eval_start} -> {eval_end}")

    eval_raw = download_market_data(valid_tickers, eval_start, eval_end)
    eval_data = {t: eval_raw[t] for t in valid_tickers if t in eval_raw}

    # Run Backtest
    env_eval = TradingEnv(eval_data, budget=budget)
    eval_feat = {t: eval_data[t].loc[env_eval.dates, FEATURE_COLS].values.astype(np.float32) for t in valid_tickers}
    eval_closes = {t: eval_data[t].loc[env_eval.dates, "Close"].values.astype(np.float32) for t in valid_tickers}

    metrics = run_backtest_suite(model, eval_data, valid_tickers, eval_feat, eval_closes)

    # Generate Allocations
    allocations = _calculate_allocations(model, eval_data, valid_tickers, budget)
    total_out = sum(a.dollar_value for a in allocations)
    alpha_margin = metrics['rl_return_pct'] - metrics['bh_return_pct']

    # Print Performance Metrics
    # print("\n" + ("=" * 60))
    # print("  Performance Results")
    # print(("=" * 60) + "\n")
    # print(f"  RL Model Return    : {metrics['rl_return_pct']:>+7.2f} %  (${metrics['rl_end_val']:>9,.2f})")
    # print(f"  Benchmark B&H      : {metrics['bh_return_pct']:>+7.2f} %  (${metrics['bh_end_val']:>9,.2f})")
    # print(f"  Alpha Margin       : {alpha_margin:>+7.2f} %")
    # print(f"  Sharpe Ratio       : {metrics['sharpe']:>7.3f}")

    # LLM Payload
    payload = {
        "budget": budget,
        "cash_remaining": round(budget - total_out, 2),
        "eval_period": f"{eval_start} -> {eval_end}",
        "backtest_summary": {
            "rl_return_pct": round(metrics['rl_return_pct'], 2),
            "bh_return_pct": round(metrics['bh_return_pct'], 2),
            "sharpe": round(metrics['sharpe'], 3),
            "max_drawdown_pct": round(metrics['max_drawdown'], 2),
            "alpha_margin": round(alpha_margin, 2),
        },
        "allocations": [a.__dict__ for a in allocations]
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    payload_path = OUTPUT_DIR / output_filename

    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)

    # print(f"\n  [{bcolors.OKGREEN}Main{bcolors.ENDC}] LLM Engine Context payload metadata dumped -> {payload_path}\n")

    return payload_path.resolve(), payload

def load_trained_model(model_name: str = "ppo_trading_model"):
    """
    Helper to load a previously trained model from the OUTPUT_DIR.
    """
    model_path = OUTPUT_DIR / model_name
    # Uncomment and use your specific library's load function
    return PPO.load(str(model_path))

def main():
    """
    Example usage of the new refactored pipeline.
    """
    # print("\n" + ("=" * 60))
    # print("  RL Stock Investment Agent Pipeline")
    # print(("=" * 60) + "\n")

    trained_model, valid_tickers = train_model(
        tickers=TICKERS,
        train_start=TRAIN_START,
        train_end=TRAIN_END,
        model_name="ppo_trading_model"
    )

    json_path = generate_recommendations(
        model=trained_model,
        valid_tickers=valid_tickers,
        eval_start=EVAL_START,
        eval_end=EVAL_END,
        budget=BUDGET,
        output_filename="recommendations.json"
    )

    # print(f"Pipeline complete. Application can now read from: {json_path}")

if __name__ == "__main__":
    main()
````

## File: src-tauri/src/main.rs
````rust
use tauri::Manager;
use tauri_plugin_shell::ShellExt;
use tauri_plugin_shell::process::CommandEvent;
use tauri_plugin_sql::{Migration, MigrationKind};

mod migrations;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:app.db", migrations::get_migrations())
                .build(),
        )
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
            std::fs::create_dir_all(&app_data_dir).map_err(|e| e.to_string())?;
            let data_dir_str = app_data_dir.to_str().unwrap();
            #[cfg(dev)]
            {
                println!("\n=== DEVELOPMENT MODE ===");
                println!("App Data Directory: {}", data_dir_str);
                println!("Python sidecar skipped. Please start it manually:\n");
                println!("1. cd src-py");
                println!("2. .venv\\Scripts\\activate");
                println!("3. python main.py --data-dir=\"{}\"\n", data_dir_str);
                println!("========================\n");
            }
            #[cfg(not(dev))]
            {
                let sidecar = app
                    .shell()
                    .sidecar("app")
                    .unwrap()
                    .arg("--data-dir")
                    .arg(data_dir_str);
                let (mut rx, _child) = sidecar.spawn().expect("failed to spawn python sidecar");
                tauri::async_runtime::spawn(async move {
                    while let Some(event) = rx.recv().await {
                        match event {
                            CommandEvent::Stdout(line) => {
                                println!("[python out] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Stderr(line) => {
                                eprintln!("[python err] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Terminated(payload) => {
                                println!(
                                    "[python sidecar] Exited unexpectedly with code: {:?}",
                                    payload.code
                                );
                            }
                            _ => {}
                        }
                    }
                });
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
````

## File: src/App.tsx
````typescript
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import pages from "./pages";
import { syncLlmSettingsOnLaunch } from "@/lib/llm-sync";

import './App.css';

export default function App() {
  // Re-apply the user's saved LLM choice to the backend once on launch
  // (covers sidecar restarts that reset the backend's in-memory state).
  useEffect(() => {
    syncLlmSettingsOnLaunch();
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset className="h-[calc(100svh-1rem)]">
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden min-h-0">
          <div className="@container/main flex flex-1 flex-col p-4 md:p-6 overflow-hidden min-h-0">
            <Routes>
              {pages.map(({ url, page }) => (
                <Route key={url} path={url} element={page} />
              ))}
            </Routes>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
````

## File: src-py/main.py
````python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import traceback

import requests

from llm.main import (
    generate_explanation,
    get_active,
    handle_chat_interaction,
    initialize_ollama,
    list_models,
    set_active,
)
from llm.learn import generate_flashcards, generate_guide
from llm.providers import get_provider, list_providers
from rl_pipeline.main import train_model, load_trained_model, generate_recommendations
from config import TICKERS

app = FastAPI()

print('FastAPI app created')

# Decent config for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "tauri://localhost",        # macOS/Linux production
        "http://tauri.localhost",   # Windows production (WebView2)
        "https://tauri.localhost",  # some WebView2 configs use https
        "http://localhost:1420",    # dev server
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    # Optional per-request overrides (fall back to the active provider/model).
    provider: str | None = None
    model: str | None = None

class ChatResponse(BaseModel):
    reply: str

class SetModelRequest(BaseModel):
    provider: str = "ollama"
    model: str

class TrainRequest(BaseModel):
    tickers: list[str] | None = None
    train_start: str | None = None
    train_end: str | None = None
    model_name: str | None = None

class TrainResponse(BaseModel):
    status: str
    message: str
    model_name: str
    valid_tickers: list[str]

class LearnGuideRequest(BaseModel):
    topic: str
    # Optional per-request overrides (fall back to the active provider/model).
    provider: str | None = None
    model: str | None = None

class LearnFlashcardsRequest(BaseModel):
    topic: str
    count: int = 10
    provider: str | None = None
    model: str | None = None

class EvaluateRequest(BaseModel):
    model_name: str = "ppo_trading_model"
    tickers: list[str] | None = None
    eval_start: str | None = None
    eval_end: str | None = None
    budget: float | None = None
    output_filename: str = "recommendations.json"

class EvaluateResponse(BaseModel):
    status: str
    json_path: str
    data: dict

# ToDo: integrate into a new page for handlign recommendations
def generate_recommendation() -> str:
    data = generate_explanation("recommendations.json")

    if len(data.allocations) == 0:
        return "Failed to generate explanation list"

    # for e in data.allocations:
    #     print(f"{e.ticker}: {e.action} ({e.justification})")

    formatted_reply = "\n\n".join(
        f"**{e.ticker}** ({e.action}): {e.justification}"
        for e in data.allocations
    )

    return formatted_reply

@app.get("/health")
def health():
    return {"status": "ok"}

# model management

@app.get("/llm/providers")
def get_llm_providers():
    """Providers the app knows about, plus which one is active."""
    return {"active": get_active(), "providers": list_providers()}

@app.get("/llm/models")
def get_llm_models(provider: str = "ollama"):
    """Models downloaded/available for a given provider."""
    try:
        models = list_models(provider)
    except ValueError as e:  # stub provider / not wired up
        raise HTTPException(status_code=400, detail=str(e))
    except NotImplementedError as e:  # defensive: stubs
        raise HTTPException(status_code=400, detail=str(e))
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=503,
            detail=f"Cannot reach the '{provider}' backend: {e}",
        )

    active = get_active()
    ollama_running = get_provider("ollama").is_available()
    return {
        "provider": provider,
        "current_model": active["model"] if active["provider"] == provider else None,
        "ollama_running": ollama_running,
        "models": models,
    }

@app.post("/llm/model")
def set_llm_model(req: SetModelRequest):
    """Switch the active LLM provider/model at runtime."""
    try:
        active = set_active(req.provider, req.model)
    except KeyError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:  # provider not wired up yet
        raise HTTPException(status_code=400, detail=str(e))
    except LookupError as e:  # model not downloaded
        raise HTTPException(status_code=404, detail=str(e))
    except (requests.exceptions.ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return {"status": "success", "active": active}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        reply = handle_chat_interaction(
            req.message, model=req.model, provider_id=req.provider
        )
    except ValueError as e:  # provider/model not usable
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.ConnectionError, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return ChatResponse(reply=reply)

# guides (RAG-grounded) + flashcards

@app.post("/learn/guide")
def learn_guide(req: LearnGuideRequest):
    """Generate a step-by-step guide for a topic, grounded in Wikipedia."""
    try:
        guide = generate_guide(
            req.topic, model=req.model, provider_id=req.provider
        )
    except ValueError as e:  # bad input / unparseable LLM output
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.RequestException, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return guide

@app.post("/learn/flashcards")
def learn_flashcards(req: LearnFlashcardsRequest):
    """Generate question/answer flashcards for a topic."""
    try:
        cards = generate_flashcards(
            req.topic, count=req.count, model=req.model, provider_id=req.provider
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except (requests.exceptions.RequestException, RuntimeError) as e:
        raise HTTPException(status_code=503, detail=f"LLM backend unreachable: {e}")
    return {"topic": req.topic, "cards": cards}

@app.post("/train", response_model=TrainResponse)
def api_train_model(req: TrainRequest):
    """Triggers the training pipeline."""
    try:
        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        _, valid_tickers = train_model(**kwargs)

        return TrainResponse(
            status="success",
            message="Model successfully trained and saved.",
            model_name=req.model_name,
            valid_tickers=valid_tickers
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Training failed: {str(e)}")

@app.post("/evaluate", response_model=EvaluateResponse)
def api_evaluate_model(req: EvaluateRequest):
    """Loads a trained model, evaluates it, and generates recommendations.json."""

    if not req.model_name:
        raise HTTPException(status_code=500, detail="No RL agent model was provided")

    try:
        model = load_trained_model(req.model_name)
        if model is None:
            raise HTTPException(status_code=404, detail=f"Model '{req.model_name}' not found.")

        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        valid_tickers = kwargs.pop("tickers", TICKERS)

        kwargs.pop("model_name", None)

        json_path, data = generate_recommendations(
            model=model,
            valid_tickers=valid_tickers,
            **kwargs
        )

        return EvaluateResponse(
            status="success",
            json_path=str(json_path),
            data=data,
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    initialize_ollama()
    uvicorn.run(app, host="127.0.0.1", port=8721)
````
