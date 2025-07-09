import { ApolloClient , InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri : "https://api.studio.thegraph.com/query/115640/nft-tracker/version/latest",
    cache : new InMemoryCache(),
});