// THIS SCRIPT IS TO TRANSFER 10 COINS TO AN UNFUNDED ACCOUNT(USER WITH NO ASSOCIATED TOKEN ACCOUNT BUT HAS ENOUGH BALANCE).
import { getKeypairFromFile } from "@solana-developers/helpers";
import { TOKEN_2022_PROGRAM_ID, getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl('devnet'));
const fromWallet = await getKeypairFromFile("C:/Users/myasi/.config/solana/id.json");
console.log("Sender wallet : ");
console.log(fromWallet.publicKey.toBase58());
const mintAddress = new PublicKey('8et8szNKtvcUrcqepp855Cz7FznWRLdvMZAS96g8YHbt');
console.log("mint Address : " + mintAddress);
const fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mintAddress, fromWallet.publicKey, undefined, undefined, undefined, TOKEN_2022_PROGRAM_ID);
console.log("Sender Token account address : ");
console.log(fromTokenAccount.address.toBase58());
// Reciever wallet Key : EyjkNbJFuBXmY8NTLT7W6oZC13yC6Vtud92umYFxir3p
const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mintAddress, new PublicKey('EyjkNbJFuBXmY8NTLT7W6oZC13yC6Vtud92umYFxir3p'), undefined, undefined, undefined, TOKEN_2022_PROGRAM_ID);
console.log("Reciever Token account address : ");
console.log(toTokenAccount.address.toBase58());
const signature = await transfer(connection, fromWallet, fromTokenAccount.address, toTokenAccount.address, fromWallet.publicKey, 999990, undefined, undefined, TOKEN_2022_PROGRAM_ID);
console.log('Transfer Signature : ');
console.log(signature);
