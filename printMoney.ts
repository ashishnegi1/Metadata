// THIS IS A PROGRAM TO MINT 1000 COINS OF 8et8szNKtvcUrcqepp855Cz7FznWRLdvMZAS96g8YHbt (NEGICOIN) 

import { getKeypairFromFile } from "@solana-developers/helpers";
import { TOKEN_2022_PROGRAM_ID, getAccount, getMint, getOrCreateAssociatedTokenAccount, getTokenMetadata, mintTo } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'));

const owner = await getKeypairFromFile("C:/Users/myasi/.config/solana/id.json");
console.log("owner - " + owner.publicKey.toBase58());

const mintAddress = new PublicKey('8et8szNKtvcUrcqepp855Cz7FznWRLdvMZAS96g8YHbt');
console.log("mint Address : " + mintAddress);

const mintData = await getMint(
    connection,
    mintAddress,
    undefined,
    TOKEN_2022_PROGRAM_ID
);
console.log("Mint data(supply) : ");
console.log(mintData.supply);

const mintMetadata = await getTokenMetadata(connection, mintAddress);
console.log("Metadata(name) : ");
console.log(mintMetadata?.name);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    owner,
    mintAddress,
    owner.publicKey,
    undefined,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID
);
console.log("Token account address : ");
console.log(tokenAccount.address.toBase58());

await mintTo(
    connection,
    owner,
    mintAddress,
    tokenAccount.address,
    owner.publicKey,
    1000000000,
    undefined,
    undefined,
    TOKEN_2022_PROGRAM_ID
);

const mintInfo = await getMint(
    connection,
    mintAddress,
    undefined,
    TOKEN_2022_PROGRAM_ID
);
console.log("Mint data(new supply) : ");
console.log(mintInfo.supply);

const tokenAccountInfo = await getAccount(
    connection,
    tokenAccount.address,
    undefined,
    TOKEN_2022_PROGRAM_ID
);
console.log("Token account amount : ");
console.log(tokenAccountInfo.amount);