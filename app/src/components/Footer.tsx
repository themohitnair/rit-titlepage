import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Developed by{' '}
                    <Link
                        href="https://github.com/themohitnair"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Mohit Nair
                    </Link>
                </p>
                <div className="flex items-center">
                    <span className="mr-2 text-sm text-muted-foreground">Hosted by</span>
                    <Image
                        src="/banner.png"
                        alt="Web Hosting Provider"
                        width={200}
                        height={100}
                    />
                </div>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    <Link
                        href="https://github.com/themohitnair/rit-titlepage"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Source code
                    </Link>
                </p>
            </div>
        </footer>
    )
}