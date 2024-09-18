import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/react'
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Flur – A Fractal Bitcoin company',
	description: 'Developing applications and infrastructure on Fractal Bitcoin.',
	openGraph: {
		images: ['https://flur.gg/unfurl.jpeg'],
		url: 'https://flur.gg',
		title: 'Flur – A Fractal Bitcoin company',
		description: 'Developing applications and infrastructure on Fractal Bitcoin.'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
				<body className={inter.className}>
					<div className="flex flex-col min-h-screen">
						<Header />
						<main className="flex-grow">{children}</main>
						<footer className="flex justify-center items-center py-4"></footer>
						<Toaster />
						<Analytics />
					</div>
				</body>
			</ThemeProvider>
		</html>
	)
}