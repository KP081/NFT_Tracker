import { useQuery } from "@apollo/client";
import { GET_NFTS } from "../queries";
import '../App.css';

type Props = {
  owner: string;
};

export default function NFTList({ owner }: Props) {
  const { loading, error, data } = useQuery(GET_NFTS, {
    variables: { owner: owner.toLowerCase() },
  });

  if (loading) return <p>Loading NFTs...</p>;
  if (error) return <p>Error fetching NFTs</p>;

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {data.tokens.map((nft: any) => (
        <div key={nft.id} className="p-4 bg-white rounded shadow">
          <p className="font-bold">Token ID: {nft.tokenId}</p>
          <p className="text-sm text-gray-500">Owner: {nft.owner}</p>
        </div>
      ))}
    </div>
  );
}
