import React from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import clsx from "clsx";

// Replaced Next.js specific components for standard React/Vite
const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
        {children}
    </a>
);

const Image = ({
    src,
    alt,
    fill,
    className,
}: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
}) => (
    <img
        src={src}
        alt={alt}
        className={clsx(fill && "absolute inset-0 w-full h-full", className)}
    />
);

export default function Navbar() {
    return (
        <nav className="h-[60px] w-full bg-surface-default border-b border-outline-default px-4 flex items-center justify-between shrink-0 z-50">
            {/* Left Section: Logo & Nav Links */}
            <div className="flex items-center gap-6 h-full">
                {/* System Select Button (Logo + Dots) */}
                <button className="flex items-center gap-2 p-1 hover:bg-surface-neutral rounded transition-colors group">
                    {/* Logo Image */}
                    <div className="relative w-[30px] h-[30px] shrink-0">
                        <Image
                            src="/assets/logo.svg"
                            alt="GS Engage Logo"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Menu Dots (Constructed to match Figma) */}
                    <div className="flex flex-wrap gap-[2px] w-[12px] h-[12px] content-start items-start">
                        <div className="bg-brand-700 rounded-[1px] w-[5px] h-[5px] shrink-0" />
                        <div className="bg-brand-700 rounded-[1px] w-[5px] h-[5px] shrink-0" />
                        <div className="bg-brand-700 rounded-[1px] w-[5px] h-[5px] shrink-0" />
                        <div className="bg-brand-700 rounded-[1px] w-[5px] h-[5px] shrink-0" />
                    </div>
                </button>

                {/* Separator / Divider - Optional based on Figma but good for clarity */}
                <div className="h-6 w-[1px] bg-outline-default hidden md:block" />

                {/* Navigation Links */}
                <div className="flex items-center gap-6 h-full">
                    <NavLink label="Execução" href="/execution" />
                    <NavLink label="Gerenciamento" href="/management" active />
                    <NavLink label="Analytics" href="/analytics" />
                    <NavLink label="Sales Planning" href="/planning" />
                    <NavLink label="Ajustes e Permissões" href="/settings" />
                </div>
            </div>

            {/* Right Section: Credits & Profile */}
            <div className="flex items-center gap-5 h-full">
                {/* Credit Usage */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-[5px] border border-brand-700 bg-surface-brand/20 h-[34px]">
                    <div className="relative w-4 h-4 shrink-0">
                        <Image
                            src="/assets/sparkles.svg"
                            alt="Credits"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex items-baseline gap-1 text-[10px] text-brand-700 leading-tight font-body">
                        <span className="font-medium font-sans">1.200</span>
                        <span className="font-normal text-brand-600">/ 3.000 créditos</span>
                    </div>
                </div>

                {/* Profile Image (Exact Local Asset) */}
                <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden border border-outline-default cursor-pointer hover:ring-2 ring-brand-200 transition-all">
                    <Image
                        src="/assets/avatar.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </nav>
    );
}

// Sub-component for Nav Links
function NavLink({
    label,
    href,
    active = false,
}: {
    label: string;
    href: string;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`
        group flex items-center gap-1 h-full relative px-1 transition-colors
        ${active
                    ? "text-default font-semibold"
                    : "text-default font-semibold hover:text-brand-600"
                }
      `}
        >
            <span className="text-xs font-display">{label}</span>
            {/* Arrow Icon */}
            <KeyboardArrowDown
                sx={{ fontSize: 16 }}
                className="text-default opacity-70 group-hover:opacity-100 transition-opacity"
            />

            {/* Active Indicator (Bottom Border) - Optional based on typical nav patterns, verifying against Figma visually */}
            {active && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-600 rounded-t-full" />
            )}
        </Link>
    );
}
