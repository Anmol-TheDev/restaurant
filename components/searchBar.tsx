"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function useDebounce<T>(value: T, delay = 300): T {
    const [debounced, setDebounced] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounced
}

type SearchBarProps = {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function SearchBar({ value, onChange, placeholder = "Search…", className }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div className={`relative ${className ?? ""}`}>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                ref={inputRef}
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-9 pr-9"
            />

            {value && (
                <button
                    onClick={() => {
                        onChange("")
                        inputRef.current?.focus()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    aria-label="Clear search"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    )
}
