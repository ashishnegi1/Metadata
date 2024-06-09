// Make 10 txns and addresses from discord maybe
import { getKeypairFromFile } from "@solana-developers/helpers";
import { ExtensionType, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, getMintLen, getTokenMetadata } from "@solana/spl-token";
import { createInitializeInstruction, createUpdateFieldInstruction, pack } from "@solana/spl-token-metadata";
import { Connection, Keypair, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl('devnet'));
const payer = await getKeypairFromFile("C:/Users/myasi/.config/solana/id.json");
console.log("payer - " + payer.publicKey.toBase58());
const mint = Keypair.generate();
console.log("mint - " + mint.publicKey.toBase58());
const metadata = {
    mint: mint.publicKey,
    name: "Negicoin",
    symbol: "NEGi",
    uri: "https://lavender-big-cricket-975.mypinata.cloud/ipfs/QmQpdKbvrsgQv33uSNtP9KU6StEW5sNbqhiovoZdHEyTXJ",
    additionalMetadata: [
        ["Objective", "To create a coin with all proper metadata"]
    ]
};
const mintSpace = getMintLen([
    ExtensionType.MetadataPointer
]);
const metadataSpace = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
const lamports = await connection.getMinimumBalanceForRentExemption(mintSpace + metadataSpace);
const createAccountTx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: mintSpace,
    lamports,
    programId: TOKEN_2022_PROGRAM_ID
});
const initializeMetadataPointerIx = createInitializeMetadataPointerInstruction(mint.publicKey, payer.publicKey, mint.publicKey, TOKEN_2022_PROGRAM_ID);
const initializeMintIx = createInitializeMintInstruction(mint.publicKey, 6, payer.publicKey, payer.publicKey, TOKEN_2022_PROGRAM_ID);
const initializeMetadataIx = createInitializeInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    metadata: mint.publicKey,
    updateAuthority: payer.publicKey,
    mint: mint.publicKey,
    mintAuthority: payer.publicKey,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri
});
const updateFieldIx = createUpdateFieldInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    metadata: mint.publicKey,
    updateAuthority: payer.publicKey,
    field: metadata.additionalMetadata[0][0],
    value: metadata.additionalMetadata[0][1]
});
const trxn = new Transaction().add(createAccountTx, initializeMetadataPointerIx, initializeMintIx, initializeMetadataIx, updateFieldIx);
const sign = await sendAndConfirmTransaction(connection, trxn, [payer, mint]);
console.log("sign : " + sign);
const getMetadata = await getTokenMetadata(connection, mint.publicKey);
console.log("Metadata : ");
console.log(getMetadata);
