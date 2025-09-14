import MintAIArt from './components/MintAIArt'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI NFT Minter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create unique AI-generated artwork and mint it as NFTs on the Ethereum blockchain.
            Connect your wallet and start creating!
          </p>
        </div>

        <MintAIArt />
      </div>
    </main>
  )
}