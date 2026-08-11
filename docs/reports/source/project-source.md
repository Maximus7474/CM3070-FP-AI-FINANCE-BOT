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
```
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
      drawer.tsx
      dropdown-menu.tsx
      input.tsx
      label.tsx
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
    nav-main.tsx
    nav-user.tsx
    site-header.tsx
  hooks/
    use-channel.ts
    use-conversation.ts
    use-mobile.ts
    use-pagename.ts
  lib/
    db/
      chat.ts
      client.ts
    utils.ts
  pages/
    chat.tsx
    eval.tsx
    index.tsx
    settings.tsx
  App.css
  App.tsx
  main.tsx
  types.ts
  vite-env.d.ts

[src-py]/
  llm/
    __init__.py
    main.py
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
```

# Files

## File: src/components/ui/avatar.tsx
```typescript
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
```

## File: src/components/ui/badge.tsx
```typescript
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
```

## File: src/components/ui/breadcrumb.tsx
```typescript
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
```

## File: src/components/ui/button.tsx
```typescript
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
```

## File: src/components/ui/card.tsx
```typescript
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
```

## File: src/components/ui/chart.tsx
```typescript
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
```

## File: src/components/ui/checkbox.tsx
```typescript
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
```

## File: src/components/ui/collapsible.tsx
```typescript
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
```

## File: src/components/ui/drawer.tsx
```typescript
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
```

## File: src/components/ui/dropdown-menu.tsx
```typescript
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
```

## File: src/components/ui/input.tsx
```typescript
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
```

## File: src/components/ui/label.tsx
```typescript
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
```

## File: src/components/ui/scroll-area.tsx
```typescript
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
```

## File: src/components/ui/select.tsx
```typescript
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
```

## File: src/components/ui/separator.tsx
```typescript
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
```

## File: src/components/ui/sheet.tsx
```typescript
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
```

## File: src/components/ui/sidebar.tsx
```typescript
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
```

## File: src/components/ui/skeleton.tsx
```typescript
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
```

## File: src/components/ui/sonner.tsx
```typescript
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
```

## File: src/components/ui/table.tsx
```typescript
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
```

## File: src/components/ui/tabs.tsx
```typescript
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
```

## File: src/components/ui/textarea.tsx
```typescript
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
```

## File: src/components/ui/toggle-group.tsx
```typescript
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
```

## File: src/components/ui/toggle.tsx
```typescript
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
```

## File: src/components/ui/tooltip.tsx
```typescript
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
```

## File: src/components/app-sidebar.tsx
```typescript
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
```

## File: src/components/nav-user.tsx
```typescript
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
```

## File: src/components/site-header.tsx
```typescript
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
```

## File: src/hooks/use-channel.ts
```typescript
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
```

## File: src/hooks/use-conversation.ts
```typescript
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
```

## File: src/hooks/use-mobile.ts
```typescript
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
```

## File: src/hooks/use-pagename.ts
```typescript

```

## File: src/lib/db/chat.ts
```typescript
import { generateId } from "../utils";
import { getDb } from "./client";

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
```

## File: src/lib/db/client.ts
```typescript
import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = await Database.load("sqlite:app.db");
  }
  return dbInstance;
}
```

## File: src-py/llm/__init__.py
```python

```

## File: src-py/rl_pipeline/__init__.py
```python

```

## File: src-py/rl_pipeline/backtest.py
```python
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
```

## File: src-py/rl_pipeline/data.py
```python
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
    
    print(f"  [{bcolors.OKCYAN}Data{bcolors.ENDC}] Downloading market data ({start} -> {end})")
    
    for ticker in tickers:
        raw = yf.download(ticker, start=start, end=end, progress=False, auto_adjust=True)
        if isinstance(raw.columns, pd.MultiIndex):
            raw.columns = raw.columns.get_level_values(0)

        if len(raw) < LOOKBACK + 30:
            continue

        df = add_indicators(raw.copy())
        datasets[ticker] = df
        
        print(f"    - {ticker}: {len(df)} rows, "
              f"price range ${df['Close'].min():.0f}–${df['Close'].max():.0f}")
        
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
```

