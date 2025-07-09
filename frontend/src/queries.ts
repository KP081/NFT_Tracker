import { gql } from "@apollo/client";

export const GET_NFTS = gql`
    query NFTs($owner: Bytes!) {
        tokens(where: {owner: $owner}) {
            id
            tokenId
            owner
        }
    }
`;