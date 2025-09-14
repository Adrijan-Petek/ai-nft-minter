# 🎨 AI NFT Minter

A complete full-stack application for creating AI-generated NFTs on the Ethereum blockchain. Generate unique artwork using AI, store metadata on IPFS, and mint NFTs on the Sepolia testnet.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **MetaMask** wallet
- **Alchemy** account (free)
- **Vercel** account (free)
- **GitHub** account

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-nft-minter-main

# Install all dependencies
yarn install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Sepolia Testnet Configuration
ALCHEMY_SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
DEPLOYER_PRIVATE_KEY=your_metamask_private_key_here

# AI API Keys (choose one)
OPENAI_API_KEY=sk-your-openai-key-here
STABILITY_API_KEY=sk-your-stability-key-here

# IPFS/Pinata Configuration
PINATA_JWT=your_pinata_jwt_here

# Contract Address (after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedContractAddressHere
```

### 3. Get Your API Keys

#### Alchemy API Key (Free)
1. Go to [Alchemy.com](https://alchemy.com)
2. Create account and create new Sepolia app
3. Copy HTTPS URL to `ALCHEMY_SEPOLIA_URL`

#### Testnet ETH (Free)
- Get Sepolia ETH from [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- Or [Chainlink Faucet](https://faucets.chain.link/)

#### AI Service API Key (Choose one)
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Stability AI**: [platform.stability.ai](https://platform.stability.ai/)
- **Replicate**: [replicate.com](https://replicate.com/)

#### Pinata for IPFS (Free)
1. Create account at [Pinata.cloud](https://pinata.cloud)
2. Get JWT token from dashboard
3. Add to `PINATA_JWT` in your `.env`

### 4. Deploy Smart Contract

```bash
# Navigate to hardhat package
cd packages/hardhat

# Compile contracts
yarn build

# Deploy to Sepolia testnet
yarn deploy --network sepolia
```

After deployment, copy the contract address and update `NEXT_PUBLIC_CONTRACT_ADDRESS` in your `.env`.

### 5. Start Development

```bash
# Start the Next.js frontend
yarn dev

# In another terminal, start Hardhat node (optional)
cd packages/hardhat && yarn node
```

Visit [http://localhost:3000](http://localhost:3000) to use the app!

## 🏗️ Project Structure

```
ai-nft-minter-main/
├── packages/
│   ├── hardhat/          # Smart contracts
│   │   ├── contracts/    # Solidity contracts
│   │   ├── scripts/      # Deployment scripts
│   │   └── hardhat.config.ts
│   └── nextjs/           # Frontend application
│       ├── app/
│       │   ├── api/      # API routes
│       │   ├── components/ # React components
│       │   └── lib/      # Utility functions
│       └── lib/          # Shared utilities
├── .env.example          # Environment template
├── .github/              # GitHub Actions
└── package.json          # Root package config
```

## 🔧 Available Scripts

### Root Scripts
```bash
yarn install          # Install all dependencies
yarn dev             # Start Next.js development server
yarn build           # Build Next.js for production
```

### Hardhat Scripts
```bash
cd packages/hardhat
yarn build           # Compile contracts
yarn test            # Run contract tests
yarn deploy          # Deploy contracts
yarn node            # Start local Hardhat node
```

### Next.js Scripts
```bash
cd packages/nextjs
yarn dev             # Start development server
yarn build           # Build for production
yarn start           # Start production server
yarn lint            # Run ESLint
```

## 🎯 How It Works

1. **Connect Wallet**: Link your MetaMask wallet
2. **Generate AI Art**: Enter a text prompt to create unique artwork
3. **AI Processing**: OpenAI DALL-E 3 generates your image
4. **IPFS Storage**: Metadata is stored on IPFS via Pinata
5. **Mint NFT**: Smart contract mints your NFT on Sepolia testnet
6. **View NFT**: See your NFT in MetaMask or OpenSea Testnet

## 🔗 Useful Links

- **OpenSea Testnet**: [testnets.opensea.io](https://testnets.opensea.io/)
- **Sepolia Etherscan**: [sepolia.etherscan.io](https://sepolia.etherscan.io/)
- **Alchemy Dashboard**: [dashboard.alchemy.com](https://dashboard.alchemy.com/)
- **MetaMask**: [metamask.io](https://metamask.io/)

## 🛠️ Troubleshooting

### Contract Deployment Fails
- ✅ Check you have Sepolia ETH in your wallet
- ✅ Verify Alchemy URL is correct
- ✅ Ensure private key has no `0x` prefix

### Image Generation Fails
- ✅ Verify API keys are correct
- ✅ Check API quota/limits
- ✅ Test API calls with curl first

### IPFS Upload Fails
- ✅ Verify Pinata JWT token
- ✅ Check CORS settings in Pinata dashboard

### Frontend Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules packages/*/node_modules
yarn install
```

## 🚀 Deployment

### GitHub Actions Auto-Deployment
1. Push to `main` branch
2. GitHub Actions automatically deploys to Vercel
3. Add these secrets to GitHub:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### Manual Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd packages/nextjs
vercel --prod
```

## 📝 API Reference

### Generate Image
```http
POST /api/generate-image
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains"
}
```

### Store Metadata
```http
POST /api/store-metadata
Content-Type: application/json

{
  "name": "AI Art",
  "description": "AI-generated artwork",
  "imageUrl": "https://..."
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is for educational purposes on testnet only. Do not use real ETH or mainnet until thoroughly tested. Always verify smart contract security before mainnet deployment.

---

🎉 **Congratulations!** Your AI NFT Minter is ready! Start creating unique AI-generated NFTs today!