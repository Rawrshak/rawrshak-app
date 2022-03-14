function AboutPage() {
  return (
    <div className="flex flex-col text-offWhite pt-10 text-xl">
      <div className="w-full flex flex-row">
        Rawrshak will be a full decentralized open source Gaming NFT platform that consists of all the tools a game developer would need in order to launch NFTs for their game. 
      </div>
      <div className="w-full flex flex-row pt-5">
        Features:
      </div>
      <div className="w-full flex flex-row pl-5">
        <ul>
          <li className="list-disc">
            A shared global playerbase for all Rawrshak-integrated games
          </li>
          <li className="list-disc">
            Open-sourced tools and libraries for public game engines (Unity, Unreal Engine, Godot)
          </li>
          <li className="list-disc">
            Ready-to-Deploy Ethereum Smart Contracts and on-chain gaming mechanics infrastructure
          </li>
          <li className="list-disc">
            Ethereum Layer 2 Native solution for scalability
          </li>
          <li className="list-disc">
            Rawrshak Marketplace designed for Games
          </li>
          <li className="list-disc">
            Content Creator and Game Developer web apps for NFT Management and statistics
          </li>
          <li className="list-disc">
            Gamer web app for inventory management 
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage;