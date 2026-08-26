"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

interface TableActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  menuClassName?: string;
}

export function TableActionMenu({
  isOpen,
  onToggle,
  onClose,
  ariaLabel,
  children,
  menuClassName = "w-44",
}: TableActionMenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    openUp: boolean;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 220;
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight + gap && rect.top > menuHeight + gap;

    setPosition({
      top: openUp ? rect.top - gap : rect.bottom + gap,
      left: rect.right,
      openUp,
    });
  };

  useLayoutEffect(() => {
    if (!isOpen) {
      setPosition(null);
      return;
    }

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // Re-measure after menu content mounts for accurate flip
  useLayoutEffect(() => {
    if (isOpen) updatePosition();
  }, [isOpen, children]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, onClose]);

  const menu =
    mounted && isOpen && position
      ? createPortal(
          <div
            ref={menuRef}
            className={`fixed z-[200] ${menuClassName} bg-white rounded-xl shadow-lg border border-gray-100 py-1`}
            style={{
              top: position.top,
              left: position.left,
              transform: position.openUp
                ? "translate(-100%, -100%)"
                : "translateX(-100%)",
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-navy border border-gray-200 hover:bg-navy hover:text-white hover:border-navy transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" strokeWidth={2.5} />
      </button>
      {menu}
    </>
  );
}
