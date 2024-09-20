import Component from './page.client'
import { Metadata } from 'next'
import { API_URL, EXPLORER_URL } from '@/lib/constants'
import { validateTokenId } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60 * 5 // 5 minutes

// Function to fetch token details
async function fetchTokenDetails(token_id: string) {
	try {
		const url = `${API_URL}/api/tokens/${token_id}?v=1`
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error('Failed to fetch token details')
		}
		return (await response.json()).data
	} catch (error) {
		console.error('Error fetching token details:', error)
		return null
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// Validate token_id
	const token_id = params.id
	if (!token_id || !validateTokenId(token_id)) {
		return {}
	}

	// Fetch token details
	const tokenDetails = await fetchTokenDetails(token_id)

	// If token details couldn't be fetched, return default metadata
	if (!tokenDetails) {
		return {}
	}

	// Generate metadata based on token details
	return {
		title: `${tokenDetails.symbol} ${token_id} | Flur.gg`,
		description: `View ${tokenDetails.symbol} token details on Flur.gg.`,
		openGraph: {
			title: `${tokenDetails.symbol} ${token_id} | Flur.gg`,
			description: `View ${tokenDetails.symbol} token details on Flur.gg.`,
			images: ['https://flur.gg/unfurl.jpeg']
		}
	}
}

export default async function Page({ params }: Props) {
	const token_id = params.id
	if (!token_id || !validateTokenId(token_id)) {
		return <div>Invalid token ID</div>
	}

	// Fetch token details
	const tokenDetails = await fetchTokenDetails(token_id)

	// If token details couldn't be fetched, return default metadata
	if (!tokenDetails) {
		return (
			<div className="flex justify-center container p-8">
				<div className="flex flex-col gap-4 items-center justify-center">
					<h1>Deploy pending...</h1>
					<a href={`${EXPLORER_URL}/tx/${token_id.split('_')[0]}`} target="_blank">
						<Button>View Tx</Button>
					</a>
				</div>
			</div>
		)
	}

	return <Component token={tokenDetails} />
}
