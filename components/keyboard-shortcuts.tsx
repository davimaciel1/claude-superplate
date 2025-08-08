"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const shortcuts = [
  { key: "g h", description: "Go to Home", action: "/" },
  { key: "g d", description: "Go to Dashboard", action: "/dashboard" },
  { key: "g s", description: "Go to Settings", action: "/dashboard/settings" },
  { key: "?", description: "Show shortcuts", action: "help" },
  { key: "/", description: "Focus search", action: "search" },
]

export function KeyboardShortcuts() {
  const router = useRouter()
  const { toast } = useToast()
  let keys: string[] = []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      keys.push(e.key)
      const combo = keys.join(" ")

      // Check for shortcuts
      if (e.key === "?") {
        e.preventDefault()
        toast({
          title: "Keyboard Shortcuts",
          description: (
            <div className="space-y-2 mt-2">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex justify-between">
                  <kbd className="px-2 py-1 text-xs bg-muted rounded">{s.key}</kbd>
                  <span className="text-sm">{s.description}</span>
                </div>
              ))}
            </div>
          ),
        })
        keys = []
      } else if (e.key === "/") {
        e.preventDefault()
        const searchInput = document.getElementById("search")
        searchInput?.focus()
        keys = []
      } else if (combo === "g h") {
        router.push("/")
        keys = []
      } else if (combo === "g d") {
        router.push("/dashboard")
        keys = []
      } else if (combo === "g s") {
        router.push("/dashboard/settings")
        keys = []
      }

      // Clear keys after 1 second
      setTimeout(() => {
        keys = []
      }, 1000)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, toast])

  return null
}