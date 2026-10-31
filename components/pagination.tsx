"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

type PaginationProps = {
    page: number
    totalPages: number
    total: number
    limit: number
    onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, total, limit, onPageChange }: PaginationProps) {
    const from = total === 0 ? 0 : (page - 1) * limit + 1
    const to = Math.min(page * limit, total)

    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (page <= 3) return [1, 2, 3, 4, null, totalPages]
        if (page >= totalPages - 2) return [1, null, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        return [1, null, page - 1, page, page + 1, null, totalPages]
    }

    const pages = getPageNumbers()

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
                Showing <span className="font-medium text-foreground">{from}–{to}</span> of{" "}
                <span className="font-medium text-foreground">{total}</span> orders
            </p>

            <div className="flex items-center gap-1">
                <PagBtn onClick={() => onPageChange(1)} disabled={page === 1} title="First page">
                    <ChevronsLeft className="size-3.5" />
                </PagBtn>
                <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} title="Previous page">
                    <ChevronLeft className="size-3.5" />
                </PagBtn>

                {pages.map((p, i) =>
                    p === null ? (
                        <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground select-none">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`flex size-7 items-center justify-center rounded-lg text-xs font-medium transition
                                ${p === page
                                    ? "bg-foreground text-background"
                                    : "hover:bg-muted text-foreground"
                                }`}
                        >
                            {p}
                        </button>
                    )
                )}

                <PagBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages} title="Next page">
                    <ChevronRight className="size-3.5" />
                </PagBtn>
                <PagBtn onClick={() => onPageChange(totalPages)} disabled={page === totalPages} title="Last page">
                    <ChevronsRight className="size-3.5" />
                </PagBtn>
            </div>
        </div>
    )
}

function PagBtn({
    children,
    onClick,
    disabled,
    title,
}: {
    children: React.ReactNode
    onClick: () => void
    disabled: boolean
    title: string
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
            {children}
        </button>
    )
}
