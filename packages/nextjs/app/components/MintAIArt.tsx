'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Image from 'next/image'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xYourDeployedContractAddressHere"

export default function MintAIArt() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [isEthereumAvailable, setIsEthereumAvailable] = useState(false)

  useEffect(() => {
    // Check if Ethereum is available
    setIsEthereumAvailable(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
  }, [])

  const connectWallet = async () => {
    if (!isEthereumAvailable) {
      setStatus('Please install MetaMask!')
      return
    }

    try {
      const accounts = await window.ethereum!.request({ method: 'eth_requestAccounts' })
      setWalletAddress(accounts[0])
      setStatus('Wallet connected successfully!')
    } catch (error) {
      setStatus('Failed to connect wallet')
      console.error(error)
    }
  }

  const generateImage = async () => {
    if (!prompt.trim()) {
      setStatus('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setStatus('Generating AI image...')

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (response.ok) {
        setImageUrl(data.imageUrl)
        setStatus('Image generated successfully!')
      } else {
        setStatus(data.error || 'Failed to generate image')
      }
    } catch (error) {
      setStatus('Failed to generate image')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const mintNFT = async () => {
    if (!imageUrl) {
      setStatus('Please generate an image first')
      return
    }

    if (!walletAddress) {
      setStatus('Please connect your wallet first')
      return
    }

    if (!isEthereumAvailable) {
      setStatus('Please install MetaMask!')
      return
    }

    setIsMinting(true)
    setStatus('Minting NFT...')

    try {
      // First, store metadata on IPFS
      const metadataResponse = await fetch('/api/store-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `AI Art: ${prompt.slice(0, 50)}...`,
          description: `AI-generated artwork created with prompt: "${prompt}"`,
          imageUrl,
        }),
      })

      const metadataData = await metadataResponse.json()

      if (!metadataResponse.ok) {
        throw new Error(metadataData.error || 'Failed to store metadata')
      }

      // Now mint the NFT with proper null check
      const provider = new ethers.providers.Web3Provider(window.ethereum!)
      const signer = provider.getSigner()

      // This would be the contract ABI - you'll need to import it
      const contractABI = [
        "function mintNFT(address to, string memory uri) public returns (uint256)"
      ]

      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer)

      const tx = await contract.mintNFT(walletAddress, metadataData.tokenURI)
      await tx.wait()

      setStatus(`NFT minted successfully! Transaction: ${tx.hash}`)
    } catch (error: any) {
      setStatus('Failed to mint NFT: ' + (error.message || 'Unknown error'))
      console.error(error)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <button
          onClick={connectWallet}
          className="btn w-full mb-4"
          disabled={!!walletAddress || !isEthereumAvailable}
        >
          {walletAddress 
            ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` 
            : isEthereumAvailable 
              ? 'Connect Wallet' 
              : 'Install MetaMask'
          }
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          AI Image Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="input h-24 resize-none"
          disabled={isGenerating}
        />
      </div>

      <div className="mb-6">
        <button
          onClick={generateImage}
          className="btn w-full"
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? 'Generating...' : 'Generate AI Image'}
        </button>
      </div>

      {imageUrl && (
        <div className="mb-6">
          <div className="relative w-full h-64 mb-4">
            <Image
              src={imageUrl}
              alt="Generated AI artwork"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <button
            onClick={mintNFT}
            className="btn w-full"
            disabled={isMinting || !walletAddress}
          >
            {isMinting ? 'Minting NFT...' : 'Mint as NFT'}
          </button>
        </div>
      )}

      {status && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{status}</p>
        </div>
      )}
    </div>
  )
}