## File: src-py/rl_pipeline/environment.py
```python
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
```

## File: src-py/rl_pipeline/rl_agent.py
```python
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

    print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Beginning network policy optimization optimization updates...\n")
    model.learn(total_timesteps=TIMESTEPS, progress_bar=True)

    model_path = OUTPUT_DIR / "poc_agent"
    model.save(model_path)
    print()
    print(f"  [{bcolors.OKCYAN}Agent{bcolors.ENDC}] Policy model weights binary serialized out to: {model_path}.zip")

    return model
```

## File: src-py/utils/__init__.py
```python

```

## File: src-py/app.spec
```
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
```

## File: src-py/recommendations.json
```json
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
```

## File: src-tauri/src/migrations.rs
```rust
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
    ]
}
```

## File: src/components/nav-main.tsx
```typescript
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
```

## File: src/lib/utils.ts
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return crypto.randomUUID();
}
```

## File: src/pages/eval.tsx
```typescript
import { Button } from "@/components/ui/button";
import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Evaluation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  async function handleEvaluate() {
    if (loading) return;
    setLoading(true);
    setStatus({
      type: "info",
      message: "Evaluating model and generating recommendations...",
    });

    try {
      const res = await fetch(`${API_BASE_URL}/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
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

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Evaluate Model
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Run the model against historical timeframes to generate recommendations.
        </p>
      </div>

      <div>
        <Button
          onClick={handleEvaluate}
          disabled={loading}
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
    </div>
  );
}
```

## File: src/pages/index.tsx
```typescript
import { LayoutDashboardIcon, MessageCircleMore, Cog, ChartCandlestickIcon } from "lucide-react"
import Chat from "./chat";
import Evaluation from "./eval";
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
```

## File: src/pages/settings.tsx
```typescript
import { Button } from "@/components/ui/button";
import { useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8721";

interface StatusState {
  type: "info" | "success" | "error";
  message: string;
}

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  async function handleTrain() {
    if (loading) return;
    setLoading(true);
    setStatus({
      type: "info",
      message: "Initiating model training... This may take a few minutes.",
    });

    try {
      const res = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: `Training Complete!\nModel: ${data.model_name}\nTickers: ${data.valid_tickers?.join(", ")}`,
        });
      } else {
        throw new Error(data.detail || "Unknown error occurred");
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
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          System Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Trigger a new PPO model training iteration.
        </p>
      </div>

      <div>
        <Button
          onClick={handleTrain}
          disabled={loading}
          className="text-sm font-medium transition-colors bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {loading ? "Training..." : "Train Model"}
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
    </div>
  );
}
```

## File: src/types.ts
```typescript
import { ReactNode } from "react";

export type NavElement = {
  title: string;
  url: string;
  icon: ReactNode;
  page: ReactNode;
  hidenav?: boolean;
  expandable?: boolean;
}
```

## File: src-py/utils/path.py
```python
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
```

## File: src-py/config.py
```python
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
```

## File: src-py/llm/main.py
```python
import requests
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Dict, List, Any, Tuple

from config import OUTPUT_DIR

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_BASE = "http://localhost:11434"
MODEL = "0xroyce/plutus"

client = None

def initialize_ollama() -> None:
    global client
    if client is None:
        client = OllamaClient(default_model=MODEL)
        client.start()
        client.ensure_model()


def get_base_dir() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys.executable).parent
    return Path(__file__).parent


def get_ollama_binary_path() -> Path:
    base = get_base_dir()
    binary_name = "ollama.exe" if sys.platform == "win32" else "ollama"
    return base / "ollama" / binary_name


def get_models_dir() -> Path:
    models_dir = get_base_dir() / "ollama" / "models"
    models_dir.mkdir(parents=True, exist_ok=True)
    return models_dir


class OllamaClient:
    """
    Configurable wrapper around a bundled Ollama instance.
    The use of a class based wrapper should allow us to also
    use external systems (i.e. paid LLMs such as Claude, ChatGPT).

    Note:
    We should be able to do all of this just with ollama I think.
    """

    def __init__(self, default_model: str = MODEL, base_url: str = OLLAMA_BASE):
        self.default_model = default_model
        self.base_url = base_url
        self.chat_url = f"{base_url}/api/chat"
        self._started = False

    def start(self) -> None:
        """Ensure the bundled server is running. Call once at app startup."""
        if not self._started:
            ensure_ollama_running(base_url=self.base_url)
            self._started = True

    def ensure_model(self) -> None:
        """
        Pull a given model (or the default) if not already present.
        """
        ensure_model_available(self.default_model, base_url=self.base_url)


    def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float = 0.7,
        stream: bool = False,
    ) -> str:
        """
        Send a chat request to a specific model.
        """
        payload = {
            "model": self.default_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "options": {"temperature": temperature},
            "stream": stream,
        }
        response = requests.post(self.chat_url, json=payload, timeout=120)
        response.raise_for_status()
        return response.json()["message"]["content"]


def ensure_ollama_running(timeout: int = 20, base_url: str = OLLAMA_BASE) -> None:
    """
    Start the vendored Ollama server if it's not already running.
    """
    try:
        requests.get(base_url, timeout=2)
        return  # already running
    except requests.exceptions.ConnectionError:
        pass

    ollama_path = get_ollama_binary_path()
    if not ollama_path.exists():
        raise FileNotFoundError(
            f"Vendored ollama binary not found at {ollama_path}. "
            "Make sure it's included in the sidecar build."
        )

    print(f"Starting bundled Ollama server from {ollama_path} ...")
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
            print("Ollama server is up.")
            return
        except requests.exceptions.ConnectionError:
            time.sleep(1)

    raise RuntimeError("Bundled Ollama server did not start in time.")


def ensure_model_available(model: str = MODEL, base_url: str = OLLAMA_BASE) -> None:
    """
    Hlper function to check if the model is present on the system.
    """
    resp = requests.get(f"{base_url}/api/tags", timeout=5)
    resp.raise_for_status()
    local_models = [m["name"] for m in resp.json().get("models", [])]

    if any(model == m or m.startswith(f"{model}:") for m in local_models):
        return

    print(f"Model '{model}' not found — pulling into {get_models_dir()} ...")
    ollama_path = get_ollama_binary_path()
    env = os.environ.copy()
    env["OLLAMA_MODELS"] = str(get_models_dir())
    subprocess.run([str(ollama_path), "pull", model], check=True, env=env)


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
"""
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

    if not client:
        raise ValueError("Error: ollama client is not initialized")

    with open(json_path, "r") as f:
        recommendations_data = json.load(f) # as JsonRecommendation

    # extract global metrics to provide context to the agent
    portfolio_context = {
        "total_budget": recommendations_data.get("budget"),
        "cash_remaining": recommendations_data.get("cash_remaining"),
        "eval_period": recommendations_data.get("eval_period"),
        "backtest_summary": recommendations_data.get("backtest_summary")
    }

    print(f"\n--- Generating Explanations from {file_name} ---\n")

    response = []

    for allocation in recommendations_data.get("allocations", []):
        ticker = allocation.get("ticker")
        action = allocation.get("action")

        print(f"Processing explanation for {ticker} ({action})...")

        user_prompt = build_user_prompt(allocation, portfolio_context)
        explanation = client.chat(SYSTEM_PROMPTS["RECOMMENDATIONS"], user_prompt)

        response.append(Explanation(ticker, action, explanation))

    data = recommendations_data.copy()
    data["allocations"] = response

    return Recommendation(**data)

def handle_chat_interaction(user_question: str) -> str:
    """
    Receives questions from a user and processes them using the CHAT rules.
    """
    if not client:
        raise ValueError("Error: ollama client is not initialized")

    print("Processing Educational Chat...")

    response = client.chat(SYSTEM_PROMPTS["CHAT"], user_question)

    return response
```

## File: src/pages/chat.tsx
```typescript
import { Button } from "@/components/ui/button";
import { useConversation } from "@/hooks/use-conversation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8721";

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
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
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
                    <span className={cn("inline-block px-3 py-2 rounded-lg text-sm whitespace-pre-wrap max-w-[85%] md:max-w-[75%]", roleStyle.bubble)}>
                      {msg.content}
                    </span>
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
```

## File: src/vite-env.d.ts
```typescript
/// <reference types="vite/client" />
```

## File: src-py/rl_pipeline/main.py
```python
import json
from pathlib import Path
import numpy as np
from stable_baselines3 import PPO

from rl_pipeline.data import download_market_data
from rl_pipeline.environment import TradingEnv
from rl_pipeline.rl_agent import train_ppo_agent
from rl_pipeline.backtest import run_backtest_suite

from config import TICKERS, BUDGET, TRAIN_START, TRAIN_END, EVAL_START, EVAL_END, FEATURE_COLS, MAX_WEIGHT, OUTPUT_DIR, bcolors

class Allocation:
    ticker: str; action: str; price: float; shares: float
    dollar_value: float; pct_of_budget: float
    rsi: float; macd_hist: float; bb_pct: float

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
    print(f"\n[{bcolors.OKBLUE}Train{bcolors.ENDC}] Downloading market data: {train_start} -> {train_end}")

    train_raw = download_market_data(tickers, train_start, train_end)
    valid_tickers = [t for t in tickers if t in train_raw]
    train_data = {t: train_raw[t] for t in valid_tickers}

    # if valid_tickers:
    #     save_diagnostic_chart(train_data, valid_tickers[0])

    print(f"[{bcolors.OKBLUE}Train{bcolors.ENDC}] Training PPO agent...")
    model = train_ppo_agent(train_data)

    # Store and make accessible all trained models
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    model_path = OUTPUT_DIR / model_name

    # Assuming the model has a standard save method (like Stable Baselines 3)
    if hasattr(model, "save"):
        model.save(str(model_path))
        print(f"[{bcolors.OKGREEN}Train{bcolors.ENDC}] Model saved to -> {model_path}.zip")

    return model, valid_tickers

def generate_recommendations(
    model,
    valid_tickers: list,
    eval_start: str = EVAL_START,
    eval_end: str = EVAL_END,
    budget: float = BUDGET,
    output_filename: str = "recommendations.json"
) -> Path:
    """
    Evaluates the model, generates allocations, formats the payload,
    saves to JSON, and returns the absolute path of the JSON file.
    """
    print(f"\n[{bcolors.OKBLUE}Eval{bcolors.ENDC}] Downloading eval data: {eval_start} -> {eval_end}")

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

    # Print Performance Metrics
    print("\n" + ("=" * 60))
    print("  Performance Results")
    print(("=" * 60) + "\n")
    print(f"  RL Model Return    : {metrics['rl_return_pct']:>+7.2f} %  (${metrics['rl_end_val']:>9,.2f})")
    print(f"  Benchmark B&H      : {metrics['bh_return_pct']:>+7.2f} %  (${metrics['bh_end_val']:>9,.2f})")
    print(f"  Alpha Margin       : {metrics['rl_return_pct'] - metrics['bh_return_pct']:>+7.2f} %")
    print(f"  Sharpe Ratio       : {metrics['sharpe']:>7.3f}")

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
        },
        "allocations": [a.__dict__ for a in allocations]
    }

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    payload_path = OUTPUT_DIR / output_filename

    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)

    print(f"\n  [{bcolors.OKGREEN}Main{bcolors.ENDC}] LLM Engine Context payload metadata dumped -> {payload_path}\n")

    return payload_path.resolve()

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
    print("\n" + ("=" * 60))
    print("  RL Stock Investment Agent Pipeline")
    print(("=" * 60) + "\n")

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

    print(f"Pipeline complete. Application can now read from: {json_path}")

if __name__ == "__main__":
    main()
```

## File: src-py/requirements.txt
```
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
```

## File: src-tauri/src/lib.rs
```rust
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
```

## File: src-tauri/.gitignore
```
# Generated by Cargo
# will have compiled files and executables
/target/

# Generated by Tauri
# will have schema files for capabilities auto-completion
/gen/schemas
```

## File: src-tauri/build.rs
```rust
fn main() {
    tauri_build::build()
}
```

## File: src/main.tsx
```typescript
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
```

## File: src-py/build.bat
```batch
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
```

## File: src-tauri/capabilities/default.json
```json
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
```

## File: src-tauri/tauri.conf.json
```json
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
```

## File: src/App.css
```css
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
```

## File: src-tauri/Cargo.toml
```toml
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
```

## File: src/App.tsx
```typescript
import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import pages from "./pages";

import './App.css';

export default function App() {
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
```

## File: src-py/main.py
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import traceback

from llm.main import generate_explanation, initialize_ollama, handle_chat_interaction
from rl_pipeline.main import train_model, load_trained_model, generate_recommendations
from config import TICKERS

print('Loaded librairies, tickers:', TICKERS)

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

class ChatResponse(BaseModel):
    reply: str

class TrainRequest(BaseModel):
    tickers: Optional[List[str]] = None
    train_start: Optional[str] = None
    train_end: Optional[str] = None
    model_name: str = "ppo_trading_model"

class TrainResponse(BaseModel):
    status: str
    message: str
    model_name: str
    valid_tickers: List[str]

class EvaluateRequest(BaseModel):
    model_name: str = "ppo_trading_model"
    tickers: Optional[List[str]] = None
    eval_start: Optional[str] = None
    eval_end: Optional[str] = None
    budget: Optional[float] = None
    output_filename: str = "recommendations.json"

class EvaluateResponse(BaseModel):
    status: str
    json_path: str

# ToDo: integrate into a new page for handlign recommendations
def generate_recommendation(message: str) -> str:
    print(f"Received message: {message} - generating recommendation text")
    data = generate_explanation("recommendations.json")

    if len(data.allocations) == 0:
        return "Failed to generate explanation list"

    for e in data.allocations:
        print(f"{e.ticker}: {e.action} ({e.justification})")

    formatted_reply = "\n\n".join(
        f"**{e.ticker}** ({e.action}): {e.justification}"
        for e in data.allocations
    )

    return formatted_reply

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    print('Received chat request', req.message)
    reply = handle_chat_interaction(req.message)
    return ChatResponse(reply=reply)

@app.post("/train", response_model=TrainResponse)
def api_train_model(req: TrainRequest):
    """Triggers the training pipeline."""
    print('Received train request', req.model_dump())
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
    print('Received evaluate request', req.model_name)
    try:
        model = load_trained_model(req.model_name)
        if model is None:
            raise HTTPException(status_code=404, detail=f"Model '{req.model_name}' not found.")

        kwargs = {k: v for k, v in req.model_dump().items() if v is not None}

        valid_tickers = kwargs.pop("tickers", TICKERS)

        kwargs.pop("model_name", None)

        json_path = generate_recommendations(
            model=model,
            valid_tickers=valid_tickers,
            **kwargs
        )

        return EvaluateResponse(
            status="success",
            json_path=str(json_path)
        )
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    initialize_ollama()
    uvicorn.run(app, host="127.0.0.1", port=8721)
```

## File: src-tauri/src/main.rs
```rust
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
```
